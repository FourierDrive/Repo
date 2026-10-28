# Memory Attributes

Memory attributes define how the processor and memory system handle caching, buffering, coherency, and access permissions for a memory region. These attributes are typically configured through the MPU and are critical for both system correctness and performance.

## Cacheability
Controls whether memory accesses participate in the cache hierarchy.

* **Non-cacheable**: Accesses bypass the cache and directly access memory or peripherals.
* **Write-Back Write-Allocate (WBWA)**: Read and write accesses are cached. Write misses allocate cache lines, and modified data is written back later during eviction.
* **Write-Through (WT)**: Writes update both cache and main memory simultaneously.
* **Write-Back (WB)**: Writes initially update only the cache, while memory is updated later when dirty cache lines are cleaned or evicted.

## Bufferable
Controls whether write accesses can be temporarily stored in a write buffer while the processor continues executing subsequent instructions.

* Bufferable regions improve performance by reducing processor stalls caused by slow memory or peripheral accesses. However, because writes may complete asynchronously, memory barriers such as DSB or DMB may be required to guarantee ordering and visibility.

## Shareability
Defines whether memory coherency must be maintained between multiple bus masters such as processors, DMA controllers, or hardware accelerators.

* **Shareable**: The memory system guarantees visibility and synchronization of memory updates between multiple masters. Strongly-ordered memory is always shareable.
* **Non-shareable**: Software must explicitly maintain coherency using cache maintenance operations or synchronization mechanisms when multiple masters access the same memory region.

## Permission Control
Defines which software contexts are allowed to access a memory region.

* **User / Privileged**: Controls whether unprivileged software may access the region.
* **Read / Write**: Defines whether the region is writable or read-only.
* **Executable**: Allows instruction fetches from the region.
* **Execute Never (XN)**: Prevents instruction execution from the region. A fault exception is generated only on execution of an instruction executed from an XN region.

The combination of Bufferable and Cacheable attributes determines the effective memory access behavior seen by the processor and memory system. Different combinations are commonly used to implement strongly-ordered, device, or cacheable normal memory regions.

| Bufferable | Cacheable | Effective Memory Behavior |
|------------|------------|----------------------------|
| 0 | 0 | Strongly-ordered memory. Accesses are strictly ordered and write buffering is not allowed. |
| 1 | 0 | Device memory. Limited write buffering may be used while preserving peripheral access ordering behavior. |
| 0 | 1 | Normal memory with Write-Through (WT) cache policy. |
| 1 | 1 | Normal memory with Write-Back (WB) cache policy. |
