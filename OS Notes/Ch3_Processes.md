# Chapter 3: Processes

*(Silberschatz, Galvin & Gagne, 10th Edition)*

---

## 1. Process Concept

- A **process** = a **program in execution**. Execution must progress sequentially — no parallel execution of instructions of a single process (a single thread runs one instruction at a time).
- **Program is passive** (an executable file on disk); **process is active**. A program becomes a process when its executable is **loaded into memory**.
- Execution starts via GUI double-click, command-line entry, etc.
- **One program can be several processes** — e.g., multiple users running the same program.

> **Real life:** Chrome.exe on disk = program. Open three Chrome windows as three users = same recipe, multiple simultaneous "cookings." A recipe (program) vs. the act of cooking it right now (process).

### Parts of a process (memory layout)
- **Text section** — the program code
- **Program counter + registers** — current activity
- **Stack** — temporary data: function parameters, return addresses, local variables
- **Data section** — global variables
- **Heap** — memory dynamically allocated at run time

> **Real life:** Text = the printed recipe steps. Program counter = your finger on the current step. Stack = the sticky notes for the sub-task you're in ("whisking — return to step 4 after"). Data = the pantry staples always there. Heap = extra counter space you clear as needed mid-cooking (`malloc`/`new`). When an app has a "memory leak," it keeps grabbing heap and never gives it back.

---

## 2. Process State

As a process executes, it changes state:

- **New** — being created
- **Running** — instructions being executed
- **Waiting** — waiting for some event (e.g., I/O completion)
- **Ready** — waiting to be assigned to a processor
- **Terminated** — finished execution

Transitions: New → Ready → Running → (Waiting → Ready) or (Ready, via interrupt) → … → Terminated.

> **Real life:** A doctor's office. New = filling in registration forms. Ready = sitting in the waiting room (able to be seen, just no free doctor). Running = in the consultation room. Waiting = sent off for an X-ray (can't continue until results return — not just queueing, actually blocked). Terminated = discharged. Key distinction: Ready = *could* run but no CPU; Waiting = *couldn't* run even if given a CPU.

---

## 3. Process Control Block (PCB)

Each process is represented by a **PCB** (task control block) containing:

- **Process state** (running, waiting, …)
- **Program counter** — next instruction location
- **CPU registers** — contents of all process-centric registers
- **CPU scheduling info** — priorities, scheduling-queue pointers
- **Memory-management info** — memory allocated to the process
- **Accounting info** — CPU used, elapsed clock time, time limits
- **I/O status info** — devices allocated, list of open files

> **Real life:** The PCB is the patient's chart hanging at the foot of the bed: identity, current condition, what treatments are underway, which room/equipment is assigned. Any doctor (CPU) can pick up exactly where the last one left off just by reading the chart.

### Linux representation
`task_struct` in C: pid, state, time_slice, parent pointer, children list, open files, memory map (`mm_struct`).

### Threads (preview)
- So far, one thread of execution per process.
- Multiple program counters per process → **multiple threads of control**; PCB must store thread details and multiple PCs. (Chapter 4.)

---

## 4. Process Scheduling

- The **process scheduler** selects among available processes for next execution on a CPU core.
- Goal: **maximize CPU use**, quickly switch processes onto the core.
- Scheduling queues:
  - **Ready queue** — all processes in main memory, ready and waiting to execute
  - **Wait queues** — processes waiting for an event (e.g., I/O)
  - Processes **migrate** among queues.

> **Real life:** Airport gates: the ready queue is planes lined up for the runway (CPU); wait queues are planes parked waiting for fuel trucks or passengers (I/O). A plane finishing refueling rejoins the runway line.

### Context Switch
- Occurs when the CPU switches from one process to another: **save the state of the old** process and **load the saved state of the new** via its PCB.
- Context-switch time is **pure overhead** — no useful work happens during the switch.
- The more complex the OS/PCB, the longer the switch. Hardware can help: multiple register sets per CPU → multiple contexts loaded at once.

> **Real life:** A single mechanic serving several cars: every swap means rolling one car out, wheeling the next in, and re-reading its job sheet — necessary, but no actual repair happens during the swap. This is also why your PC feels sluggish with 100 tabs: an increasing share of time goes to switching, not working.

---

## 5. Multitasking in Mobile Systems

- Early iOS: only **one process** runs, others suspended. Later iOS: a **single foreground process** (the UI) plus **multiple background processes** with limits (single short task, event notifications, specific long-running tasks like audio playback).
- **Android**: foreground and background with fewer limits; a background process uses a **service** to perform tasks — the service keeps running even if the background process is suspended, has no UI, small memory use.

> **Real life:** Spotify keeps playing after you switch apps — that's a sanctioned background task (audio) on iOS, or a service on Android. But a random game freezes when backgrounded: the OS deliberately restricts it to save battery.

---

## 6. Operations on Processes

