# Operating Systems Practice Midterm — ANSWER KEY

---

## Question #1 (3 marks) — True/False

**(i) FALSE** 
- **Explanation:** In a multithreaded process, threads share the same code, data, and heap. When one thread blocks on I/O, it goes into a waiting state, but *other threads in the same process can continue* executing on the CPU (or on other cores). Only that specific thread is blocked, not the entire process. (This is a key advantage of threads over processes.)

**(ii) FALSE**
- **Explanation:** A monitor is a *higher-level* abstraction than a semaphore. The programmer writes code inside monitor procedures; mutual exclusion is *automatic* (built into the monitor structure itself). The monitor *internally* uses locks/semaphores, but the programmer never explicitly calls acquire/release. With a semaphore, the programmer *must* manually call wait() and signal().

**(iii) FALSE**
- **Explanation:** Spinlocks are efficient only if the wait time is *very short* (microseconds). If a process holds the lock for milliseconds or longer, spinning wastes CPU cycles — a sleeping semaphore with a waiting queue is far more efficient. For long critical sections, let the blocked process sleep and get woken when the lock is free.

---

## Question #2 (2 marks) — IPC Trade-offs

### Shared Memory
**Advantage:** Fast communication; both processes access the same memory directly — no OS overhead of copying data.
**Disadvantage:** Requires explicit synchronization (locks, semaphores, monitors) to prevent race conditions; programmer bears this burden and risk.

### Message Passing
**Advantage:** Automatic synchronization built in; the OS controls the message queue; less prone to race conditions if used carefully.
**Disadvantage:** Slower than shared memory; data must be copied from sender to receiver via the OS (extra overhead); blocking sends/receives can cause unnecessary delays.

---

## Question #3 (2 marks) — Process vs Thread

Creating a **thread** is cheaper than a **process** because a thread does *not* duplicate:
- **Code section (text)** — all threads in a process share the same executable code
- **Data section** — all threads share global variables
- **Heap** — all threads share dynamically allocated memory
- **Open file descriptors** — all threads access the same open files
- **Process ID, parent info, resource limits** — these belong to the process as a whole

A thread *only* gets its own:
- **Stack** — for local variables and function call frames
- **Registers and program counter** — for its independent execution flow

Since most memory is shared, creating a thread requires far less memory allocation and OS bookkeeping than creating an entirely new process (which duplicates almost everything).

---

## Question #4 (3 marks) — System Call Parameter Passing (Block Method)

### (a) How parameters are stored
The calling process stores all parameters in a **contiguous block of memory** — typically a struct or array — at some memory address (e.g., 0x5000).

Example:
```c
struct syscall_params {
    char* filename;  // parameter 1
    int mode;        // parameter 2
    int flags;       // parameter 3
};
struct syscall_params params = {"file.txt", READ, 0};
// All parameters now sit at a single memory address
```

### (b) How the kernel accesses them
The calling process places the *address* of this block into a **single register** (e.g., R1 = 0x5000) and then invokes the system call. The kernel reads the address from the register, then reads all parameters from that memory location. No need to separately load each register.

### (c) One advantage over registers
**No limit on the number of parameters.** With the register method, you're limited by the number of available registers (~8). With the block method, you can pass thousands of parameters; the block can be as large as needed. This is why Linux and Solaris use this method.

---

## Question #5 (3 marks) — Race Condition Analysis

### (i) Interleaved execution leading to balance = 120 instead of 120 (?)
*Note: I think the question meant to say "Show a sequence... that results in a final balance of 70 instead of the correct value."* Let me solve it both ways.

**Correct final value should be:** 100 + 50 − 30 = **120**

**Scenario where we get 70 (or 130):**

