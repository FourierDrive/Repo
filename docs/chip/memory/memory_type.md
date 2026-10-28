# Memory Type

This section outlines the fundamental access behaviors, speculation rules, buffering capabilities, and access ordering guarantees defined for different memory regions.

## Fundamental Types

Memory type defines the fundamental access behavior of a memory region, including ordering rules, speculation behavior, buffering capability, and cache participation:

* **Normal**: Used for most ROM and RAM regions. All executable code must reside in normal memory regions. Optimized for performance:
    * Repeated reads and writes are allowed.
    * Accesses may be internally reordered.
    * Speculative reads and instruction prefetch are allowed.
    * Unaligned accesses are generally permitted.
    * Multiple accesses may be merged into larger bus transactions.
* **Device**: Intended for peripherals and memory-mapped I/O regions. Preserves access ordering, size, and count to ensure correct peripheral behavior:
    * Speculative access and access merging are not allowed.
    * Accesses are typically non-cacheable.
    * Unaligned accesses are generally not permitted.
    * Limited write buffering may still be enabled to let the processor continue execution.
* **Strongly-ordered**: Used when strict synchronization and completion ordering are required:
    * The processor must wait for each access to fully complete before continuing execution.
    * Write buffering is not permitted.
    * Accesses cannot be reordered, merged, or speculated.
    * All accesses must be aligned.

## Access Ordering and Barriers

Modern processors may reorder explicit memory accesses internally to improve performance and power efficiency. While transparent for normal software, interactions with peripherals, DMA, or shared memory require explicit ordering.

If access `A1` occurs before access `A2` in program order, the architectural ordering guarantees are summarized as follows:

| A1 | A2 | Ordering Guaranteed |
|----|----|---------------------|
| Normal access | Any memory access | No |
| Any memory access | Normal access | No |
| Device access (Non-shareable) | Device access (Shareable) | No |
| Device access (Shareable) | Device access (Non-shareable) | No |
| Device access (Non-shareable) | Device access (Non-shareable) | Yes |
| Device access (Shareable) | Device access (Shareable) | Yes |
| Strongly-ordered access | Any except normal access | Yes |
| Any except normal access | Strongly-ordered access | Yes |
