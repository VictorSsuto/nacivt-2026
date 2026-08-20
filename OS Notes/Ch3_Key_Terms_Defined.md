# Chapter 3: Processes — Key Terms Defined

---

## Process Concepts

**Process** — A program in execution; an active entity with its own memory space, registers, and program counter. Unlike a program (static file on disk), a process is running and consuming resources.

**Program** — A passive entity; an executable file stored on disk containing instructions. Becomes a process when loaded into memory and executed.

**Text Section** — The part of a process containing the program code (instructions). Typically read-only and shared among multiple instances of the same program.

**Data Section** — The part of a process containing global variables that persist for the entire process lifetime.

**Heap** — Memory dynamically allocated at runtime (via `malloc()`, `new`, etc.). Controlled by the programmer; must be manually freed.

**Stack** — Memory used for function call frames, local variables, return addresses, and function parameters. Automatically managed; grows/shrinks with function calls.

**Program Counter (PC)** — A register that holds the memory address of the next instruction to be executed. Unique to each process/thread.

**Registers** — CPU storage locations holding data needed for current execution. Each process has its own register state saved in the PCB.

---

## Process States

**Process State** — The current condition of a process (New, Ready, Running, Waiting, Terminated). Determines what the OS can do with the process.

**New** — The initial state when a process is being created. Resources are allocated, PCB is created, but the process hasn't entered the ready queue yet.

**Ready** — The process is prepared to run and waiting in the ready queue for the CPU scheduler to assign it to a core. It has all resources except CPU time.

**Running** — The process is currently executing on the CPU. Instructions are being executed; registers contain the process's data.

**Waiting** — The process is blocked, unable to proceed because it's waiting for an event (I/O completion, lock release, timer expiration, etc.). Also called "Blocked."

**Terminated** — The process has finished execution. Resources are deallocated; the PCB is removed from the system.

---

## Process Control & Management

**Process Control Block (PCB)** — A kernel data structure that contains all information about a process: state, program counter, registers, memory info, scheduling info, accounting info, I/O status. The OS uses this to manage and restore the process.

**Task Control Block (TCB)** — Synonym for PCB; used interchangeably.

**Process ID (pid)** — A unique identifier assigned to each process by the OS. Used to track and reference the process throughout its lifetime.

**Process Tree** — A hierarchical structure showing parent-child relationships between processes. When a parent creates a child via `fork()`, the child becomes part of the parent's subtree.

**Parent Process** — A process that creates child processes via system calls like `fork()`.

**Child Process** — A process created by a parent process. Typically inherits certain properties or resources from the parent.

**Context Switch** — The act of the OS saving the state of one process (its PCB, registers, PC) and loading the state of another process to execute it on the CPU. Pure overhead; no useful work is done.

---

## Process Creation & Termination

**fork()** — A UNIX system call that creates a new process (child) as an exact duplicate of the calling process (parent). Both parent and child continue executing from the same point, but with different PIDs.

**exec()** — A UNIX system call that replaces the current process's memory image (code, data, heap, stack) with a new program. The PID remains the same, but the process now runs different code.

**wait()** — A system call that causes the parent process to block (go to Waiting state) until one of its child processes terminates. Returns the child's exit status and PID.

**exit()** — A system call that terminates the calling process. Can return an exit status (0 = success, non-zero = error) to the parent via `wait()`.

**abort()** — A system call called by a parent process to forcibly terminate a child process. Reasons include: child exceeded resources, task no longer needed, or parent exiting.

**Process Termination** — The end of a process. Resources are deallocated, exit status is returned to the parent, PCB is removed.

**Cascading Termination** — When a parent process terminates, all its children (and grandchildren, etc.) are also terminated by the OS. Used to prevent orphaned processes.

---

## Process Issues

**Zombie Process** — A process that has terminated but whose parent never called `wait()` to collect its exit status. The PCB lingers in the process table; the child is dead but not fully cleaned up.

**Orphan Process** — A process whose parent has terminated without calling `wait()`. On UNIX, orphan processes are adopted by the `init` process (PID 1).

**Process Starvation** — A situation where a process never gets scheduled to run despite being ready, often due to unfair scheduling or priority inversion.

---

## Scheduling & CPU Management

**Ready Queue** — The data structure (typically a linked list or queue) containing all processes in the Ready state, waiting for the CPU scheduler to assign them CPU time.

**Wait Queue** — The data structure containing all processes in the Waiting state, blocked on I/O or other events. Different wait queues may exist for different I/O devices.

**Scheduling** — The process of the OS deciding which process to run next on the CPU. Handled by the CPU scheduler (part of the kernel).

**Process Scheduler** — A kernel component that selects which ready process should run on the CPU next. Balances throughput, response time, and fairness.

**Multiprogramming** — A technique where multiple processes are kept in memory simultaneously. When one process waits for I/O, the OS switches to another process, keeping the CPU busy.