Suppose we want to show a race where the result is **70** (only P2's change is visible):

```
Initial: balance = 100

S1: P1   temp1 = balance           {temp1 = 100}
S2: P1   temp1 = temp1 + 50        {temp1 = 150}
S3: P2   temp2 = balance           {temp2 = 100}  ← reads stale value
S4: P2   temp2 = temp2 - 30        {temp2 = 70}
S5: P2   balance = temp2           {balance = 70}  ← write
S6: P1   balance = temp1           {balance = 150} ← write (overwrites P2's update)
```

**Result: balance = 150** (P1's write last)

Or reverse to get 70:
```
S1: P1   temp1 = balance           {temp1 = 100}
S2: P1   temp1 = temp1 + 50        {temp1 = 150}
S3: P1   balance = temp1           {balance = 150}
S4: P2   temp2 = balance           {temp2 = 150}
S5: P2   temp2 = temp2 - 30        {temp2 = 120}
S6: P2   balance = temp2           {balance = 120}  ← but then...
```

Actually, **most likely race: final value = 70** (P1's update lost):
```
S1: P1   temp1 = balance           {temp1 = 100}
S2: P2   temp2 = balance           {temp2 = 100}
S3: P1   temp1 = temp1 + 50        {temp1 = 150}
S4: P2   temp2 = temp2 - 30        {temp2 = 70}
S5: P2   balance = temp2           {balance = 70}
S6: P1   balance = temp1           {balance = 150} ← but P1 wrote 150, overwriting 70!
```

Wait, that gives 150. To get 70:
```
S1: P1   temp1 = balance           {temp1 = 100}
S2: P2   temp2 = balance           {temp2 = 100}
S3: P1   temp1 = temp1 + 50        {temp1 = 150}
S4: P2   temp2 = temp2 - 30        {temp2 = 70}
S5: P1   balance = temp1           {balance = 150}
S6: P2   balance = temp2           {balance = 70}  ← P2's write last, overwrites P1
```

**Result: balance = 70** (P1's +50 is lost!)

**Why the race condition occurs:** 
`balance = temp1` and `balance = temp2` are **not atomic** — they compile to separate machine instructions. Between the time P1 reads `balance` and writes it back, P2 can read the old value, modify it, and write it, only for P1's write to clobber P2's result (or vice versa). The read-modify-write sequence is **not protected** — there's no lock ensuring both processes don't interleave mid-operation.

### (ii) Sequential execution (P1 then P2)
```
Initial: balance = 100

P1 executes completely:
  temp1 = 100
  temp1 = 100 + 50 = 150
  balance = 150

P2 executes (starting with balance = 150):
  temp2 = 150
  temp2 = 150 - 30 = 120
  balance = 120

Final: balance = 120 ✓ (CORRECT)
```

---

## Question #6 (4 marks) — Bounded Buffer with Semaphores

### (i) Semaphore-based solution

**Semaphores needed:**
```c
semaphore mutex = 1;      // mutual exclusion on buffer access
semaphore empty = 5;      // count of empty slots (initially n=5)
semaphore full = 0;       // count of full slots (initially 0)
```

**Producer process:**
```c
while (true) {
    /* Produce an item in next_produced */
    
    wait(empty);           // block if no empty slots
    wait(mutex);           // acquire lock on buffer
    
    /* Add next_produced to buffer */
    
    signal(mutex);         // release lock
    signal(full);          // signal one more full slot
}
```

**Consumer process:**
```c
while (true) {
    wait(full);            // block if no full slots
    wait(mutex);           // acquire lock on buffer
    
    /* Remove item from buffer into next_consumed */
    
    signal(mutex);         // release lock
    signal(empty);         // signal one more empty slot
    
    /* Consume the item in next_consumed */
}
```

### (ii) Why order matters

**Correct order:** `wait(empty)` *before* `wait(mutex)` for the producer.

**If reversed (WRONG):**
```c
wait(mutex);              // WRONG: lock the buffer first
wait(empty);              // then wait for an empty slot
```

**Deadlock scenario:** 
- Buffer is full (5 items)
- Producer calls `wait(mutex)` → acquires the lock
- Producer calls `wait(empty)` → the buffer is full, so `empty = 0` → **producer blocks**
- Producer is now holding the `mutex` lock while blocked
- Consumer tries to call `wait(mutex)` → **consumer blocks**, waiting for the lock
- Consumer never gets to signal `empty`, so the producer never wakes up
- **Deadlock: both processes wait forever**

**Correct order prevents this:** Producer waits on `empty` *before* acquiring the lock. If the buffer is full, it releases the CPU without holding the lock, allowing the consumer to grab `mutex`, remove an item, and signal `empty` to wake the producer.

---

## Question #7 (2 marks) — Memory Barriers and Instruction Reordering

### Without memory barrier
Thread 2 might execute:
```
flag = true;     // reordered to happen FIRST (independent of value assignment)
value = 42;      // reordered to happen SECOND
```

Then Thread 1 sees `flag = true`, exits the loop, and prints `value`, which might still be **0** (the assignment hadn't happened yet in Thread 1's view).

### What the memory barrier fixes
The `memory_barrier()` in Thread 2 forces a **synchronization point**: it ensures that `value = 42` is *complete and visible* in memory **before** `flag = true` is executed. Even if the CPU wants to reorder instructions, the memory barrier says "stop — finish all prior loads/stores before proceeding."

Now when Thread 1 sees `flag = true`, it is *guaranteed* that `value = 42` has been written to memory and is visible to Thread 1 → prints **42**.

---

## Question #8 (3 marks) — Readers–Writers Problem

### (i) Writer starvation

**What it means:** A writer process that wants to write may **never get to write** — it waits indefinitely while readers keep coming and going.

**Specific scenario:** 
- Writer W arrives and calls `wait(rw_mutex)`, but finds it locked by reader R1
- W waits on `rw_mutex`
- Reader R2 arrives → reads `read_count`, increments it, enters the CS, starts reading
- R1 finishes reading, decrements `read_count`, leaves (R2 still reading)
- Reader R3 arrives and reads
- R3 finishes, R2 is still there
- Reader R4 arrives...
- This pattern continues: readers keep arriving and reading, `rw_mutex` is never released
- W waits forever

**Why it happens:** The first reader acquires `rw_mutex` on behalf of all readers; as long as *at least one* reader is present, new readers can jump in without acquiring the lock. Writers can starve if reader arrivals are frequent enough.

### (ii) Give writers higher priority

**Modification:** Use a **separate semaphore** `write_waiters` and a counter to track waiting writers. Once any writer is waiting, new readers *must block* until that writer finishes.

Pseudocode:
```c
semaphore rw_mutex = 1;
semaphore mutex = 1;
semaphore write_mutex = 1;    // new: controls writing
int read_count = 0;
int write_count = 0;          // new: count of waiting writers

Writer:
{
    wait(mutex);
    write_count++;
    signal(mutex);
    
    wait(write_mutex);        // serialize writers
    wait(rw_mutex);           // lock readers/writers out
    /* writing is performed */
    signal(rw_mutex);
    
    wait(mutex);
    write_count--;
    signal(mutex);
    signal(write_mutex);
}

Reader:
{
    wait(mutex);
    if (write_count > 0)      // if writers waiting, reader blocks
        wait(rw_mutex);       // share the lock with writers
    read_count++;
    if (read_count == 1)
        wait(rw_mutex);
    signal(mutex);
    
    /* reading is performed */
    
    wait(mutex);
    read_count--;
    if (read_count == 0)
        signal(rw_mutex);
    signal(mutex);
}
```

This ensures: once a writer is waiting (`write_count > 0`), no new readers start. Readers currently reading can finish, then the writer proceeds.

---

## Question #9 (2 marks) — Interrupts vs Traps

### Hardware Interrupt
- Caused by a **hardware device** (external to the CPU)
- Examples: keyboard key press, mouse click, timer tick (clock interrupt), disk I/O completion, network packet arrival
- Asynchronous — happens *whenever the device is ready*, not under program control
- The interrupt handler (ISR) processes the event

### Software Interrupt (Trap/Exception)
- Caused by the **currently executing program** (internally)
- Examples:
  - **Error:** division by zero, null pointer dereference, invalid memory access
  - **Service request:** a system call (e.g., `open()`, `read()`, `write()`) — the program *intentionally* triggers it via a special trap instruction
  - **Other issues:** illegal instruction, privilege violation
- Synchronous — tied to program execution

### Real-world examples

**Hardware interrupt:** You're typing an essay in Word. At random, you press the 'A' key → keyboard controller sends an interrupt to the CPU → the keyboard driver handles it → your 'A' appears on screen (while Word continues whatever it was doing).

**Software interrupt (trap):** Your program tries `x = 10 / 0` → CPU detects divide-by-zero → raises a trap exception → the OS's exception handler decides to terminate the program or raise an error. This trap is *caused by* the code, not external.

---

## Grading Notes

- **Q1 (3 marks):** 1 mark per correct T/F answer
- **Q2–Q4 (2 marks each):** Concise, clear explanation; 1 mark per major point
- **Q5 (3 marks):** 1 mark for identifying a plausible interleaving; 1 mark for correct final value; 1 mark for explaining why
- **Q6 (4 marks):** 2 marks for correct semaphore design; 1 mark for code; 1 mark for order explanation
- **Q7 (2 marks):** 1 mark for explaining the problem; 1 mark for the fix
- **Q8 (3 marks):** 1 mark for defining starvation; 1 mark for scenario; 1 mark for solution outline
- **Q9 (2 marks):** 1 mark per distinction + example pair

**Total: 20 marks**
