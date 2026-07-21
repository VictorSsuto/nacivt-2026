# Chapter 2: Operating-System Services

*(Silberschatz, Galvin & Gagne, 10th Edition)*

---

## 1. Operating System Services

The OS provides an environment for executing programs, and services to both **programs** and **users**.

### Services helpful to the USER

- **User interface (UI)** — almost all OSes have one. Varies: **Command-Line (CLI)**, **Graphical (GUI)**, **touch-screen**, **batch**.
- **Program execution** — load a program into memory, run it, end execution normally or abnormally (with an error indication).
- **I/O operations** — running programs may need I/O involving a file or a device.
- **File-system manipulation** — read/write files and directories, create/delete them, search, list info, manage permissions.
- **Communications** — processes exchange information on the same computer or across a network; via **shared memory** or **message passing** (packets moved by the OS).
- **Error detection** — OS constantly watches for errors in CPU/memory hardware, I/O devices, and user programs, and takes appropriate action for correct and consistent computing; debugging facilities help users and programmers.

> **Real life:** When Word crashes, Windows shows "Microsoft Word has stopped working" instead of the whole PC dying — that's error detection + program-execution management. When you AirDrop a photo, that's the communications service. When you drag a file to Trash, that's file-system manipulation through a GUI.

### Services for EFFICIENT SYSTEM OPERATION (resource sharing)

- **Resource allocation** — with multiple users/jobs running concurrently, resources (CPU cycles, memory, file storage, I/O devices) must be divided among them.
- **Logging** — track which users use how much and what kinds of resources.
- **Protection and security** — owners of information control its use; concurrent processes shouldn't interfere with each other. Protection = all access to system resources is controlled. Security = defense from outsiders, requires **user authentication**, extends to defending I/O devices from invalid access.

> **Real life:** Cloud providers bill you by the CPU-hour — that billing is literally the OS logging service turned into an invoice. Your login password is the authentication part of security.

---

## 2. User–OS Interfaces

### CLI (Command-Line Interpreter)
- Allows **direct command entry**; sometimes implemented in the kernel, sometimes as a system program.
- Multiple flavors = **shells** (bash, zsh, PowerShell).
- Primarily **fetches a command from the user and executes it**.
- Commands can be **built-in** or **just names of programs** — if the latter, adding new features doesn't require modifying the shell.

> **Real life:** In Terminal, typing `ls` runs a separate program named `ls`; the shell just finds and launches it. That's why you can install a new tool (e.g., `git`) and use it instantly — no shell update needed.

### GUI
- **Desktop metaphor**: mouse, keyboard, monitor; **icons** represent files/programs/actions; mouse buttons over objects trigger actions (info, options, execute, open a **folder**).
- Invented at **Xerox PARC** (later popularized by Apple and Microsoft).
- Many systems include **both** CLI and GUI:
  - Windows = GUI + "command" shell
  - macOS = "Aqua" GUI over a UNIX kernel with shells available
  - Unix/Linux = CLI with optional GUIs (CDE, KDE, GNOME)

### Touchscreen
- Mouse impossible/undesired; actions based on **gestures**; **virtual keyboard**; **voice commands** (Siri).

> **Real life:** Developers live in the CLI (fast, scriptable); most people live in GUIs; your phone is all gestures. Same OS services underneath, different front doors.

---

## 3. System Calls

- **Programming interface to the services provided by the OS**; typically written in C/C++.
- Mostly accessed via a high-level **API** rather than direct system-call use.
- Three most common APIs: **Win32** (Windows), **POSIX** (UNIX/Linux/macOS), **Java API** (JVM).

