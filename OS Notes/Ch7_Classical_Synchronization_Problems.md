# Chapter 7: Synchronization Examples (Classical Problems)

*(Silberschatz, Galvin & Gagne, 10th Edition)*

---

## 1. Classical Problems of Synchronization

Used to **test newly proposed synchronization schemes**:
1. **Bounded-Buffer Problem**
2. **Readers–Writers Problem**
3. **Dining-Philosophers Problem**

These are the "benchmark puzzles" — if your new lock/semaphore/monitor idea can solve all three cleanly, it's probably sound.

---

## 2. Bounded-Buffer Problem (Producer–Consumer with semaphores)

Setup: **n buffers**, each holds one item. Three semaphores:
- `mutex = 1` — mutual exclusion on the buffer itself
- `full = 0` — counts **filled** slots
- `empty = n` — counts **empty** slots

**Producer:**
```c
while (true) {
    /* produce an item in next_produced */
    wait(empty);      /* claim an empty slot (block if none) */
    wait(mutex);      /* lock the buffer */
    /* add next_produced to the buffer */
    signal(mutex);    /* unlock */
    signal(full);     /* one more full slot */
}
```

**Consumer:**
```c
while (true) {
    wait(full);       /* claim a full slot (block if none) */
    wait(mutex);      /* lock the buffer */
    /* remove an item from buffer into next_consumed */
    signal(mutex);    /* unlock */
    signal(empty);    /* one more empty slot */
    /* consume the item */
}
```

Key points:
- `empty`/`full` do the **counting/waiting**; `mutex` protects the **actual buffer manipulation**.
- **Order matters**: wait(empty) *before* wait(mutex). Reversed, a producer could lock the buffer then sleep waiting for an empty slot — and the consumer could never get the lock to create one → deadlock.

> **Real life:** A doughnut shop display case with n slots. `empty` = free slots the baker can fill; `full` = doughnuts customers can take; `mutex` = only one person's hands in the case at a time. Wrong order = the baker climbs into the case, then waits for space — while blocking the customer who would have made space. In software: this is exactly a print queue, a message queue (Kafka/RabbitMQ), or your video-stream buffer.

---

## 3. Readers–Writers Problem

- A **data set is shared** among concurrent processes:
  - **Readers** — only read; no updates
  - **Writers** — read and write
- Requirement: **multiple readers may read simultaneously**, but **only one writer** may access the data at a time (and with no readers present).
- Several variations exist — all involve some form of **priorities**.

### Shared data (first readers–writers problem)
- Semaphore `rw_mutex = 1` — writer exclusion (held by the writer, or by the reader *group*)
- Semaphore `mutex = 1` — protects `read_count`
- Integer `read_count = 0` — how many readers are currently reading

**Writer:**
```c
while (true) {
    wait(rw_mutex);
    /* writing is performed */
    signal(rw_mutex);
}
```

**Reader:**
```c
while (true) {
    wait(mutex);
    read_count++;
    if (read_count == 1)      /* first reader in */
        wait(rw_mutex);       /* locks out writers */
    signal(mutex);

    /* reading is performed */

    wait(mutex);
    read_count--;
    if (read_count == 0)      /* last reader out */
        signal(rw_mutex);     /* lets writers in */
    signal(mutex);
}
```

- The **first reader** locks `rw_mutex` on behalf of all readers; the **last reader out** releases it. Readers in between just increment/decrement the count.

### Variations
- **First readers–writers problem** (above): readers favored → a **writer may never write** (starvation) if readers keep arriving.
- **Second readers–writers problem**: once a writer is **ready**, no *newly arrived* reader may start reading → readers can starve instead.
- Both can starve someone → more variations exist.
- Some kernels provide **reader–writer locks** directly.

