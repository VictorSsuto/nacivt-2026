# Operating Systems Midterm Exam — ANSWER KEY
## Comp 346, Winter 2025

---

## Question #1 (3 marks) — TRUE/FALSE ANSWERS

**(i) FALSE** 
- Using processes *increases* context switching overhead (processes are heavier). Threads have lower overhead.

**(ii) TRUE**
- If the OS always runs in kernel mode (no user processes), there's no need to check/switch modes. The mode bit is irrelevant.

**(iii) FALSE**
- DMA controllers manage transfers **without CPU intervention**. The CPU is NOT responsible for direct management.

**(iv) TRUE**
- On a single-core system, disabling interrupts is sufficient for mutual exclusion. Only one execution path exists, so no other code can run while interrupts are disabled.

---

## Question #2 (2 marks)

**Answer:** Yes; it is possible to design such a system.

**Advantages:** 
- This system will be able to execute multiple processes, being are physical machine, but it can also handle are process, this system is efficient and cost less.
- (Better answer would mention: The OS can switch between uni and multi-programming modes, allowing flexibility. Single programs run without scheduling overhead; multiple programs use resources efficiently.)

---

## Question #3 (2 marks)

**Recommended Choice: Hard-Affinity**

**Explanation:**
The CPU could be processor specific meaning that accessing a specific code will be more optimal. If a process can locate the cache, this is where I can see a case where it could be on an any instance that might have more processes, which would take longer to run this will be less optimal than if it were quicker.

(Better answer: With NUMA, hard-affinity ensures each process stays on its local CPU and memory, minimizing access latency. Soft-affinity is inefficient because processes would bounce between CPUs, incurring high remote memory access costs.)

---

## Question #4 (3 marks)

**Answer:** ☐ Yes; I support the proposal  
**Selected:** ☑️ No; I reject the proposal

**Explanation:**
The core bottleneck is we cannot determine which threads is not well reconfigured. Since all the threads it will be hardened for the system to locate the thread with specific informatizes. Since it has been assigned randomly. the many-to-many model can contain is many this become too many. this becomes weight.

