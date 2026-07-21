# Chapter 1: Introduction to Operating Systems

*(Silberschatz, Galvin & Gagne, 10th Edition)*

---

## 1. What Is an Operating System?

An **operating system (OS)** is a program that acts as an **intermediary** between the user of a computer and the computer hardware.

**Goals of an OS:**
- Execute user programs and make solving user problems easier
- Make the computer system **convenient** to use
- Use the computer hardware in an **efficient** manner

> **Real life:** Think of the OS as a hotel concierge. You (the user/app) don't go to the kitchen to cook or fix the elevator yourself — you ask the concierge (OS), who knows how to coordinate the staff (hardware) and makes sure guests (multiple programs) don't fight over the same resources.

The term "OS" applies far beyond laptops — cars, airplanes, printers, washing machines, smart TVs, game consoles, and industrial control systems all run some form of operating system. Your Tesla, your smart thermostat, and your PlayStation all have one.

---

## 2. Computer System Structure — The Four Components

1. **Hardware** — provides the basic computing resources: CPU, memory, I/O devices
2. **Operating system** — controls and coordinates use of hardware among applications and users
3. **Application programs** — define the ways system resources are used to solve users' problems (word processors, compilers, browsers, databases, video games)
4. **Users** — people, machines, other computers

> **Real life:** A restaurant. Hardware = kitchen equipment and ingredients. OS = the kitchen manager coordinating who uses which stove. Applications = the chefs cooking specific dishes. Users = customers ordering food.

---

## 3. What Operating Systems Do — Depends on Point of View

- **Users** want convenience, ease of use, good performance — they don't care about resource utilization. (You just want Netflix to play smoothly.)
- **Shared computers** (mainframes, minicomputers) must keep *all* users happy → OS is a **resource allocator** and **control program**.
- **Workstation users** have dedicated resources but frequently use shared server resources (e.g., your office PC uses a shared file server or printer).
- **Mobile devices** (smartphones, tablets) are resource-poor, optimized for **usability and battery life** — touch screens, voice recognition (Siri, Google Assistant).
- **Embedded computers** (in cars, appliances) run with little or no user interface, mostly without user intervention.

> **Real life:** The engine control unit in your car is an embedded computer — it manages fuel injection every millisecond and you never "interact" with it directly.

---

## 4. Defining an OS