> **Real life:** Copying a file involves a whole sequence of system calls: open input file, create output file, loop (read input → write output), handle errors (file doesn't exist? output already exists? disk full?), close both, write completion message. Every "Save As" dialog you've ever used runs this dance.

### Implementation
- Each system call has a **number**; the system-call interface maintains a **table indexed by these numbers**.
- The interface invokes the intended call in the kernel and returns status + return values.
- The caller **needs to know nothing about implementation** — just obey the API. Details are hidden by the API and managed by the **run-time support library**.

> **Real life:** Calling `printf()` in C is like ordering by menu number at a drive-through — you say "number 4" (the API call), the kitchen (kernel) does whatever internal steps it wants, and you get your food (return value). `printf()` internally calls the `write()` system call.

### Parameter Passing — 3 methods
1. **Registers** — simplest, but there may be more parameters than registers.
2. **Block/table in memory** — address of the block passed in a register (used by Linux and Solaris).
3. **Stack** — parameters pushed by the program, popped by the OS.
- Block and stack methods **don't limit** the number or length of parameters.

---

## 4. Types of System Calls

- **Process control:** create/terminate process, end/abort, load/execute, get/set process attributes, wait for time, wait/signal event, allocate/free memory, dump memory on error, debugger support, **locks** for shared data.
- **File management:** create/delete, open/close, read/write/reposition, get/set attributes.
- **Device management:** request/release device, read/write/reposition, get/set attributes, logically attach/detach devices.
- **Information maintenance:** get/set time or date, system data, process/file/device attributes.
- **Communications:** create/delete connection, send/receive messages (client↔server), shared-memory access, transfer status, attach/detach remote devices.
- **Protection:** control access to resources, get/set permissions, allow/deny user access.

> **Real life examples:** Opening Spotify = process-control calls. Saving a playlist = file-management calls. Connecting Bluetooth headphones = device management. Your phone showing the clock = information maintenance. WhatsApp sending a message = communications. "This app wants access to your camera — Allow/Deny" = protection calls.

Windows vs UNIX naming examples: `CreateProcess()` vs `fork()`, `ReadFile()` vs `read()`, `SetFileSecurity()` vs `chmod()`.

---

## 5. System Services (System Programs)

Provide a convenient environment for program development and execution. **Most users' view of the OS is defined by system programs, not actual system calls.**

Categories:
- **File management** — create, delete, copy, rename, print, dump, list files/directories.
- **Status information** — date, time, available memory/disk, number of users; performance, logging, debugging info; some systems have a **registry** to store configuration.
- **File modification** — text editors, search/transform commands.
- **Programming-language support** — compilers, assemblers, debuggers, interpreters.
- **Program loading and execution** — absolute/relocatable loaders, linkage editors, overlay loaders, debuggers.
- **Communications** — virtual connections among processes, users, systems: messaging, web browsing, email, remote login, file transfer.
- **Background services** — launch at boot; some terminate after startup, some run boot→shutdown; provide disk checking, process scheduling, error logging, printing; run in **user context, not kernel context**; known as **services, subsystems, daemons**.
- **Application programs** — run by users, not part of the OS; launched by command line, mouse click, finger poke.

> **Real life:** Task Manager (status info), Notepad (file modification), Windows Update service (background daemon), the Windows Registry (configuration store). You judge "Windows" mostly by these programs — few users ever touch a raw system call.

---

## 6. Linkers and Loaders

- Source code compiles into **relocatable object files** (loadable into any memory location).
- **Linker** combines object files into a single binary **executable**, also bringing in libraries.
- Program sits on secondary storage; the **loader** brings it into memory to execute.
- **Relocation** assigns final addresses to program parts, adjusting code and data to match.
- Modern systems use **dynamically linked libraries (DLLs)** — loaded as needed and **shared** by all programs using the same version (loaded once).
- Object and executable files have **standard formats** (e.g., ELF on Linux, PE on Windows) so the OS knows how to load and start them.

> **Real life:** Building IKEA furniture: object files are the separate pre-made panels, the linker is you assembling them plus the standard screws (libraries) into one bookshelf (executable), the loader is carrying it into the room where it'll actually be used. DLLs = the whole apartment block sharing one washing machine instead of each flat owning one — that's why hundreds of Windows apps share `kernel32.dll`.

---

## 7. Why Applications Are OS-Specific

Apps compiled on one OS usually don't run on another because each OS has **its own unique system calls and file formats**.

Ways to make apps multi-OS:
1. **Interpreted language** (Python, Ruby) with interpreters on multiple OSes.
2. **Language with a VM** (Java on the JVM).
3. **Standard language (C)** compiled **separately for each OS**.

**ABI (Application Binary Interface)** — the architecture-level equivalent of an API: defines how binary code components interface for a given OS on a given architecture.

> **Real life:** You can't double-click a `.exe` on a Mac — different system calls, different binary format. But Minecraft (Java) runs anywhere the JVM exists, and Python scripts run on all three major OSes. Game studios "porting" a game to PlayStation/Xbox/PC are doing option 3.

---

## 8. Design and Implementation

- OS design isn't "solvable," but some approaches proven successful; internal structure varies widely.
- Start by defining **goals and specifications**; affected by hardware choice and system type.
- **User goals:** convenient, easy to learn, reliable, safe, fast.
- **System goals:** easy to design/implement/maintain, flexible, reliable, error-free, efficient.

### Policy vs Mechanism — key principle
- **Policy = WHAT** needs to be done (e.g., "interrupt every 100 seconds").
- **Mechanism = HOW** to do it (e.g., the timer).
- **Separate policy from mechanism** → maximum flexibility when policy changes later (change 100 → 200 without rebuilding the timer).

> **Real life:** A thermostat is a mechanism; "keep the house at 21°C" is a policy. You change the target temperature without buying a new furnace. Same in OSes: the scheduler mechanism stays, priority rules (policy) can be tuned.

---

## 9. Microkernels

- Moves as much as possible **out of the kernel into user space**; **Mach** is a classic example (macOS's Darwin kernel is partly Mach-based).
- Communication between user modules via **message passing**.
- **Benefits:** easier to extend, easier to port to new architectures, **more reliable and secure** (less code runs in kernel mode).
- **Detriment:** performance overhead of user-space ↔ kernel-space communication.

> **Real life:** A minimal head office that outsources everything: if the outsourced print department (a user-space driver) fails, the company (kernel) survives — you restart that one contractor. In a monolithic design (all in-house, like classic Linux), one department fire can burn HQ. The cost: all those inter-office memos (message passing) are slower than shouting across one room. QNX, a microkernel OS, runs in cars and nuclear plants precisely for this fault-isolation.

---

## 10. System Boot

- Power on → execution starts at a **fixed memory location**.
- **Bootstrap loader (BIOS)** in ROM/EEPROM locates the kernel, loads it into memory, starts it.
- Sometimes a **two-step process**: a **boot block** at a fixed disk location is loaded by ROM code, which then loads the full bootstrap loader from disk.
- Modern systems replace BIOS with **UEFI** (Unified Extensible Firmware Interface).
- **GRUB** — common bootstrap loader allowing selection of kernel from multiple disks/versions/options.
- Boot loaders often allow various **boot states**, e.g., **single-user mode** (recovery).

> **Real life:** Dual-booting Windows + Linux? The GRUB menu you see at startup *is* the bootstrap loader letting you pick a kernel. Booting a Mac into Recovery Mode (Cmd+R) = a special boot state, like Windows Safe Mode.

---

## Key Terms Checklist

CLI/shell, GUI, system call, API vs system call, POSIX/Win32, system-call table, parameter passing (registers/block/stack), system programs, daemons/services, registry, linker, loader, relocatable object file, relocation, DLL/dynamic linking, ABI, policy vs mechanism, microkernel, message passing, BIOS/UEFI, boot block, GRUB, single-user mode.
