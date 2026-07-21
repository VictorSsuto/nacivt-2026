# Chapter 6: Synchronization Tools

*(Silberschatz, Galvin & Gagne, 10th Edition)*

---

## 1. Background

- Processes execute **concurrently** and may be **interrupted at any time**, partially completing execution.
- Concurrent access to shared data can cause **data inconsistency**.
- Maintaining consistency requires mechanisms ensuring **orderly execution** of cooperating processes.
- Recall the bounded-buffer `counter` race from Chapter 3 — producer and consumer both updating `counter` concurrently.

### Race condition in the kernel too
Processes P0 and P1 both call `fork()`; both read the kernel variable `next_available_pid` before either updates it → **two different processes get the same pid**. Without a mechanism preventing simultaneous access, kernel data corrupts just like user data.

> **Real life:** Two clerks at a deli both look at the "next ticket number" roll at the same moment, and hand two customers ticket #47. Chaos at pickup. Every synchronization tool in this chapter is a way of making people take tickets one at a time.

---

## 2. The Critical-Section Problem

- System of n processes {p0, …, pn−1}; each has a **critical section (CS)** of code where it changes common variables, updates a table, writes a file, etc.
- **When one process is in its CS, no other may be in its CS.**
- The problem: design a **protocol** to ensure this.
- General structure of each process:
  ```
  while (true) {
      [entry section]      ← ask permission to enter
         critical section
      [exit section]       ← announce leaving
         remainder section
  }
  ```

### Three requirements for a correct solution
1. **Mutual Exclusion** — if Pi is in its CS, no other process is in its CS.
2. **Progress** — if no process is in its CS and some want in, the selection of who enters next **cannot be postponed indefinitely** (only processes not in their remainder sections vote).
3. **Bounded Waiting** — a bound on how many times *others* can enter their CS after a process requests entry and before it's granted. (Assume nonzero speeds; no assumptions about relative speed.)

> **Real life:** A single-occupancy restroom. Mutual exclusion = only one person inside. Progress = if it's empty and people are waiting, someone gets in promptly — the door doesn't just stay locked. Bounded waiting = no one can be endlessly queue-jumped; you won't wait forever while others cut in front repeatedly.

---

## 3. Interrupt-Based Solution

- Entry section: **disable interrupts**; exit section: **enable interrupts**.
- Problems:
  - What if the CS runs for an hour? (Everything else freezes.)
  - Processes could **starve**.
  - **What if there are two CPUs?** Disabling interrupts on one doesn't stop the other.

> **Real life:** Locking every door in the office building so you can use the copier undisturbed. Works, but nobody else can do *anything* — and if there's a second building (second CPU), your locks don't reach it at all.

---

## 4. Software Solution 1 (turn variable)

