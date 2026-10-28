# Memory Region

Most modern embedded processors use a unified memory space, where instructions and data share the same address space. With 32-bit addressing, the processor can theoretically access up to 4GB of memory space.

The address space is typically divided into several logical memory regions. These regions are architectural conventions used to organize different memory behaviors such as executable code, data storage, peripherals, and system control space.

## Code Region
* Primarily used for program storage, including boot code, interrupt vector tables, the program code could be in flash memory, EPROM, OTP ROM, etc.
* Many processors optimize this region using separate instruction and data bus interfaces, allowing instruction fetches and data accesses to occur in parallel. This improves pipeline throughput and interrupt responsiveness because stack accesses and vector fetches may happen simultaneously during exception entry.
* Although intended for program execution, this region usually also supports normal data accesses.

## SRAM Region
* Typically used for on-chip SRAM, stack, heap, and runtime data storage.
* Program execution is often allowed from SRAM regions, but execution performance may be slightly lower than dedicated code regions because instruction fetches usually occur through the system bus rather than a dedicated instruction interface.
* The architecture generally does not require actual SRAM. Depending on system design, this region may contain SRAM, PSRAM, SDRAM, DDR memory, or other byte-addressable memories.

## Peripheral Region
* Used for memory-mapped I/O devices and hardware control registers.
* These regions are normally configured as device memory type to preserve access ordering and exact transaction behavior required by peripherals.
* Program execution from peripheral regions is generally not allowed.

## External RAM Region
* Commonly used for off-chip memories such as SDRAM, DDR, external SRAM, or PSRAM.
* These regions may store both program code and data, although execution performance is typically lower than dedicated code memory regions due to higher access latency.

## Device / System Region
* Used for processor system control components such as interrupt controllers, timers, debug modules, MPU configuration registers, and vendor-specific hardware blocks.
* Access to some system regions may require privileged software access.
* Program execution from these regions is generally prohibited.

Although architectures use names such as "Code", "SRAM", or "RAM", these names do not strictly define the physical implementation. The actual memory device connected to each region is implementation-dependent.

The primary architectural requirement for data memory is usually support for byte, halfword, and word accesses.
