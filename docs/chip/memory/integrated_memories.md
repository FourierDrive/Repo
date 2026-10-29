# Integrated Memories

Write buffers, fetch buffers, and tightly coupled memories (TCM) form the core hardware-managed performance components of modern processors.

## Write Buffer

Write Buffer is a hardware mechanism that temporarily holds store operations so the processor does not stall on slow memory or peripheral accesses. This allows execution to continue while writes are completed in the background.

It improves performance by reducing pipeline stalls and can merge multiple adjacent writes into burst transfers, improving bus efficiency.

Because writes may complete asynchronously, memory may not immediately reflect the most recent store operations. This can make fault timing less intuitive: for example, a bus fault caused by a buffered write may be reported after several subsequent instructions have already executed.

The MPU can control this behavior using the bufferable attribute. When write buffering is disabled, forcing stricter write ordering. When write buffering is enabled, memory barrier instructions such as DSB and DMB are required to ensure correct ordering and visibility of writes, especially when interacting with peripherals, DMA, or synchronization mechanisms.

## Fetch Buffer

Fetch Buffer is a hardware structure that improves instruction throughput by preloading instructions before they are required by the processor pipeline.

Fetch buffers help reduce instruction fetch stalls caused by memory latency or pipeline refill operations. They are commonly used together with instruction caches and branch prediction mechanisms to improve sequential instruction execution efficiency.

Unlike caches, fetch buffers are usually small transient pipeline structures and are not software-visible.

## Tightly Coupled Memory (TCM)

Tightly Coupled Memory (TCM): A software-visible on-chip memory directly connected to the processor core, providing deterministic low-latency access without cache-related overhead such as tag lookup, cache misses, or replacement operations.

TCM is typically implemented using on-chip SRAM and mapped into fixed address regions in the processor memory space. Depending on the processor design, it may be configured as Instruction TCM (ITCM), Data TCM (DTCM), or a unified TCM structure. ITCM is commonly used for time-critical code execution, while DTCM is optimized for low-latency data access.

Unlike caches, TCM contents are managed entirely by software and remain predictable because accesses are not affected by cache hit/miss behavior or memory replacement policies. In many embedded ARM systems, TCM access can complete in a single processor cycle when operating at core frequency.

Typical TCM sizes range from a few kilobytes to several hundred kilobytes, such as 4kB, 16kB, 64kB, or 256kB, depending on processor class and silicon cost constraints.

TCM regions are typically configured as normal memory attributes, and their access permissions are still controlled by the MPU. MPU cacheability or shareability attributes are ignored for TCM regions, which are treated as normal non-cacheable non-shareable memory.

Enabling or disabling TCM typically requires memory barrier instructions such as DSB and ISB to ensure all previous memory operations complete and subsequent instruction execution observes the updated memory configuration correctly.

TCM is commonly used for interrupt handlers, exception vectors, RTOS kernels, motor-control loops, DSP routines, startup code, stack memory, and DMA buffers requiring deterministic real-time behavior.
