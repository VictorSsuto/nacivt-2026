# Chapter 4: Threads & Concurrency

*(Silberschatz, Galvin & Gagne, 10th Edition)*

---

## 1. Motivation

- Most modern applications are **multithreaded**; threads run *within* an application.
- Multiple tasks within one app can be separate threads:
  - Update display
  - Fetch data
  - Spell checking
  - Answer a network request
- **Process creation is heavy-weight; thread creation is light-weight.**
- Threads can simplify code and increase efficiency.
- **Kernels themselves are generally multithreaded.**

> **Real life:** Microsoft Word while you type: one thread handles your keystrokes, another runs the spell-checker underlining words, another auto-saves — all inside one process, all sharing the same document in memory. If saving required a whole separate *process*, they'd need slow IPC just to see the same document.

---

## 2. Threads vs Processes

- A single-threaded process: one program counter, one stack, one set of registers.
- A **multithreaded process**: threads **share** code section, data section, heap, open files, signals — but **each thread has its own** registers, program counter, and stack.

> **Real life:** A process is a house; threads are roommates. They share the kitchen, fridge, and address (code, data, heap, files) but each has their own bedroom and to-do list (stack, registers, PC). Two processes are two separate houses — sharing sugar requires walking it over (IPC).

### Multithreaded Server Architecture
Client sends a request → server **creates (or assigns) a thread** to service it → server resumes listening for more requests.

> **Real life:** A restaurant host greets each arriving party and hands them to a waiter, then immediately greets the next party. If the host personally served each table start-to-finish (single-threaded), the line at the door would be enormous. This is how web servers handle thousands of simultaneous visitors.

---

## 3. Benefits of Multithreading

1. **Responsiveness** — execution continues even if part of the process is blocked; crucial for user interfaces.
   - *Real life:* You can still scroll a webpage while images load. Without threads, the UI would freeze — the dreaded "Not Responding."
2. **Resource sharing** — threads share the process's resources automatically; easier than shared memory or message passing between processes.
3. **Economy** — cheaper than process creation; thread switching has lower overhead than full context switching.
   - *Real life:* Hiring a roommate vs. building a new house.
4. **Scalability** — a process can exploit **multicore** architectures: threads run in parallel on different cores.

---

## 4. Multicore Programming

Multicore/multiprocessor systems put pressure on programmers. **Challenges:**
- **Dividing activities** — finding tasks that can run in parallel
- **Balance** — tasks should do roughly equal work
- **Data splitting** — dividing data across tasks
- **Data dependency** — when one task needs another's result, execution must be synchronized
- **Testing and debugging** — many possible interleavings make bugs hard to reproduce

> **Real life:** Group project problems, exactly: splitting the work fairly, one member waiting on another's section, and bugs ("it worked when I ran it!") that only appear with certain timing.

### Concurrency vs Parallelism
- **Parallelism** — the system can perform more than one task **simultaneously** (needs multiple cores).
- **Concurrency** — more than one task **making progress** (possible on a single core via the scheduler interleaving them).
- Single core: T1, T2, T3, T4 interleaved in time slices. Multicore: T1 and T3 literally at the same instant on different cores.

> **Real life:** One barista juggling four orders by switching between them = concurrency. Four baristas each making one drink = parallelism. Before ~2005, CPUs gave the illusion of simultaneity; your phone's 8 cores now give the real thing.

### Types of Parallelism
- **Data parallelism** — distribute **subsets of the same data** across cores, same operation on each.
  - *Real life:* Applying a photo filter — each core processes a quarter of the pixels.
- **Task parallelism** — distribute **threads** (different operations) across cores.
  - *Real life:* One core computes the average of a spreadsheet column while another computes the max of the same data. Or in a kitchen: data parallelism = four cooks each chopping a quarter of the onions; task parallelism = one chops, one stirs, one plates.

---

## 5. User Threads and Kernel Threads

- **User threads** — managed by a **user-level threads library**. Three primary libraries: **POSIX Pthreads, Windows threads, Java threads**.
- **Kernel threads** — supported by the **kernel**. Virtually all general-purpose OSes: Windows, Linux, macOS, iOS, Android.

The relationship between user and kernel threads is defined by the multithreading model.

---

## 6. Multithreading Models

### Many-to-One
- Many user-level threads → **one** kernel thread.
- **One thread blocking causes all to block.**
- Threads can't run in parallel on multicore (only one may be in the kernel at a time).
- Few systems still use it. Examples: Solaris Green Threads, GNU Portable Threads.

> **Real life:** A call center with many agents (user threads) but a single phone line (kernel thread). One agent on a long call blocks everyone; ten agents can't help ten customers at once no matter how many desks exist.

### One-to-One
- Each user thread → its **own** kernel thread.
- More concurrency; creating a user thread creates a kernel thread.
- Number of threads per process sometimes **restricted due to overhead**.
- Examples: **Windows, Linux**.

> **Real life:** Every agent gets a personal phone line. Maximum flexibility, but lines (kernel resources) cost money — you can't have unlimited ones.

### Many-to-Many
- Many user threads mapped to **many** (≤) kernel threads.
- OS creates a **sufficient number** of kernel threads.
- Windows with the ThreadFiber package; otherwise not very common.

> **Real life:** 50 agents share a pool of 10 phone lines — a receptionist assigns free lines to whoever needs one. Efficient, but complex to manage.

### Two-level Model
- Like many-to-many, but also allows a user thread to be **bound** to a specific kernel thread.

> **Real life:** The shared line pool, plus a dedicated hotline reserved for the VIP account manager.

---

## 7. Thread Libraries

- A **thread library** provides the programmer with an **API** for creating and managing threads.
- Two ways to implement:
  1. Library **entirely in user space** (no kernel involvement)
  2. **Kernel-level library** supported by the OS

---

## 8. Java Threads

- Managed by the **JVM**; typically implemented using the underlying OS's thread model.
- Creating threads:
  - **Extend the `Thread` class**, or
  - **Implement the `Runnable` interface** ← standard practice:
    ```java
    class Task implements Runnable {
        public void run() { /* work here */ }
    }
    Thread worker = new Thread(new Task());
    worker.start();          // create & run
    worker.join();           // wait for it to finish
    ```

### Java Executor Framework
- Rather than explicitly creating threads, use the **`Executor`** interface:
  ```java
  ExecutorService pool = Executors.newSingleThreadExecutor();
  pool.execute(new Task());       // run a task
  Future<Integer> result = pool.submit(new Callable<Integer>() { ... });
  result.get();                   // retrieve the computed value
  ```
- Separates **task creation** from **task execution**; supports returning results via `Callable`/`Future`.

> **Real life:** Manually creating threads = hiring a new employee for every single task, then firing them. An Executor/thread pool = a staffing agency with workers on standby — you drop off tasks, the agency assigns available workers and hands back results. Every serious server (e.g., a bank's transaction system) uses pools: creating a fresh thread per request would collapse under load.

---

## Key Terms Checklist

Thread, single- vs multithreaded process, shared (code/data/heap/files) vs per-thread (stack/registers/PC), responsiveness, resource sharing, economy, scalability, concurrency vs parallelism, data vs task parallelism, dividing activities/balance/data splitting/data dependency/debugging, user threads, kernel threads, Pthreads/Windows/Java libraries, many-to-one, one-to-one, many-to-many, two-level model, Runnable, join(), Executor framework, Callable/Future, thread pool.