> **Real life:** A Wikipedia article: thousands can *view* it simultaneously (readers don't disturb each other), but an *edit* (writer) needs exclusive access or viewers might see a half-saved mess. First-variation problem: if visitors never stop arriving, the editor waits forever. Second variation: the museum announces "renovation pending — no new visitors," so the crowd drains and work can start, but visitors now queue. Databases face this trade-off daily with shared (read) vs exclusive (write) locks.

---

## 4. Dining-Philosophers Problem

- **N philosophers** sit at a round table, a bowl of rice in the middle; they alternate **thinking** and **eating**; they don't interact with neighbors.
- To eat, a philosopher needs **2 chopsticks** — one on each side, shared with neighbors — picked up **one at a time**; both released when done.
- With 5 philosophers, shared data: bowl of rice (data set) + `semaphore chopstick[5]`, all initialized to 1.
- It models a broad OS reality: **many processes competing for multiple shared resources**.

### Semaphore solution (flawed)
```c
while (true) {
    wait(chopstick[i]);              /* left */
    wait(chopstick[(i + 1) % 5]);    /* right */
    /* eat for a while */
    signal(chopstick[i]);
    signal(chopstick[(i + 1) % 5]);
    /* think for a while */
}
```
**The problem:** if **all 5** get hungry simultaneously and each picks up their **left** chopstick, everyone waits forever for a right chopstick held by a neighbor → **deadlock**.

> **Real life:** Five drivers arriving at a 5-way stop simultaneously, each edging forward claiming half the intersection and waiting for the other half. Or two people each grabbing one of a pair of scissors' handles. The circular wait is the killer: everyone holds something someone else needs.

### Monitor solution
Idea: a philosopher picks up chopsticks **only if both are available**, checked atomically inside a monitor.

```c
monitor DiningPhilosophers {
    enum {THINKING, HUNGRY, EATING} state[5];
    condition self[5];

    void pickup(int i) {
        state[i] = HUNGRY;
        test(i);
        if (state[i] != EATING)
            self[i].wait();          /* both not available — wait */
    }

    void putdown(int i) {
        state[i] = THINKING;
        test((i + 4) % 5);           /* maybe left neighbor can now eat */
        test((i + 1) % 5);           /* maybe right neighbor can now eat */
    }

    void test(int i) {
        if ((state[(i + 4) % 5] != EATING) &&
            (state[i] == HUNGRY) &&
            (state[(i + 1) % 5] != EATING)) {
            state[i] = EATING;
            self[i].signal();
        }
    }

    initialization_code() {
        for (int i = 0; i < 5; i++)
            state[i] = THINKING;
    }
}
```
Usage by philosopher i:
```
DiningPhilosophers.pickup(i);
/** EAT **/
DiningPhilosophers.putdown(i);
```
- `test(i)`: i may eat only if **neither neighbor is eating** and i is hungry.
- On `putdown`, the philosopher checks whether each **neighbor** can now eat and signals them.
- Result: **no deadlock** — but **starvation is still possible** (an unlucky philosopher's neighbors could alternate eating forever).

> **Real life:** A tool crib manager at a workshop: you may check out the drill-and-saw *pair* only when both are free — no hoarding one while camping on the waitlist for the other. Deadlock solved. But if your two bench neighbors keep alternating their borrowings, you might still never get a turn — fairness needs an extra rule.

---

## 5. Kernel Synchronization — Windows

- **Uniprocessor**: uses **interrupt masks** to protect access to global resources.
- **Multiprocessor**: uses **spinlocks**; a spinlocking thread **will never be preempted**.
- Also provides **dispatcher objects** for user-land: **mutexes, semaphores, events, timers**.
  - **Events** — act much like condition variables
  - **Timers** — notify thread(s) when time expires
  - Dispatcher objects are in **signaled state** (available — acquiring thread proceeds) or **non-signaled state** (thread blocks).
- Mutex dispatcher object: signaled = free; a thread acquiring it flips it to non-signaled; others block until it's signaled again.

> **Real life:** Signaled/non-signaled = the vacant/occupied indicator on an airplane lavatory door. Waiting for a Windows program to finish before another starts (e.g., an installer that waits for a download) typically uses these very event objects.

---

## 6. Java Synchronization

Java provides: **monitors, reentrant locks, semaphores, condition variables**.

### Java Monitors
- **Every Java object has a single lock** associated with it.
- Declaring a method **`synchronized`** → the calling thread must **own the object's lock**; if another thread owns it, the caller **waits**.
- The lock is released when the owning thread **exits the synchronized method**.
- A thread that tries to acquire an unavailable lock enters the object's **entry set** (threads waiting for the lock).

### wait() and notify()
- Each object also has a **wait set**. When a thread calls **`wait()`**:
  1. It **releases the lock**
  2. Its state becomes **blocked**
  3. It's placed in the **wait set**
- When a thread calls **`notify()`**:
  1. An **arbitrary** thread T is picked from the wait set
  2. T moves from the wait set to the **entry set**
  3. T's state becomes **runnable** — it then competes for the lock and re-checks its condition
- Typical use: bounded buffer with `synchronized insert()/remove()`, calling `wait()` when full/empty and `notify()` after each operation.

> **Real life:** A conference room (object lock): one meeting inside; people queued at the door = entry set. Someone inside realizes they're missing a document (condition false) — they step out to the lounge (wait set), freeing the room. When circumstances change, reception taps one lounge person (notify) who rejoins the door queue — and on entering, first double-checks their document actually arrived (re-check the condition!).

### Java Reentrant Locks
- Similar to mutex locks:
  ```java
  Lock key = new ReentrantLock();
  key.lock();
  try { /* critical section */ }
  finally { key.unlock(); }
  ```
- The **`finally` clause guarantees the lock is released even if an exception occurs** in the try block.

> **Real life:** Tying the restroom key to your wrist so that even if you faint (exception), the key comes back. Forgetting `unlock()` in an exception path is one of the classic ways real servers freeze.

### Java Semaphores
```java
Semaphore sem = new Semaphore(1);   // constructor: initial count
sem.acquire();
try { /* critical section */ }
finally { sem.release(); }
```

### Java Condition Variables
- Associated with a **ReentrantLock**; created via **`newCondition()`**:
  ```java
  Lock lock = new ReentrantLock();
  Condition condition = lock.newCondition();
  ```
- A thread waits with **`await()`**, signals with **`signal()`**.
- **doWork example:** five threads numbered 0–4, shared `turn` variable; a thread may work only when `turn == its number`. Using an array `Condition[] condVars`, each thread waits on **its own** condition variable (`condVars[threadNumber].await()`); on completion it sets `turn = (turn + 1) % 5` and signals exactly the next thread (`condVars[turn].signal()`).
- Advantage over plain `notify()`: you wake **the specific thread** whose turn it is, not an arbitrary one.

> **Real life:** Instead of shouting "NEXT!" into a crowded waiting room and hoping the right patient stands up (notify), the clinic pages ticket #47 specifically (per-thread condition variable). Precise, no wasted wake-ups.

---

## 7. Alternative Approaches

### Transactional Memory
- A **memory transaction** = a sequence of read-write operations to memory performed **atomically**.
- Instead of `update()` guarded by mutex locks, write `atomic { S }` — the system ensures the statements in S execute atomically, no explicit locks, no deadlock risk from lock ordering.

> **Real life:** A bank transfer: debit one account and credit another must happen entirely or not at all — never half. Transactional memory brings the database "transaction" idea into ordinary memory: try the whole change; if someone conflicted, roll back and retry — like a Git commit that only lands if there's no merge conflict.

### Functional Programming Languages
- A different paradigm: they **do not maintain state**; variables are **immutable** — once assigned, they cannot change.
- If nothing can change, there's nothing to race on → data races become structurally impossible.
- Growing interest in **Erlang** and **Scala** for their approach to data races.

> **Real life:** WhatsApp's backend runs on Erlang — millions of concurrent chats with no shared mutable state to corrupt. Analogy: instead of a whiteboard everyone edits (fights over the marker), each update writes a fresh dated page; readers grab the latest page, nobody's writing is ever scribbled over.

---

## Key Terms Checklist

Bounded-buffer problem, empty/full/mutex semaphores, semaphore ordering deadlock, readers–writers problem, read_count, rw_mutex, first vs second variation, reader–writer locks, writer/reader starvation, dining philosophers, circular wait/deadlock, monitor solution (HUNGRY/EATING/THINKING, test()), starvation, Windows dispatcher objects, signaled/non-signaled, interrupt masks, spinlocks, Java monitor, synchronized, entry set, wait set, wait()/notify(), ReentrantLock, try/finally unlock, Java Semaphore acquire/release, Condition await()/signal(), transactional memory, atomic{S}, functional languages, immutability, Erlang/Scala.
