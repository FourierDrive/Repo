# Memory Protection Unit (MPU)

This section outlines the Protected Memory System Architecture (PMSA) and how the Memory Protection Unit (MPU) provides task isolation, security, and memory attribute configuration in real-time systems.

## Architecture and Configuration

In multitasking real-time operating systems, tasks must run in isolation to avoid corrupting each other or critical system resources. ARM processors provide this isolation through the Protected Memory System Architecture (PMSA), implemented using the MPU.

Compared with the Memory Management Unit (MMU) in VMSA, the MPU is simpler: it does not use page tables, does not perform virtual-to-physical address translation, and instead manages memory using fixed regions. 

* **Region Definition**: Configured using base address and power-of-two size (typically 32B to 4GB, aligned to region size). Common implementation counts are 8, 12, or 16 regions.
* **Overlap Priority**: Regions may overlap, and the highest-priority region determines effective attributes and permissions.
* **Protection Benefits**:
    * Preventing application tasks from corrupting stack or data memory used by other tasks or the OS kernel.
    * Preventing unprivileged tasks from accessing critical peripherals.
    * Marking SRAM or RAM regions as Execute Never (XN) to prevent code injection and execution from data memory.

## Updates and Maintenance

MPU regions can usually be updated without disabling the MPU itself. However, when MPU memory attributes are modified, ARM recommends performing cache maintenance and memory barriers:
* **I-Cache**: Invalidate
* **D-Cache**: Clean and invalidate
* **Barriers**: Use memory barrier instructions such as DSB and ISB to ensure correct synchronization.
