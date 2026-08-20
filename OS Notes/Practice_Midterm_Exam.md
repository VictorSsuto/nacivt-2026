# Operating Systems (Comp 346-like) — Practice Midterm Exam
## Chapters 1–7

**Time: 90 minutes | Total: 20 marks**

**Instructions:**
- Answer all questions. Write your answer very organized & clean.
- ENCS calculators allowed. Exam booklet has 5 pages.
- Answers will be marked out of the stated marks.
- If you do not understand a question, ask for clarification.
- For code/pseudocode: use clear syntax, not vague descriptions.

---

## Question #1 (3 marks)
**True or False.** For each of the following statements, indicate if it is true or false.

**(i)** In a multithreaded process, when one thread blocks on I/O, the entire process blocks; no other thread can continue execution.
- ⊘ True  
- ⊘ False

**(ii)** A monitor is a lower-level synchronization primitive than a semaphore; it requires the programmer to explicitly manage locks.
- ⊘ True  
- ⊘ False

**(iii)** In a multicore system, using a spinlock (busy-waiting lock) is always more efficient than using a semaphore with a waiting queue, regardless of how long processes spend in the critical section.
- ⊘ True  
- ⊘ False

---

## Question #2 (2 marks)
**IPC Trade-offs:** Compare and contrast **shared-memory IPC** and **message-passing IPC**. For each, identify one major advantage and one disadvantage.

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #3 (2 marks)
**Process vs Thread.** Explain clearly why creating a new **thread** is considered cheaper than creating a new **process**. What resource(s) are *not* duplicated when creating a thread that *would* be duplicated in a process?

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #4 (3 marks)
**System Call Parameter Passing.** Explain the **block/table method** for passing parameters to a system call. Include:
- (a) How the parameters are stored
- (b) How the kernel accesses them
- (c) One advantage over the register method

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #5 (3 marks)
**Race Condition Analysis.** Consider this shared-memory code executed by two processes P1 and P2:

```c
// Shared: int balance = 100;

// P1:
int temp1 = balance;
temp1 = temp1 + 50;
balance = temp1;

// P2:
int temp2 = balance;
temp2 = temp2 - 30;
balance = temp2;
```

**(i)** Show a sequence of interleaved machine operations that results in a final `balance` of 120 instead of the correct 120. Explain why this race condition occurs.

**(ii)** What is the result if P1 executes completely, then P2? (Show your work.)

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #6 (4 marks)
**Synchronization Design — Producer–Consumer with Bounded Buffer:**

You are designing a bounded-buffer queue with **n = 5** slots. Two types of processes:
- **Producer(s):** add items to the queue one at a time
- **Consumer(s):** remove and process items one at a time

The queue must satisfy:
1. Producers may not add if the buffer is full
2. Consumers may not remove if the buffer is empty
3. Only one process may modify the buffer at a time

**(i)** Using **semaphores**, design the solution. List the semaphores you need, their initial values, and the code for **both** Producer and Consumer. (Use standard `wait()` and `signal()` notation.)

**(ii)** Explain why the **order** of the `wait()` operations matters. What could go wrong if you reversed them?

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #7 (2 marks)
**Memory Barriers and Instruction Reordering.** Modern multicore processors may reorder independent instructions for performance.

Given:
```c
boolean flag = false;
int value = 0;

// Thread 1:                 // Thread 2:
while (!flag)                value = 42;
  ;                          memory_barrier();
print value                  flag = true;
```

Explain what value Thread 1 might print **without** the memory barrier in Thread 2, and why. What does the memory barrier fix?

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #8 (3 marks)
**Readers–Writers Problem.** In the first readers–writers problem (from Chapter 7):

**(i)** Explain what **starvation of the writer** means in this context. Give a specific scenario.

**(ii)** How would you modify the synchronization to give writers **higher priority** than new readers?

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

## Question #9 (2 marks)
**Interrupts and System Calls.** Explain the difference between a **hardware interrupt** and a **software interrupt (trap)**. Give one real-world example of each.

**Answer:** (Do not exceed the space below)  
[Space for answer]

---

**END OF EXAM**
