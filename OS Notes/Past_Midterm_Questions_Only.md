# Operating Systems Midterm Exam — QUESTIONS ONLY
## Comp 346, Winter 2025
**Professors:** A. Hanna, K. Jabado & E. Chan  
**Time:** 90 minutes  
**Total Marks:** 20

---

## Question #1 (3 marks) — True or False
**Consider each of the following statements is true or false.**

**(i)** In a single-CPU system, using processes instead of threads can enhance performance by reducing context switching time.
- ⊘ True  
- ⊘ False

**(ii)** If an OS is designed to always run in kernel mode (i.e. an embedded system where no user processes run), there is no need for the kernel to check what mode the CPU is operating in.
- ⊘ True  
- ⊘ False

**(iii)** The CPU is responsible for directly managing data transfers between memory and peripherals when DMA (Direct Memory Access) controllers are used.
- ⊘ True  
- ⊘ False

**(iv)** In a single-core (single-CPU) system, disabling- and enabling- interrupts is a sufficient mechanism for implementing semaphores to ensure mutual exclusion.
- ⊘ True  
- ⊘ False

---

## Question #2 (2 marks)
**Is it possible to design an operating system that can support both uni-programming and multi-programming? If yes, indicate the advantages of such a system. If no, explain clearly why such system cannot be designed.**

**Answer:** (Important: do NOT exceed space below)

[Space for answer]

---

## Question #3 (2 marks)
**NUMA (Non-Uniform Memory Access).** Assume a system where, by design, it has multiple CPUs, and non-uniform memory access (NUMA) is available. The system also has multiple tasks that require quick memory access to optimize performance. As a designer for an OS that is designed for such a system, would you enforce hard-affinity, soft-affinity, or no affinity? Explain clearly the reason behind your choice.

**Answer:** (Do not exceed the space below)

[Space for answer]

---

## Question #4 (3 marks)
**As part of an operating system development team, one of your teammates put forward a proposal in relation to thread models in order to increase performance and flexibility in particular. The system currently implements a hybrid user-kernel thread model that combines the one-to-one and many-to-many models. Instead of inspecting configuration files to decide which threads should be served by the one-to-one model and which by the many-to-many model, the system introduces randomization. Each thread is randomly assigned to either a one-to-one or many-to-many model upon creation or while they are about to execute.**

**(i) Would you support this randomization proposal? If yes, explain how this could potentially enhance system performance and flexibility. If no, explain clearly your reasons, including why this proposal could have no benefit, or even harm the system.**

**Answer:** (Do not exceed space below)

☐ Yes; I support the proposal  
☐ No; I reject the proposal

[Space for answer]

---

## Question #5 (3 marks)
**Once a computer system is shutdown, information on its main memory is erased. Additionally, Operating Systems are stored on the secondary memory, so the CPU cannot directly access them. Explain how a system can then be brought/powered up considering these circumstances/restrictions.**

**Answer:** (Important: do NOT exceed space below)

[Space for answer]

---

## Question #6 (2 marks)
**As the lead software engineer at an aerospace company, you are overseeing the development of a next-generation autonomous drone system designed to operate flawlessly across multiple onboard computer systems, which vary in operating system architectures depending on the manufacturer. However, a major challenge: your lab has only two immediate options due to strict budget constraints and long production cycles:**

**Solution 1:** Reset and reconfigure the operating systems used following interesting ideas/solutions proposed by two of your colleagues.

**Solution 2:** Wait for more testing drones to be manufactured and accessible so that you can test each hardware configuration one by one.

**A third approach is a real-world scenario so can be avoided.**

**You immediately rejected both ideas.**

**(i) What is your one major reason behind rejecting the first idea (reset and reconfigure)?**

[Space for answer]

**(ii) What is your one major reason behind rejecting the second idea (waiting for more drones)?**

[Space for answer]

**(iii) What is your solution to the problem? Explain clearly and precisely:**

[Space for answer]

---

## Question #7 (3 marks)
**The following code was proposed for the purpose of acquiring a lock in a single-core (single-CPU) system. A process that is able to acquire the lock will be able to proceed to a critical section. After finishing the critical section, the process simply sets the lock to false; hence we releasing it.**

```c
boolean lock = false;  // initial value of lock

acquireLock()                          |  releaseLock()
{                                      |  {
    D.I.      // Disable Interrupts   |      lock = false;
    if (lock == true)                 |  }
    {                                  |
        E.I.   // Enable Interrupts   |
    }                                  |
    while(lock == true)  {             |
        ; // go back to loop           |
    }                                  |
    lock = true;                       |
    E.I.      // Enable Interrupts →C.S  |
}                                      |
```

**Will that code successfully obtain and releases the lock, hence providing mutual exclusion of the critical section that it is trying to protect? If yes, explain why the solution is correct. If no, provide a detailed explanation example/scenario that shows how this solution is fail.**

**Answer:** ☑️ Yes; solution is correct.  
☐ No; solution is not correct.

**Explanation:** (Please indicate the exact line numbers when you refer to any of the statements in your solution)

[Space for answer]

---

## Question #8 (4 marks)
**Sometimes it is necessary to synchronize two or more processes in a group, so that every process must finish its first phase of computation before any other process is allowed to start its second phase. This is called barrier synchronization. For example, for two processes P1 and P2, we can write:**

**→ P() and V() are wait() and signal(), respectively.**

| **Process P1** | **Process P2** |
|---|---|
| "Phase I" | "Phase I" |
| V (s1) | V (s2) |
| P (s2) | P (s1) |
| "Phase II" | "Phase II" |

**For this question, you are required to synchronize three processes P1, P2 and P3. The new rules are:**

1) The two phases are **critical sections**, so no more than one process can be executing inside these critical sections at any time.
2) For Phase I, any of the three processes can execute that phase before the others; so any order of execution is possible.
3) All processes must finish Phase I before any of them can start Phase II, and
4) Phase II must not proceed/execute in that order. P1, P3, P2, P2. (That is P1 must finish Phase II before P2); You are allowed to use any number of semaphores; however, semaphores can NOT have any negative values. Initially setting any semaphore to a negative value will totally solve the solution.

**Answer:**

**Semaphores:** [Your semaphore definitions]

| **Process P1** | **Process P2** | **Process P3** |
|---|---|---|
| | | |

---

**END OF EXAM**
