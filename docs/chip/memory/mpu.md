# Memory Protection Unit (MPU)

In multitasking real-time operating systems, tasks must run in isolation to avoid corrupting each other or critical system resources. ARM processors provide this isolation through the Protected Memory System Architecture (PMSA), implemented using the MPU.

Compared with the Memory Management Unit (MMU) in the Virtual Memory System Architecture (VMSA), the MPU is simpler: it does not use page tables, does not perform virtual-to-physical address translation, and instead manages memory using fixed regions. This reduces flexibility but greatly simplifies hardware and software design, making MPU well-suited for embedded and real-time systems where deterministic behavior is required.

The MPU is an on-core hardware module that configures memory regions defined by base address and power-of-two size (typically 32B to 4GB, aligned to region size). The number of regions is implementation-dependent, commonly 8, 12, or 16. Regions may overlap, and the highest-priority region determines the effective attributes and permissions.

MPU regions can define memory type, access permission, cache policy, shareability, and execution rights. Subregions may also be used in some implementations to refine region granularity. For each memory access, the MPU checks the address against region definitions and the current privilege level. If access is not permitted, a memory protection exception is generated. It improves system robustness and security in several practical ways:
* Preventing application tasks from corrupting stack or data memory used by other tasks or the OS kernel.
* Preventing unprivileged tasks from accessing critical peripherals that affect system reliability or security.
* Marking SRAM or RAM regions as Execute Never (XN) to prevent code injection and execution from data memory.

MPU also applies to memory-mapped peripherals, allowing the system to restrict hardware access to privileged software and improve driver isolation.

If the MPU is disabled, the processor uses the default memory map and default memory attributes defined by the architecture.

MPU regions can usually be updated without disabling the MPU itself. However, when MPU memory attributes are modified, ARM recommends performing cache maintenance to avoid stale cache contents being used with outdated attributes. Typical operations include:
* **I-Cache**: Invalidate
* **D-Cache**: Clean and invalidate

These operations are particularly important when changing cacheability, shareability, memory type, or executable permissions. Context switching normally does not require cache maintenance if MPU attributes remain unchanged.

MPU updates also require memory barrier instructions such as DSB and ISB to ensure correct synchronization of memory accesses and instruction execution.
