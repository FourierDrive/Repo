# Memory Type

Memory type defines the fundamental access behavior of a memory region, including ordering rules, speculation behavior, buffering capability, and cache participation. Different memory regions require different behaviors to balance performance and correctness.

## Normal
* Used for most ROM and RAM regions. All executable code must reside in normal memory regions. Normal memory is optimized for performance and allows the processor and memory system to apply various optimizations.
* Repeated reads and writes are allowed.
* Accesses may be internally reordered.
* Speculative reads and instruction prefetch are allowed.
* Unaligned accesses are generally permitted.
* Multiple accesses may be merged into larger bus transactions.
* Normal memory is typically cacheable and bufferable, providing the highest performance but without strict ordering guarantees.

## Device
* Intended for peripherals and memory-mapped I/O regions. Device memory preserves access ordering, access size, and access count to ensure correct peripheral behavior.
* Speculative access and access merging are not allowed.
* Accesses are typically non-cacheable.
* Unaligned accesses are generally not permitted.
* Limited write buffering may still be allowed, enabling the processor to continue execution before the peripheral transaction fully completes.

## Strongly-ordered
* Used when strict synchronization and completion ordering are required.
* The processor must wait for each access to fully complete before continuing execution.
* Write buffering is not permitted.
* Accesses cannot be reordered, merged, or speculated.
* All accesses must be aligned.
* Strongly-ordered memory provides the strictest ordering guarantees but also introduces the highest access latency.

Modern processors may reorder explicit memory accesses internally to improve performance and reduce power consumption. As a result, the completion order of memory transactions observed by the memory system is not always identical to the program execution order.

In most cases this behavior is transparent to software because the final execution result remains unchanged. Enforcing strict ordering on every access would significantly limit hardware optimizations such as buffering, pipelining, speculative execution, and out-of-order completion.

However, some software operations rely on a specific memory access ordering to maintain correctness and data consistency, especially when interacting with peripherals, DMA, shared memory, or synchronization primitives. In these cases, memory barrier instructions are required to enforce ordering constraints.

The memory system itself also provides partial ordering guarantees depending on the memory type being accessed. If access `A1` occurs before access `A2` in program order, the architectural ordering guarantees are typically summarized as follows:

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