### Process Creation
- A **parent** creates **children**, which create others → a **tree of processes**.
- Processes identified by a **pid** (process identifier).
- **Resource-sharing options:** share all, share a subset, or share nothing.
- **Execution options:** parent and children run **concurrently**, or parent **waits** until children terminate.
- **Address space options:** child is a **duplicate of the parent**, or child has a **new program loaded** into it.

**UNIX example:**
- `fork()` creates a new process (clone of parent)
- `exec()` after fork replaces the process's memory with a new program
- Parent calls `wait()` for the child to terminate

> **Real life:** Typing `ls` in a terminal: the shell `fork()`s a copy of itself, the copy `exec()`s the `ls` program, the shell `wait()`s, `ls` finishes, prompt returns. Cell division then career change: fork = identical twin appears; exec = the twin instantly retrains as a completely different professional.

### Process Termination
- Process executes its last statement, then asks the OS to delete it via **`exit()`** — returns **status data** to the parent (collected via `wait()`); OS deallocates resources.
- Parent may terminate a child via **`abort()`**, e.g., when: child exceeded allocated resources, its task is no longer required, or the parent is exiting and the OS doesn't allow orphaned children.
- **Cascading termination:** some OSes kill all children/grandchildren when a parent dies — initiated by the OS.
- `pid = wait(&status)` returns status + pid of the terminated child.
- **Zombie** — child terminated but parent never called `wait()` (its exit status lingers in the process table).
- **Orphan** — parent terminated without calling `wait()`; child still running (on UNIX, adopted by `init`).

> **Real life:** Zombie = an employee who finished their contract but HR never processed the paperwork — they're gone, yet still on the org chart. Orphan = the department head quits; corporate HQ (init) adopts the remaining staff. `kill -9` in Linux or "End Task" in Task Manager = abort().

### Android Process Importance Hierarchy
When memory runs low, Android kills processes from **least to most important**:
1. Foreground process (what you see)
2. Visible process
3. Service process
4. Background process
5. Empty process

> **Real life:** Reopen an app you haven't used in days and it restarts from scratch — Android quietly killed it as a low-importance background/empty process to reclaim RAM for what you were actually using.

---

## 7. Multiprocess Architecture — Chrome Browser

- Old browsers = single process → one bad website hangs/crashes the **whole browser**.
- Chrome is **multiprocess**, 3 types:
  - **Browser process** — UI, disk and network I/O (one)
  - **Renderer process** — renders pages, handles HTML/JavaScript; **new renderer per website**; runs in a **sandbox** restricting disk/network I/O → minimizes security exploits
  - **Plug-in process** — one per plug-in type

> **Real life:** When one tab shows "Aw, Snap!" but the rest of Chrome keeps working — that's process isolation paying off. It's the ship-with-watertight-compartments design: one flooded compartment doesn't sink the vessel. (Also why Chrome eats RAM: many processes.)

---

## 8. Interprocess Communication (IPC)

