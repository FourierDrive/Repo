# Memory Attributes

This section outlines how caching, buffering, coherency, and access permissions are configured for memory regions to balance correctness and performance.

## Core Attributes

Memory attributes define how the processor and memory system handle caching, buffering, coherency, and access permissions, typically configured through the MPU:

* **Cacheability**: Controls whether memory accesses participate in the cache hierarchy.
    * **Non-cacheable**: Accesses bypass the cache and directly access memory or peripherals.
    * **Write-Back Write-Allocate (WBWA)**: Read and write accesses are cached. Write misses allocate cache lines, and modified data is written back later during eviction.
    * **Write-Through (WT)**: Writes update both cache and main memory simultaneously.
    * **Write-Back (WB)**: Writes initially update only the cache, while memory is updated later when dirty cache lines are cleaned or evicted.
* **Bufferable**: Controls whether write accesses can be temporarily stored in a write buffer while the processor continues executing subsequent instructions.
* **Shareability**: Defines whether memory coherency must be maintained between multiple bus masters such as processors, DMA controllers, or hardware accelerators.
    * **Shareable**: The memory system guarantees visibility and synchronization between multiple masters (strongly-ordered memory is always shareable).
    * **Non-shareable**: Software must explicitly maintain coherency using cache maintenance operations or synchronization mechanisms.
* **Permission Control**: Defines which software contexts are allowed to access a memory region (User/Privileged, Read/Write, Executable, Execute Never / XN).

## Effective Memory Behavior Matrix

The combination of Bufferable and Cacheable attributes determines the effective memory access behavior:

| Bufferable | Cacheable | Effective Memory Behavior |
|------------|------------|----------------------------|
| 0 | 0 | Strongly-ordered memory. Accesses are strictly ordered and write buffering is not allowed. |
| 1 | 0 | Device memory. Limited write buffering may be used while preserving peripheral access ordering behavior. |
| 0 | 1 | Normal memory with Write-Through (WT) cache policy. |
| 1 | 1 | Normal memory with Write-Back (WB) cache policy. |