(Better answer: Random assignment is poor design because: (1) You lose deterministic behavior—unpredictable scheduling. (2) Random decisions require overhead to manage. (3) Threads needing specific performance characteristics can't be guaranteed. (4) No way to optimize for workload patterns. A configuration-based or automatic adaptive approach is better.)

---

## Question #5 (3 marks)

**Answer:**
Can use polling to retrieve the data — so as to able DMA, the information can be further requested by the CPUs are BIOS. Bootstrap loader in BIOS.

**Better Answer:**
1. **Bootstrap Program (BIOS/UEFI)** stored in ROM loads at power-on
2. Bootstrap initializes hardware and locates the kernel on secondary storage (disk)
3. **Bootloader** (like GRUB) loads the kernel from disk into RAM
4. Kernel begins execution from the loaded code
5. Kernel initializes system services and loads drivers

The key: A small, permanent ROM-based program (firmware) can access secondary storage to load the large OS kernel into RAM.

---

## Question #6 (2 marks)

**(i) Major reason for rejecting Solution 1 (reset and reconfigure):**
It is not off client if is not well reconfigured, all reconfigure architecture will time be hard for the system to locate the thread with specific informatizes.

(Better: Reconfiguring OSes requires extensive testing and validation per hardware type. Different architectures have different OS requirements and drivers. Manual reconfiguration is error-prone and doesn't scale to multiple drone variants.)

**(ii) Major reason for rejecting Solution 2 (waiting for more drones):**
It will take a long time to produce and the other drones resources are needed to be tested for were will require even more time.

(Better: Production cycles are long; waiting delays drone deployment indefinitely. Testing one config at a time is sequential—too slow. You need a solution that works NOW with current resources.)

**(iii) Your solution:**
Use the use memory are solution, as only one unit will be needed to load the configuration which may be a memory will be needed to test the infrastructure, only the for using and modify.

(Better: Use **virtualization/containerization**: Create virtual environments on each physical drone that can run different OS instances. One set of hardware can test multiple OS configurations simultaneously through VMs. This avoids reconfiguration and doesn't require waiting for new hardware.)

---

## Question #7 (3 marks)

**Answer:** ☑️ Yes; solution is correct.

**Explanation:**
At first, lock is set to false, acquireLock() is D.I. and only if T, we E.I., use skip since lock = F. While(lock == true) skip since lock is still F. Then lock becomes T and we E.I. release lock(), lock = F. If we acquireLock() again, the process will do the same thing again. We start by D.I., this means that we cannot have 2 process n CS at same time, hence M.E. At the same time if at acquireLock(), lock stays true and process never leaves the C.S. it means that lock will never be released, which also means that other processes won't be able to start either.

**Detailed Correct Analysis:**

1. **Mutual Exclusion (✓):** At line D.I., interrupts are disabled, so no context switch can occur. This prevents concurrent access to the CS. When one process holds the lock (line "lock = true"), no other process can even check the lock value until this process re-enables interrupts (E.I.).

2. **Why it works on single-core:** Since there's only one CPU and interrupts are disabled, the running process cannot be preempted. No other process can execute, so mutual exclusion is guaranteed.

3. **Lock mechanism:** 
   - If lock = false: Process enters CS and sets lock = true
   - If lock = false again: Other processes can't run (interrupts disabled), so lock remains true
   - After CS: Process sets lock = false, enabling other processes

4. **No deadlock:** Eventually, the process in CS finishes, sets lock = false, and re-enables interrupts. Another process can then acquire the lock.

---

## Question #8 (4 marks)

**Semaphores:**
```
s24 = 0
s23 = 0  
sm = 0
```

Or using a clearer naming:
```
s1_2 = 0      (P1 signals P2 to start Phase II)
s2_3 = 0      (P2 signals P3 to start Phase II)
mutex = 1     (mutual exclusion for CS)
```

**Solution (Barrier Synchronization for 3 Processes):**

| **Process P1** | **Process P2** | **Process P3** |
|---|---|---|
| **Phase I** | **Phase I** | **Phase I** |
| V(s1) | P(s1) | P(s2) |
| P(s2) | V(s2) | V(s3) |
| | P(s3) | |
| **Phase II** | **Phase II** | **Phase II** |
| V(sm) | P(sm) | P(sm) |
| P(s3) | V(s1) | V(s2) |

**Better/Cleaner Solution:**

Using semaphores: `mutex=1, barrier_count=3, barrier_lock=0`

| **Process P1** | **Process P2** | **Process P3** |
|---|---|---|
| Phase_I() | Phase_I() | Phase_I() |
| wait(mutex) | wait(mutex) | wait(mutex) |
| barrier_count-- | barrier_count-- | barrier_count-- |
| if(barrier_count==0) signal(barrier_lock) x3 | if(barrier_count==0) signal(barrier_lock) x3 | if(barrier_count==0) signal(barrier_lock) x3 |
| else wait(barrier_lock) | else wait(barrier_lock) | else wait(barrier_lock) |
| signal(mutex) | signal(mutex) | signal(mutex) |
| | | |
| Phase_II() | Phase_II() | Phase_II() |
| (P1 before P2) | (P2 before P3) | |

**Explanation:**
- All processes must complete Phase I before any enters Phase II (barrier)
- Only one process in critical section at a time (mutual exclusion with mutex)
- P1 must finish Phase II before P2, P2 before P3 (ordering)
- Semaphores cannot go negative (they block at 0, don't go below)

---

## GRADING SUMMARY

**Total: 20 marks**
- Q1: 3 marks (True/False)
- Q2: 2 marks (Design tradeoff)
- Q3: 2 marks (NUMA affinity choice)
- Q4: 3 marks (Thread model proposal)
- Q5: 3 marks (System boot/startup)
- Q6: 2 marks (Multi-part design problem)
- Q7: 3 marks (Lock code analysis)
- Q8: 4 marks (Barrier synchronization)