- Two processes; assume **load and store are atomic** (can't be interrupted).
- Shared: `int turn` — whose turn to enter; initially i.
- Process Pi:
  ```c
  while (true) {
      while (turn == j);     /* wait */
      /* critical section */
      turn = j;
      /* remainder section */
  }
  ```
- **Mutual exclusion: preserved** (Pi enters only if turn == i, and turn can't be both values at once).
- **Progress: violated** — strict alternation. If it's Pj's turn but Pj doesn't want in (busy in its remainder), Pi is stuck even though the CS is free.
- Bounded waiting: satisfied, but progress failure sinks it.

> **Real life:** Two roommates with a strict alternating dishwashing schedule. If it's your roommate's night but they're away, dishes pile up and *you're not allowed* to wash them. The resource idles while someone wants it.

---

## 5. Peterson's Solution

- Two processes; shared variables:
  - `int turn` — whose turn it is
  - `boolean flag[2]` — `flag[i] = true` means Pi is **ready** to enter
- Process Pi:
  ```c
  while (true) {
      flag[i] = true;          /* I want in */
      turn = j;                /* but you first, politely */
      while (flag[j] && turn == j)
          ;                    /* wait */
      /* critical section */
      flag[i] = false;
      /* remainder section */
  }
  ```
- Provably meets **all three** requirements:
  1. Mutual exclusion — Pi enters only if `flag[j] == false` or `turn == i`
  2. Progress ✓
  3. Bounded waiting ✓

> **Real life:** Two polite people at a door: each signals "I'd like to go" (flag) but says "after you" (turn = other). Whoever said "after you" *last* yields — so exactly one proceeds, and nobody defers forever.

### Peterson's Solution and Modern Architecture — why it breaks
- Modern processors/compilers **reorder operations** with no dependencies to improve performance.
- Fine for single-threaded code (same result), but for multithreaded code reordering produces **inconsistent/unexpected results**.

**Example.** Shared: `boolean flag = false; int x = 0;`
- Thread 1: `while (!flag); print x`
- Thread 2: `x = 100; flag = true;`
- Expected output: **100**. But `x = 100` and `flag = true` are independent → may be **reordered** → Thread 1 can print **0**!
- In Peterson's solution, reordering the `flag[i] = true` and `turn = j` writes can let **both processes into their CS simultaneously**.

> **Real life:** You text a friend "cake's in the fridge" *then* actually put the cake in — because the postal system (CPU) delivered your actions out of order. Your friend opens an empty fridge. The instructions made sense to *you* individually; the observer got them in the wrong order.

---

## 6. Memory Barriers

- A **memory model** = the memory guarantees an architecture makes to programs:
  - **Strongly ordered** — a modification by one processor is **immediately visible** to all others
  - **Weakly ordered** — modifications **may not be immediately visible**
- A **memory barrier** is an instruction forcing any change in memory to be **propagated (made visible)** to all other processors.
- When a barrier executes, **all loads and stores complete before any subsequent load/store** — even if instructions were reordered, stores are visible to other processors before later operations.

**Fixed example:**
```
Thread 1:  while (!flag)          Thread 2:  x = 100;
              memory_barrier();              memory_barrier();
           print x                           flag = true;
```
Thread 1 is guaranteed to load `flag` before `x`; Thread 2 guarantees `x = 100` happens-before `flag = true` → output is 100.

> **Real life:** "Send in this exact order, no overtaking" — like numbered pages of a contract sent by courier with instructions that page 1 must arrive before page 2. Real-world use: this is what `volatile`/atomics in Java and C++ compile down to.

---

## 7. Hardware Instructions

Many systems provide hardware support for the CS problem. On uniprocessors, disabling interrupts works but is **too inefficient on multiprocessors** (not scalable). Instead: **atomic** (uninterruptible) instructions that test-and-modify a word, or swap two words.

### test_and_set
```c
boolean test_and_set(boolean *target) {
    boolean rv = *target;   /* return original value */
    *target = true;         /* set to true */
    return rv;
}   /* executed ATOMICALLY */
```
**Usage** (shared `boolean lock = false`):
```c
do {
    while (test_and_set(&lock))
        ;  /* spin */
    /* critical section */
    lock = false;
    /* remainder section */
} while (true);
```
- Provides mutual exclusion, but **not bounded waiting** (an unlucky process can lose the race forever).

> **Real life:** A "grab the talking stick" rule where grabbing and checking-who-had-it happen in one indivisible motion. Whoever's hand closes on it first talks; everyone else keeps grabbing at air. Nothing guarantees the same fast-handed person doesn't win every time — that's the fairness (bounded waiting) gap.

### compare_and_swap (CAS)
```c
int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;   /* swap only if it matches expected */
    return temp;
}   /* executed ATOMICALLY */
```
**Usage** (shared `int lock = 0`):
```c
while (true) {
    while (compare_and_swap(&lock, 0, 1) != 0)
        ;  /* spin */
    /* critical section */
    lock = 0;
    /* remainder section */
}
```
- Mutual exclusion ✓; bounded waiting still ✗ in this simple form.

> **Real life:** Booking the last concert seat: "reserve seat 14B *only if* it's still marked free" — check and reserve in one indivisible step, so two fans can't both get it. This exact primitive powers lock-free code in databases and ticketing systems.

### Bounded-waiting version with CAS
Shared: `boolean waiting[n]` (all false), `int lock = 0`.
```c
while (true) {
    waiting[i] = true;
    key = 1;
    while (waiting[i] && key == 1)
        key = compare_and_swap(&lock, 0, 1);
    waiting[i] = false;
    /* critical section */
    j = (i + 1) % n;
    while ((j != i) && !waiting[j])
        j = (j + 1) % n;
    if (j == i)
        lock = 0;              /* nobody waiting — free the lock */
    else
        waiting[j] = false;    /* pass the CS directly to Pj */
    /* remainder section */
}
```
- On exit, a process **scans forward cyclically** for the next waiting process and hands the CS to it → every waiter gets in within n−1 turns → **bounded waiting achieved**.

> **Real life:** Leaving the restroom, you personally hand the key to the next person in the circle rather than tossing it in the air for a scramble.

---

## 8. Atomic Variables

- Instructions like CAS are **building blocks** for other tools.
- An **atomic variable** provides atomic updates on basic types (integers, booleans).
- E.g., `increment(&sequence)` increments without interruption, implemented with CAS:
  ```c
  void increment(atomic_int *v) {
      int temp;
      do { temp = *v; }
      while (temp != compare_and_swap(v, temp, temp+1));
  }
  ```
  (Keep retrying until nobody changed the value between the read and the swap.)

> **Real life:** A view counter on a video: millions of concurrent "+1"s must not lose updates. Retry-until-clean is like re-submitting an edit when someone changed the wiki page while you were typing.

---

## 9. Mutex Locks

- Hardware solutions are complicated and inaccessible to application programmers → OS designers provide software tools.
- **Mutex lock** — simplest: a boolean indicating whether the lock is available.
- Protect a CS: **`acquire()`** the lock first, **`release()`** after.
- `acquire()`/`release()` calls must be **atomic** — usually built with hardware atomic instructions like CAS.
- This solution requires **busy waiting** → such a lock is called a **spinlock**.

```c
while (true) {
    acquire lock
        critical section
    release lock
        remainder section
}
```

> **Real life:** The bathroom key at a gas station: take the key (acquire), use the room, return the key (release). Busy waiting/spinning = standing at the counter repeatedly asking "is the key back yet?" — fine if waits are milliseconds, wasteful if the current holder is on a long break. Spinlocks are great for very short critical sections on multicore machines (no cost of going to sleep and being woken).

---

## 10. Semaphores

- More sophisticated than mutex locks. **Semaphore S = integer variable**, accessed only via two **atomic** operations:
  - **`wait(S)`** (originally **P**): `while (S <= 0); S--;`
  - **`signal(S)`** (originally **V**): `S++;`
- **Counting semaphore** — value ranges over an unrestricted domain (counts available resources).
- **Binary semaphore** — value 0 or 1; same as a mutex lock. A counting semaphore can be implemented from binary ones.

### Usage patterns
1. **Mutual exclusion:** semaphore `mutex = 1`:
   ```
   wait(mutex);  CS  signal(mutex);
   ```
2. **Ordering (S1 before S2):** semaphore `synch = 0`:
   ```
   P1:  S1;  signal(synch);
   P2:  wait(synch);  S2;
   ```

> **Real life:** A parking garage with 50 spaces = counting semaphore initialized to 50. Entering car: wait() — decrement; if 0, the barrier holds you. Leaving car: signal() — increment, barrier releases someone. The ordering pattern is a relay baton: runner 2 (P2) cannot start until runner 1 (P1) hands over the baton (signal).

### Implementation
- Must guarantee no two processes execute wait() and signal() on the same semaphore at the same time → the implementation itself is a CS problem (wait/signal code placed in a critical section).
- Busy waiting inside this implementation is short and rare — but applications may spend **lots** of time in critical sections, so busy waiting there isn't good.

### Implementation with NO busy waiting
Each semaphore has an associated **waiting queue**; two kernel operations:
- **`block()`** — place the invoking process on the waiting queue (state → waiting)
- **`wakeup(P)`** — move P from the waiting queue to the **ready queue**

```c
typedef struct {
    int value;
    struct process *list;
} semaphore;

wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        add this process to S->list;
        block();
    }
}

signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        remove a process P from S->list;
        wakeup(P);
    }
}
```
(Negative value = number of processes waiting.)

> **Real life:** Instead of circling the full garage burning fuel (spinning), you get a pager from the valet and sit in the café; when a space frees, they buzz you (wakeup). The restaurant waitlist app works the same way.

### Problems with Semaphores — incorrect use
- `signal(mutex) … wait(mutex)` — reversed → mutual exclusion broken
- `wait(mutex) … wait(mutex)` — double wait → deadlock
- Omitting wait() and/or signal() → violation or deadlock

> **Real life:** Returning the restroom key before you enter, taking the key twice, or walking off with it forever. The tool is correct; humans misuse it — which motivates monitors.

---

## 11. Monitors

- A **high-level abstraction**: an **abstract data type** whose internal variables are accessible **only by code within its procedures**.
- **Only one process may be active within the monitor at a time** — mutual exclusion is automatic.
  ```
  monitor monitor-name {
      // shared variable declarations
      procedure P1 (…) { … }
      …
      initialization code (…) { … }
  }
  ```
- Basic implementation with semaphores: `semaphore mutex = 1`; every procedure body wrapped in `wait(mutex) … signal(mutex)`.

> **Real life:** A bank vault with a single revolving door and a built-in guard. You cannot touch the money (shared data) except by entering through official procedures, and the door physically admits one person at a time. No customer can forget to "lock up" — the building does it. In programming: Java's `synchronized` keyword is a monitor.

### Condition Variables
- `condition x, y;` with two operations:
  - **`x.wait()`** — the invoking process is **suspended** until someone calls x.signal()
  - **`x.signal()`** — resumes **one** waiting process; if none is waiting, it has **no effect** (unlike a semaphore signal, which always increments!)

**Ordering example (S1 before S2)** — monitor with procedures F1, F2, condition `x`, boolean `done = false`:
```
F1: S1; done = true; x.signal();
F2: if (!done) x.wait(); S2;
```

> **Real life:** Waiting inside the vault's side room for a specific event ("the manager has countersigned"). If the event already happened (done == true), you don't wait at all. A signal with nobody waiting is a doorbell rung at an empty house — nothing stored, nothing happens.

### Monitor implementation with semaphores (full version)
```
semaphore mutex = 1;    // monitor entry
semaphore next = 0;     // signalers suspended here
int next_count = 0;     // # processes suspended on next
```
Each procedure P:
```
wait(mutex);
   body of P
if (next_count > 0) signal(next);   // resume a suspended signaler
else                signal(mutex);  // or open the door
```
For each condition x: `semaphore x_sem = 0; int x_count = 0;`
```
x.wait():                          x.signal():
  x_count++;                         if (x_count > 0) {
  if (next_count > 0)                    next_count++;
      signal(next);                      signal(x_sem);
  else signal(mutex);                    wait(next);
  wait(x_sem);                           next_count--;
  x_count--;                         }
```
(The signaler steps aside onto `next` so the awakened process can run — preserving "one active process in the monitor.")

### Resuming Processes within a Monitor
- If several processes are queued on condition x and x.signal() executes, **which resumes?** FCFS often isn't adequate.
- **Conditional-wait**: `x.wait(c)` where c = an integer **priority number**; the process with the **lowest number (highest priority)** is scheduled next.

### Single Resource Allocation (ResourceAllocator monitor)
Allocate one resource among competing processes, priority = maximum time the process plans to use it (**shortest time first**):
```
monitor ResourceAllocator {
    boolean busy;
    condition x;
    void acquire(int time) {
        if (busy) x.wait(time);
        busy = true;
    }
    void release() {
        busy = false;
        x.signal();
    }
    initialization code() { busy = false; }
}
```
Usage: `R.acquire(t); … access resource … R.release();`
- Still vulnerable to incorrect use (release before acquire, double acquire, omissions) — same style of misuse as semaphores.

> **Real life:** One MRI machine, several doctors: the booking system admits the shortest scan first. And a doctor could still ignore the system and barge in — process discipline is still required at the edges.

---

## 12. Liveness

- Processes may wait **indefinitely** trying to acquire a synchronization tool → violates progress and bounded waiting.
- **Liveness** = properties a system must satisfy to ensure processes **make progress**. Indefinite waiting is a liveness failure.

### Deadlock
Two or more processes waiting indefinitely for an event that **only one of the waiting processes can cause**.
```
        P0              P1
     wait(S);        wait(Q);
     wait(Q);        wait(S);     ← each holds one, wants the other
       …               …
     signal(S);      signal(Q);
     signal(Q);      signal(S);
```
P0 holds S and waits for Q; P1 holds Q and waits for S; neither will ever signal → **deadlocked**.

> **Real life:** Two people at a narrow doorway each holding one of the two keys needed, each waiting for the other's key while refusing to give up their own. Or two cars gridlocked in an intersection, each blocking the other's path.

### Starvation
- **Indefinite blocking** — a process is never removed from the semaphore queue it's suspended in. (System is live overall, but *this* process never proceeds.)

> **Real life:** The buffet line never technically stops, but people keep cutting in front of you; you never eat. Deadlock = nobody eats; starvation = everyone but you eats.

### Priority Inversion
- A **lower-priority** process holds a lock needed by a **higher-priority** process, and a **medium-priority** process preempts the low one — the medium process indirectly blocks the high one.
- Scenario: P1 (high) waits for semaphore S held by P3 (low); P2 (medium) preempts P3 → P2 delays P3, and therefore P1.
- Solved via the **priority-inheritance protocol**: the process holding the resource **inherits the priority of the highest-priority waiter** until it releases the resource.

> **Real life:** The famous 1997 **Mars Pathfinder** bug: a low-priority weather task held a lock the high-priority bus task needed, while medium tasks kept running — the rover kept rebooting on Mars. NASA fixed it remotely by enabling priority inheritance. Office analogy: the intern (low) has the only stapler the CEO (high) needs, but middle managers keep piling other work on the intern. Priority inheritance = "drop everything, the CEO is waiting on you" — temporary CEO-level priority.

---

## Key Terms Checklist

Race condition, critical section, entry/exit/remainder sections, mutual exclusion, progress, bounded waiting, interrupt disabling, turn variable, Peterson's solution, instruction reordering, memory model (strong/weak), memory barrier, test_and_set, compare_and_swap, atomic variable, mutex lock, acquire/release, busy waiting, spinlock, semaphore, wait/signal (P/V), counting vs binary semaphore, block/wakeup, monitor, condition variable, x.wait()/x.signal(), conditional wait (priority), ResourceAllocator, liveness, deadlock, starvation, priority inversion, priority inheritance.
