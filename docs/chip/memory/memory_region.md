# Memory Region

This section outlines how modern embedded processors organize a unified address space into logical memory regions to manage executable code, data storage, peripherals, and system control.

## Address Space and Regions

Most modern embedded processors use a unified memory space, where instructions and data share the same address space. With 32-bit addressing, the processor can theoretically access up to 4GB of memory space.

The address space is typically divided into several logical memory regions. These regions are architectural conventions used to organize different memory behaviors such as executable code, data storage, peripherals, and system control space:

* **Code Region**: Primarily used for program storage, including boot code, interrupt vector tables, and program code in flash memory, EPROM, or OTP ROM.
    * Many processors optimize this region using separate instruction and data bus interfaces, allowing instruction fetches and data accesses to occur in parallel.
    * Although intended for program execution, this region usually also supports normal data accesses.
* **SRAM Region**: Typically used for on-chip SRAM, stack, heap, and runtime data storage.
    * Program execution is often allowed from SRAM regions, but performance may be slightly lower than dedicated code regions because instruction fetches usually occur through the system bus.
    * May contain SRAM, PSRAM, SDRAM, DDR, or other byte-addressable memories depending on system design.
* **Peripheral Region**: Used for memory-mapped I/O devices and hardware control registers.
    * Normally configured as device memory type to preserve access ordering and exact transaction behavior required by peripherals.
    * Program execution from peripheral regions is generally not allowed.
* **External RAM Region**: Commonly used for off-chip memories such as SDRAM, DDR, external SRAM, or PSRAM.
    * May store both code and data, though execution performance is typically lower due to higher access latency.
* **Device / System Region**: Used for processor system control components such as interrupt controllers, timers, debug modules, MPU configuration registers, and vendor-specific hardware blocks.
    * Access to some system regions may require privileged software access.
    * Program execution from these regions is generally prohibited.

Although architectures use names such as "Code", "SRAM", or "RAM", these names do not strictly define the physical implementation. The actual memory device connected to each region is implementation-dependent.