- Processes are **independent** (can't affect each other) or **cooperating** (can affect/be affected, incl. sharing data).
- Reasons to cooperate: **information sharing, computation speedup, modularity, convenience**.
- Cooperating processes need **IPC**. Two models:
  1. **Shared memory**
  2. **Message passing**

> **Real life:** Shared memory = colleagues editing the same whiteboard in one room (fast, but you need rules about who writes when). Message passing = colleagues in different offices sending emails (slower per item, but no fights over the pen — the mail system referees).

---

## 9. Producer–Consumer Problem

Paradigm for cooperating processes: a **producer** produces information consumed by a **consumer**.

- **Unbounded buffer:** no practical size limit — producer never waits; consumer waits if buffer empty.
- **Bounded buffer:** fixed size — producer waits if full; consumer waits if empty.

> **Real life:** A barista (producer) making drinks placed on a pickup counter (buffer) for customers (consumers). Small counter = bounded buffer: if it's full, the barista pauses; if empty, customers wait. YouTube's buffering bar is exactly this: the network produces video chunks, the player consumes them.

---

## 10. IPC — Shared Memory

- An area of memory shared among communicating processes.
- Communication is **under control of the user processes, not the OS**.
- Major issue: providing a mechanism to **synchronize** access to the shared memory (Chapters 6–7).

### Bounded-buffer shared-memory solution
```c
#define BUFFER_SIZE 10
item buffer[BUFFER_SIZE];
int in = 0;   /* next free position */
int out = 0;  /* first full position */
```

**Producer:**
```c
while (true) {
    /* produce item in next_produced */
    while (((in + 1) % BUFFER_SIZE) == out)
        ; /* buffer full — do nothing */
    buffer[in] = next_produced;
    in = (in + 1) % BUFFER_SIZE;
}
```

**Consumer:**
```c
while (true) {
    while (in == out)
        ; /* buffer empty — do nothing */
    next_consumed = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    /* consume it */
}
```

- Correct, but can only use **BUFFER_SIZE − 1** elements (one slot sacrificed to distinguish "full" from "empty").

### Filling ALL the buffers — the `counter` version
Add `int counter = 0`; producer does `counter++` after producing; consumer does `counter--` after consuming; producer waits while `counter == BUFFER_SIZE`, consumer waits while `counter == 0`.

### Race Condition
`counter++` and `counter--` are **not atomic** — each compiles to three machine steps:

```
counter++:                      counter--:
register1 = counter             register2 = counter
register1 = register1 + 1       register2 = register2 - 1
counter = register1             counter = register2
```

Interleaving with counter = 5:
```
S0: producer  register1 = counter        {register1 = 5}
S1: producer  register1 = register1 + 1  {register1 = 6}
S2: consumer  register2 = counter        {register2 = 5}
S3: consumer  register2 = register2 - 1  {register2 = 4}
S4: producer  counter = register1        {counter = 6}
S5: consumer  counter = register2        {counter = 4}  ← wrong! should be 5
```

A **race condition**: the result depends on the exact timing/interleaving of execution.

> **Real life:** A joint bank account with $500. You and your partner both check the balance at ATMs simultaneously (both read 500), you deposit $100 (write 600), they withdraw $100 (write 400). Final balance: $400 — your deposit vanished. Real banks use the synchronization tools of Chapter 6 to prevent exactly this.

- **Why no race in the N−1 solution?** Producer only writes `in`, consumer only writes `out` — no variable is written by both processes. The race appeared when both wrote `counter`.

The same race occurs in the kernel: two processes calling `fork()` concurrently could get the **same pid** from `next_available_pid` without protection.

---

## 11. IPC — Message Passing

- Processes communicate **without shared variables**.
- Two operations: **`send(message)`**, **`receive(message)`** — message size fixed or variable.
- For P and Q to communicate: establish a **communication link**, exchange messages.
- Implementation questions: how are links established? one link per pair or more? link capacity? fixed/variable message size? uni- or bi-directional?
- Physical implementations: shared memory, hardware bus, network.
- Logical dimensions: **direct or indirect**, **synchronous or asynchronous**, **automatic or explicit buffering**.

### Direct Communication
- Processes **name each other explicitly**: `send(P, msg)`, `receive(Q, msg)`.
- Links established **automatically**; exactly **one link per pair**; usually bi-directional.

### Indirect Communication
- Messages sent to/received from **mailboxes (ports)**, each with a unique id.
- Processes communicate only if they **share a mailbox**.
- A link may be associated with **many processes**; each pair may share **several** links.
- Operations: create mailbox, send/receive through it, delete mailbox: `send(A, msg)`, `receive(A, msg)`.
- **Who gets the message** if P1 sends and P2, P3 both receive from mailbox A? Solutions: limit a link to two processes, allow only one receive at a time, or let the system pick arbitrarily (notifying the sender who received).

> **Real life:** Direct = texting a specific person; if they change their number your "link" breaks. Indirect = a Slack channel or a team's shared inbox — many people can post and read, and you need a policy for who handles each incoming ticket.

### Synchronization: Blocking vs Non-blocking
- **Blocking = synchronous:**
  - Blocking send — sender blocked until the message is received
  - Blocking receive — receiver blocked until a message is available
- **Non-blocking = asynchronous:**
  - Non-blocking send — sender sends and continues
  - Non-blocking receive — receiver gets a valid message or null
- Combinations possible; **both blocking = a rendezvous**.

> **Real life:** Blocking send = a phone call — you wait until they pick up. Non-blocking send = texting/email — fire and move on. Rendezvous = a live handshake: both parties must be present at the same moment, like a relay-race baton pass.

### Producer–Consumer with message passing
```c
/* Producer */                     /* Consumer */
while (true) {                     while (true) {
    /* produce item */                 receive(next_consumed);
    send(next_produced);               /* consume item */
}                                  }
```
No shared buffer to guard — the message system does the buffering.

### Buffering
Queue of messages attached to the link; three implementations:
1. **Zero capacity** — no queueing; sender must wait for receiver (**rendezvous**)
2. **Bounded capacity** — length n; sender waits if full
3. **Unbounded capacity** — sender never waits

> **Real life:** Zero = handing a parcel directly to a person. Bounded = a mailbox that fits 10 letters — the mail carrier waits (or comes back) when it's stuffed. Unbounded = an email inbox that (in theory) never fills.

---

## Key Terms Checklist

Process, text/data/heap/stack, program counter, process states (new/ready/running/waiting/terminated), PCB, task_struct, ready queue, wait queue, context switch, fork/exec/wait/exit/abort, pid, process tree, zombie, orphan, cascading termination, sandbox (Chrome renderer), IPC, shared memory vs message passing, producer–consumer, bounded/unbounded buffer, race condition, direct/indirect communication, mailbox/port, blocking/non-blocking, rendezvous, buffering (zero/bounded/unbounded).