**Multitasking** — An extension of multiprogramming where the OS switches between processes so frequently (via timer interrupts) that each appears to run continuously. Enables interactive computing.

**Context Switch Time** — The time spent by the OS saving one process's state and loading another's. Pure overhead; no user work is done.

---

## Interprocess Communication (IPC)

**Interprocess Communication (IPC)** — The mechanism by which two or more processes exchange information or coordinate their actions. Two main models: shared memory and message passing.

**Cooperating Processes** — Processes that can affect or be affected by each other's execution (e.g., sharing data). Opposite of independent processes.

**Shared Memory** — An IPC model where two processes have access to the same memory region. Communication is fast but unprotected; requires synchronization tools (locks, semaphores) to prevent race conditions.

**Message Passing** — An IPC model where processes communicate by sending and receiving messages through the OS. No shared memory; communication is through send/receive operations.

---

## Producer-Consumer Problem

**Producer-Consumer Problem** — A classic synchronization problem where a producer process generates data and a consumer process uses it. Models many real-world scenarios (e.g., file reading/writing, network communication).

**Producer Process** — A process that generates or produces items (e.g., data, messages) and places them in a buffer for the consumer.

**Consumer Process** — A process that retrieves and uses items from a buffer produced by a producer.

**Bounded Buffer** — A fixed-size buffer (e.g., 10 slots) shared between producer and consumer. Producer waits if full; consumer waits if empty.

**Unbounded Buffer** — A buffer with no practical size limit. Producer never waits; consumer waits only if buffer is empty.

**Race Condition** — A situation where the result of concurrent execution depends on the timing/interleaving of operations. Occurs when multiple processes access shared data without synchronization (e.g., two processes incrementing the same counter simultaneously).

---

## Mailboxes & Direct Communication

**Mailbox (Port)** — An OS-managed message queue with a unique ID. Processes send messages to the mailbox and receive messages from it. Multiple processes can share a mailbox.

**Direct Communication** — An IPC style where processes name each other explicitly: `send(P, message)` sends to process P; `receive(Q, message)` receives from process Q.

**Indirect Communication** — An IPC style where processes communicate through mailboxes/ports instead of naming each other directly. Decouples sender and receiver.

---

## Message Passing Synchronization

**Blocking Send** — A send operation where the sender blocks (goes to Waiting state) until the receiver has received the message. Synchronous.

**Blocking Receive** — A receive operation where the receiver blocks until a message is available. Synchronous.

**Non-Blocking Send** — A send operation where the sender sends the message and immediately continues without waiting for the receiver. Asynchronous.

**Non-Blocking Receive** — A receive operation that returns immediately with a message (if available) or NULL (if none). Asynchronous.

**Rendezvous** — A synchronization pattern where both send and receive are blocking. Sender and receiver must "meet" in time; one blocks until the other arrives.

**Buffering** — Storage of messages in a queue between sender and receiver. Three types:
  - **Zero capacity:** No queueing; sender must wait for receiver (rendezvous)
  - **Bounded capacity:** Queue holds up to n messages; sender waits if full
  - **Unbounded capacity:** Queue can grow indefinitely; sender never waits

---

## Process Architecture Examples

**Chrome Multiprocess Architecture** — Google Chrome's design where each tab/extension runs in its own renderer process with a single browser process managing the UI. Provides isolation: if one tab crashes, others survive.

**Browser Process** — The main Chrome process that manages the user interface, disk I/O, and network I/O. Survives if renderer processes crash.

**Renderer Process** — A Chrome process that renders a website (HTML, JavaScript, CSS). Runs in a sandbox for security. One renderer per website tab.

**Sandbox** — A restricted execution environment that limits a process's access to disk and network I/O. Used to minimize security exploits from malicious or buggy code.

**Plug-in Process** — A separate Chrome process for each type of plug-in (e.g., Flash). Isolated from other processes.

---

## Mobile Process Management

**Android Process Importance Hierarchy** — A ranking system used by Android to determine which processes to terminate when memory is low:
  1. Foreground (what user sees)
  2. Visible
  3. Service
  4. Background
  5. Empty

---

## Summary Checklist

- [ ] Process vs Program
- [ ] Text/Data/Heap/Stack sections
- [ ] Process states (New, Ready, Running, Waiting, Terminated)
- [ ] PCB contents and purpose
- [ ] Context switch mechanism and cost
- [ ] fork(), exec(), wait(), exit() system calls
- [ ] Zombie and orphan processes
- [ ] Ready and wait queues
- [ ] Producer-consumer problem
- [ ] Race conditions in shared memory
- [ ] Bounded vs unbounded buffers
- [ ] Direct vs indirect communication
- [ ] Blocking vs non-blocking message passing
- [ ] Rendezvous
- [ ] Mailboxes/ports
- [ ] Chrome multiprocess architecture
- [ ] Android process importance hierarchy

---

Use this guide to study and reinforce the key concepts from Chapter 3!