- No universally accepted definition.
- Good approximation: **"Everything a vendor ships when you order an operating system."**
- The **kernel** = "the one program running at all times on the computer." Everything else is either:
  - a **system program** (ships with the OS but isn't part of the kernel — e.g., File Explorer, Terminal), or
  - an **application program** (e.g., Spotify, Chrome).
- Modern OSes also include **middleware** — software frameworks providing extra services to developers: databases, multimedia, graphics.

> **Real life:** When you buy an iPhone, iOS includes the kernel (Darwin), system apps (Settings, Files), and middleware frameworks (Core Data for databases, Metal for graphics) that app developers build on.

---

## 5. Computer-System Organization

- One or more **CPUs** and **device controllers** connect through a common **bus** providing access to **shared memory**.
- CPUs and devices execute **concurrently**, competing for memory cycles.
- Each **device controller** is in charge of a particular device type and has a **local buffer**.
- Each controller type has an OS **device driver** to manage it.
- CPU moves data between main memory and local buffers; I/O goes from the device to the controller's local buffer.
- The controller informs the CPU it has finished by causing an **interrupt**.

> **Real life:** Printing a document — the CPU hands the data to the printer controller and moves on to other work. When the printer finishes a page, it "rings a bell" (interrupt) so the CPU knows to send more. Like a waiter who drops off your order at the kitchen and serves other tables until the kitchen bell rings.

---

## 6. Interrupts

- An **interrupt** transfers control to the **interrupt service routine (ISR)**, generally through the **interrupt vector** — a table containing the addresses of all service routines.
- The interrupt architecture must **save the address of the interrupted instruction** so it can resume later.
- A **trap** (or **exception**) is a *software-generated* interrupt caused by an error (e.g., division by zero) or a user request (system call).
- **An operating system is interrupt driven** — it sits idle until something (hardware or software) demands attention.

**Interrupt handling steps:**
1. OS preserves CPU state (registers + program counter)
2. Determines which type of interrupt occurred
3. Separate code segments handle each interrupt type

> **Real life:** You're reading a book (running a program) and your phone rings (interrupt). You put a bookmark in (save program counter/registers), answer the call (run the ISR), then return exactly where you left off. The interrupt vector is like caller ID routing: mom's call → one conversation, boss's call → a different one.

---

## 7. I/O Structure

Two methods for handling I/O after it starts:

1. **Synchronous:** control returns to the user program **only upon I/O completion**.
   - A wait instruction idles the CPU until the next interrupt
   - At most one I/O request outstanding at a time; no simultaneous I/O
2. **Asynchronous:** control returns to the user program **without waiting** for I/O completion.
   - A **system call** lets the user request the OS to wait for I/O completion if needed
   - A **device-status table** contains an entry per device: type, address, state; the OS indexes into it to determine status

> **Real life:** Synchronous = standing at the microwave watching your food until it beeps. Asynchronous = starting the microwave, going off to set the table, and coming back when it beeps. Modern apps do the second — Chrome keeps responding while a big file downloads.

---

## 8. Computer Startup (Booting)

- A **bootstrap program** is loaded at power-up or reboot.
- Typically stored in **ROM or EPROM** — known as **firmware**.
- It initializes all aspects of the system, then loads the **OS kernel** and starts its execution.

> **Real life:** Pressing your laptop's power button → the manufacturer logo screen is the firmware (BIOS/UEFI) doing hardware checks before handing control to Windows/macOS/Linux.

---

## 9. Storage Structure

- **Main memory (RAM)** — the only large storage the CPU can access **directly**; random access; typically **volatile** (contents lost on power-off); usually DRAM.
- **Secondary storage** — extension of main memory providing large **nonvolatile** capacity.
  - **Hard Disk Drives (HDD):** rigid metal/glass platters covered with magnetic material; surface divided into **tracks**, subdivided into **sectors**; the **disk controller** manages the device↔computer interaction.
  - **Non-Volatile Memory (NVM) devices** (e.g., SSDs, flash): faster than hard disks, nonvolatile; increasingly popular as capacity rises and price drops.

**Units:** bit → byte (8 bits) → word (architecture's native unit). KB = 1,024 bytes; MB = 1,024²; GB = 1,024³; TB = 1,024⁴; PB = 1,024⁵. Networking measures in **bits** (data moves a bit at a time).

> **Real life:** RAM is your desk — fast to grab things, but cleared when you leave (power off). Your filing cabinet is the SSD/HDD — slower to access, but everything survives overnight. That's why an unsaved document dies in a power cut but saved files don't. And why your ISP sells "100 Megabit" internet but a 100 MB file takes ~8 seconds, not 1.

---

## 10. Storage Hierarchy & Caching

Storage is organized in a hierarchy by **speed, cost, volatility**:
registers → cache → main memory → NVM/SSD → HDD → tapes/optical

- **Caching** — copying information into a faster storage system temporarily; main memory can be viewed as a cache for secondary storage.
- Faster storage (cache) checked first; on a miss, data is copied into the cache and used there.
- Cache is **smaller** than the storage it caches → **cache management** (size, replacement policy) is an important design problem.
- A **device driver** for each controller provides a uniform interface between controller and kernel.

**Coherency issue:** in multitasking, the most recent value of data "A" might live in a register, a cache, memory, or disk — the system must always use the newest copy. **Multiprocessors need hardware cache coherency** so every CPU sees the most recent value. Distributed systems are even harder (several copies on different machines).

> **Real life:** Caching is keeping snacks in your desk drawer instead of walking to the store each time. The drawer is small, so you must decide what to keep (replacement policy). Coherency: you and a roommate both keep a copy of the shopping list — if one updates theirs, the other's copy is stale. Google Docs solves this the way cache coherency hardware does: everyone sees updates immediately.

---

## 11. Direct Memory Access (DMA)

- Used for **high-speed I/O devices** able to transmit information at close to memory speeds.
- The device controller transfers **blocks of data directly to main memory without CPU intervention**.
- Only **one interrupt per block** rather than one per byte.

> **Real life:** Instead of the CPU carrying every grocery bag from the car one at a time, DMA is a delivery service that unloads the whole trunk and knocks once when done. This is how a 4K video streams from your SSD without maxing out the CPU.

---

## 12. Operating-System Operations

- Bootstrap loads the kernel → kernel starts **system daemons** (services outside the kernel, e.g., print spooler, network service).
- Kernel is **interrupt driven**:
  - **Hardware interrupts** from devices
  - **Software interrupts (traps/exceptions):** software errors (divide by zero), requests for OS service (**system calls**), other problems (infinite loops, processes modifying each other or the OS)

### Multiprogramming (Batch)
- A single user cannot keep CPU and I/O busy at all times.
- Multiprogramming organizes jobs so the **CPU always has one to execute**; a subset of jobs is kept in memory; one is selected via **job scheduling**; when it must wait (e.g., I/O), the OS **switches to another job**.

### Multitasking (Timesharing)
- Logical extension: CPU switches jobs **so frequently** users can interact with each running job → interactive computing.
- **Response time** should be < 1 second.
- Each user has at least one program in memory → a **process**.
- Several jobs ready → **CPU scheduling** decides.
- Processes that don't fit in memory → **swapping** moves them in and out; **virtual memory** allows executing processes not completely in memory.

> **Real life:** Multiprogramming = a chef who starts the soup, and while it simmers (I/O wait), preps the salad. Multitasking = that chef switching between dishes so fast that all tables feel personally attended. Your laptop runs Spotify + Chrome + Word "simultaneously" on a handful of cores through rapid switching.

---

## 13. Dual-Mode Operation

- Dual mode lets the OS **protect itself** and other components: **user mode** and **kernel mode**.
- A **mode bit** (provided by hardware) distinguishes user code from kernel code.
- A **system call changes mode to kernel**; returning from the call resets it to user.
- **Privileged instructions** are executable **only in kernel mode** (e.g., I/O control, timer management).
- Users can't set the mode bit themselves — the only doorway into kernel mode is a controlled one.

> **Real life:** An airport. Passengers (user mode) can roam public areas but can't walk onto the runway. To get anything airside done, you go through official channels (system call = check-in desk), where authorized staff (kernel) act on your behalf. This is why a crashing game doesn't take down all of Windows — it was locked in user mode.

---

## 14. Timer

Prevents a process from hogging the CPU (e.g., infinite loop):
- Timer is set to interrupt the computer after a time period
- A counter is decremented by the physical clock
- The OS sets the counter (**privileged** instruction); when it hits zero → interrupt
- Set up before scheduling a process, so the OS **regains control** or terminates programs exceeding allotted time

> **Real life:** A chess clock or a debate moderator: your time runs out, the floor is taken from you no matter how much you'd like to keep talking. Without it, one buggy app in a `while(true)` loop would freeze the whole machine.

---

## 15. Resource Management Areas

### Process Management
- A **process** = a program **in execution**; program is *passive* (file on disk), process is *active*.
- A process needs resources: CPU, memory, I/O, files, initialization data; on termination, reusable resources are reclaimed.
- **Single-threaded** process: one program counter, sequential execution. **Multi-threaded**: one program counter per thread.
- Many processes (user + system) run concurrently via **multiplexing CPUs**.
- OS responsibilities: creating/deleting processes, suspending/resuming, **synchronization**, **communication**, **deadlock handling**.

> **Real life:** The recipe in a cookbook = program. Actually cooking it — ingredients out, oven hot, halfway through the steps = process. Ten cooks can cook the same recipe at once: one program, several processes (e.g., many users all running Chrome).

### Memory Management
- To execute, all (or part) of a program's instructions and data must be in memory.
- OS keeps track of **who is using which parts of memory**, decides what to move in/out, allocates/deallocates space.

### File-System Management
- OS abstracts physical storage into the logical unit: the **file**; files organized into **directories**.
- Access control determines who can access what.
- Activities: create/delete files and directories, primitives to manipulate them, mapping files onto secondary storage, backups onto stable media.

> **Real life:** You say "save my essay in Documents" — you never think about which physical sectors on the SSD hold it. That abstraction *is* the file system. Access control is why you can't open your sibling's account files.

### Mass-Storage Management
- Disks store data that doesn't fit in memory or must be kept long-term.
- Speed of the whole computer can hinge on the disk subsystem.
- Activities: mounting/unmounting, free-space management, storage allocation, **disk scheduling**, partitioning, protection.

### I/O Subsystem
- Hides hardware peculiarities from the user.
- Responsible for: **buffering** (storing data temporarily during transfer), **caching** (faster storage for performance), **spooling** (overlapping output of one job with input of others), general device-driver interface, drivers for specific devices.

> **Real life:** Spooling = the office printer queue. Five people hit Print at once; jobs line up and print in turn while everyone goes back to work.

---

## 16. Protection and Security

- **Protection** — controlling access of processes/users to resources **defined by the OS**.
- **Security** — defending the system against **internal and external attacks**: denial-of-service, worms, viruses, identity theft, theft of service.
- Systems distinguish users: **user IDs** associated with all that user's files/processes; **group IDs** for sets of users; **privilege escalation** allows temporarily gaining more rights.

> **Real life:** Protection = office key cards: HR can enter the HR room, you can't. Security = the guards and cameras stopping outside burglars. Privilege escalation = `sudo` on Linux or Windows' "Run as administrator" — briefly borrowing the master key, which is also exactly what attackers try to exploit.

---

## 17. Virtualization

- Allows OSes to run applications **within other OSes**.
- **Emulation** — when source CPU type differs from target (e.g., PowerPC on Intel x86); generally slowest. Interpretation when the language isn't compiled to native code.
- **Virtualization** — guest OSes natively compiled for the same CPU run on a host (e.g., VMware running Windows guests on a Windows host). A **VMM (Virtual Machine Manager)** provides the virtualization services.
- Use cases: running multiple OSes on one laptop (e.g., Mac host + Windows guest), developing/testing apps for multiple OSes without multiple machines, QA, managing compute environments in data centers.
- Some VMMs run natively (they *are* the host): VMware ESX, Citrix XenServer.

> **Real life:** Rosetta 2 lets Intel apps run on Apple Silicon Macs — that's emulation. Running a Windows VM in VirtualBox on your Mac for one Windows-only app — virtualization. Nearly every "server" you rent in the cloud is a VM sharing one physical machine with strangers.

---

## 18. Distributed Systems

- Collection of separate, possibly heterogeneous systems **networked together**.
- Network = communications path; **TCP/IP** most common.
- Types: **LAN** (local), **WAN** (wide), **MAN** (metropolitan), **PAN** (personal, e.g., Bluetooth).
- A **network operating system** provides features between systems across the network: message exchange, and the **illusion of a single system**.

> **Real life:** Google Search feels like "one computer," but your query hits thousands of machines across data centers — a distributed system giving a single-system illusion. Your Bluetooth earbuds + phone form a humble PAN.

---

## 19. Computer-System Architecture

- Most systems use a **single general-purpose processor**; most also have **special-purpose processors** (e.g., GPUs, disk controllers).
- **Multiprocessor systems** ("parallel systems," "tightly-coupled") advantages:
  1. **Increased throughput** — more work done in less time
  2. **Economy of scale** — cheaper than multiple single systems (shared peripherals, storage, power)
  3. **Increased reliability** — graceful degradation / fault tolerance
- Two types:
  - **Asymmetric multiprocessing** — each processor assigned a specific task (boss/worker)
  - **Symmetric multiprocessing (SMP)** — each processor performs all tasks (most common today)
- **Multicore design:** multiple cores on one chip; also multi-chip systems and chassis with multiple separate systems.
- **NUMA** (Non-Uniform Memory Access): each CPU has fast local memory; accessing another CPU's memory is slower.

> **Real life:** Asymmetric = a restaurant with one dedicated grill cook, one dessert chef. Symmetric = a food truck where everyone can do everything. Your phone's chip is multicore SMP — 8 cores sharing the work. Graceful degradation: a plane with 4 engines can still fly on 3.

---

## 20. Clustered Systems

- Multiple **systems** (whole computers) working together, usually sharing storage via a **SAN** (storage-area network).
- Provide **high availability** — service survives failures:
  - **Asymmetric clustering:** one machine in **hot-standby** mode (does nothing but monitor; takes over on failure)
  - **Symmetric clustering:** multiple nodes run applications, monitoring each other
- Some clusters exist for **high-performance computing (HPC)** — applications must be written to use **parallelization**.
- **Distributed lock manager (DLM)** avoids conflicting operations on shared data.

> **Real life:** A hospital backup generator = asymmetric clustering (idle until the power fails). Netflix's servers = symmetric clustering: many nodes serving users, and if one dies, others absorb the load — your movie doesn't stop.

---

## 21. Computing Environments

- **Traditional** — standalone general-purpose machines, though now blurred: portals give web access to internal systems, thin clients act like web terminals, firewalls protect home networks.
- **Mobile** — smartphones/tablets; extra OS features (GPS, gyroscope) enable new app types like **augmented reality**; connectivity via 802.11 Wi-Fi or cellular; leaders: **Apple iOS** and **Google Android**.
  - *Real life:* Pokémon GO only exists because the phone OS exposes GPS + camera + gyroscope to apps.
- **Client-Server** — smart PCs replaced dumb terminals; servers respond to client requests:
  - **Compute-server**: interface to request services (e.g., a database)
  - **File-server**: interface to store/retrieve files (e.g., a web server serving your browser)
- **Peer-to-Peer (P2P)** — no client/server distinction; all nodes are **peers**; join by registering with a central lookup service or by broadcasting/discovery. Examples: Napster, Gnutella, Skype (VoIP).
  - *Real life:* BitTorrent — everyone downloading a file also uploads pieces to others; no central "server" holds the file.
- **Cloud Computing** — delivers computing, storage, apps **as a service** across a network; a logical extension of virtualization (it's built on VMs).
  - Example: Amazon EC2 — thousands of servers, millions of VMs, petabytes of storage; **pay per use**.
  - Types: **Public** cloud (anyone who pays), **Private** (run by a company for itself), **Hybrid** (both).
  - Service models: **SaaS** (apps over the Internet — Google Docs), **PaaS** (ready software stack — a managed database), **IaaS** (raw servers/storage — backup storage).
  - Composed of traditional OSes + VMMs + cloud management tools; needs firewalls, **load balancers** to spread traffic.
  - *Real life:* Netflix runs on AWS (IaaS), a startup deploys on Heroku (PaaS), your team writes documents in Google Docs (SaaS).
- **Real-Time Embedded Systems** — the most prevalent form of computers; special/limited purpose; a **real-time OS** has **well-defined fixed time constraints**: processing **must** be done within the constraint or the result is wrong.
  - *Real life:* Airbag controller — deciding to deploy 50 ms late is a failure even if the answer is "correct." Same for pacemakers and anti-lock brakes. Contrast: a slow YouTube load is annoying but not *incorrect*.

---

## 22. Free and Open-Source Operating Systems

- Available in **source-code** format, not just closed-source binary.
- Counter to copy protection and **DRM** movements.
- Started by the **Free Software Foundation (FSF)** with the "copyleft" **GNU Public License (GPL)**.
- Note: *free software* and *open-source software* are two different ideas championed by different groups.
- Examples: **GNU/Linux**, **BSD UNIX** (core of macOS), and many more.
- With free VMMs (VMware Player, VirtualBox), students can run and study hundreds of OSes without dedicated hardware — you can read the actual kernel source instead of guessing from documentation.

> **Real life:** Android is built on the Linux kernel; macOS sits on BSD — you interact with open-source OS code every day. Companies like Red Hat built billion-dollar businesses supporting free software.

---

## Key Terms Checklist

Interrupt, interrupt vector, trap/exception, device controller, device driver, DMA, bootstrap/firmware, volatile vs nonvolatile, caching, cache coherency, multiprogramming, multitasking/timesharing, swapping, virtual memory, dual mode, mode bit, privileged instruction, system call, timer, process, daemon, spooling, protection vs security, user/group IDs, privilege escalation, emulation vs virtualization, VMM, SMP vs asymmetric MP, NUMA, clustering (asymmetric/symmetric), SAN, DLM, LAN/WAN/MAN/PAN, client-server, P2P, SaaS/PaaS/IaaS, real-time OS, GPL/copyleft.
