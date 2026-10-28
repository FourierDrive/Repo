# Cache

## Cache

A hardware-managed memory structure that improves average system performance by exploiting spatial and temporal locality in program access patterns.

Cache stores recently accessed instructions or data in small high-speed SRAM structures located close to the processor core. When the processor accesses an address, the cache controller checks whether the corresponding cache line is already present. If the access hits in the cache, data can be returned with much lower latency than external memory access.

Program memory access is not random but typically exhibits predictable structure, and cache efficiency is largely determined by two key properties:
* **Temporal Locality**: Recently accessed data is likely to be reused, such as loop variables, function call contexts, and frequently accessed data structures.
* **Spatial Locality**: Memory locations near recently accessed addresses are likely to be accessed soon due to sequential instruction execution or structured data traversal.

These locality properties allow the cache to reduce external memory traffic by reusing previously fetched cache lines and prefetching nearby data.

Modern processors commonly implement separate instruction cache (I-Cache) and data cache (D-Cache). Typical L1 cache sizes range from 4kB to 16kB or 32kB, allowing access within a single processor cycle at core frequencies of 1GHz or higher.

Cache operation depends on several hardware mechanisms including cache line allocation, replacement policies, write policies, and tag comparison. While cache significantly improves average-case performance, memory access latency becomes dependent on runtime behavior because cache hits and misses are not deterministic.

In systems using DMA, multiple bus masters, or shared memory between tasks, cache maintenance operations such as clean and invalidate are often required to maintain memory coherency.

## Cache Terminology

* **Cache Line**: The minimum unit of data transfer between memory and cache, used for fill and eviction operations.
* **Tag**: The upper portion of a memory address used to identify whether data is present in the cache.
* **Index**: The address field used to select a cache set.
* **Offset**: The lower address bits used to locate data within a cache line.
* **Way**: One column in a set-associative cache structure.
* **Set**: A group of cache lines sharing the same index across all ways.
* **Valid Bit (V)**: Indicates whether a cache line contains valid data.
* **Dirty Bit (D)**: Indicates whether cached data has been modified and differs from main memory.
* **Cache Size**: The amount of data or instruction storage that can be held in the cache, excluding metadata such as tag storage and status bits (e.g., valid and dirty bits). Typical L1 cache sizes range from 4kB to 16kB or 32kB, allowing access within a single processor cycle at core frequencies of 1GHz or higher.
* **Cache Hit**: A condition where the selected cache set contains a valid cache line whose tag matches the tag portion of the requested memory address, allowing the data to be accessed directly from the cache.
* **Cache Miss**: A condition where no valid cache line in the selected cache set matches the tag portion of the requested memory address, requiring the data to be fetched from main memory and filled into the cache.
* **Hit Rate**: The ratio of cache hits to total memory access requests, representing cache effectiveness and performance.
* **Invalidate**: Marks cache lines as invalid without writing back to memory, typically used when cached data may no longer match main memory contents. For example, after a DMA controller updates a memory buffer, the processor may invalidate the corresponding cache lines before reading the buffer so that stale cached data is not used.
* **Clean**: Writes modified (dirty) cache lines back to main memory while keeping the cache lines valid, typically used before DMA or peripheral access to ensure memory contains the latest data. For example, before a DMA controller reads a transmit buffer from memory, the processor may clean the corresponding cache lines so that all updated data stored only in the cache is written back to main memory first.

## Cache Architecture

Cache is organized as a hierarchical structure close to the processor core and is typically implemented using on-chip SRAM.

At the L1 level, cache commonly follows a Harvard architecture and is split into instruction cache (I-Cache) and data cache (D-Cache). This separation allows simultaneous instruction fetch and data access, improving pipeline efficiency in high-performance cores.

Some systems may also use a unified L1 cache where instructions and data share the same structure, typically in simpler or power-optimized designs.

L2 cache is larger and may be shared between cores or unified for instructions and data. It provides higher capacity with increased latency.

Some systems include L3 cache, which is shared across multiple cores and optimized for bandwidth and capacity rather than latency.

## Cache Mapping

Cache Mapping is typically implemented in one of the following structures:
* **Direct-Mapped Cache**: Each memory address maps to a single cache location using index-based mapping. This design has simple hardware and low access latency but is sensitive to conflict misses. A common issue is thrashing, where multiple frequently accessed addresses map to the same cache line and continuously evict each other, leading to repeated cache misses.
* **Set-Associative Cache**: Each memory address maps to a set of multiple possible locations (ways). This reduces conflict misses by allowing multiple cache lines to share the same index. The hardware compares tags across all ways within a set, which increases complexity and power consumption. In practice, most processor L1 caches use a low associativity such as 2-way or 4-way.
* **Fully Associative Cache**: Any memory block can be placed in any cache location without index restriction. This eliminates conflict misses but requires parallel tag comparison across all entries, significantly increasing hardware cost and access complexity. It is typically used only in small structures such as TLBs or specialized cache regions.

Cache behavior is defined by the interaction between address lookup, tag comparison, and data movement.

On each access, the controller checks whether the requested address exists in the cache. If a match is found, a cache hit occurs and data is returned immediately. If not, a cache miss occurs and data is fetched from the next memory level. A cache line may be allocated depending on configuration.

Write operations may either update memory immediately or be temporarily stored in cache for later synchronization, depending on the selected write policy.

## Cache Policies

Cache behavior is controlled by three policy groups that define how data is allocated, replaced, and updated in response to cache misses and write operations.

Allocation Policy defines whether a cache line is allocated when a cache miss occurs. A miss triggers the decision of whether a new cache line should be filled from the next memory level.
* **Read Allocate**: Cache line is allocated only on read misses.
* **Write Allocate**: Cache line is allocated on both read and write misses.

Replacement Policy determines which cache line within a selected set will be replaced when a new cache line must be allocated. The index bits select a cache set, while the replacement policy selects the target way inside that set for eviction and replacement.
* **Round-Robin Selection**: Cache lines are replaced in a fixed cyclic order. This method is simple and highly predictable, making timing behavior easier to analyze. However, small changes in memory access patterns may sometimes lead to significantly different cache performance.
* **Pseudo-Random Selection**: Cache lines are selected using a pseudo-random mechanism. This method reduces repetitive eviction patterns and often provides better average cache behavior in complex workloads, and is commonly used in modern ARM processors.

Write Policy defines how data is updated when a cache hit occurs.
* **Write-Through (WT)**: Updates are written to both the cache and main memory simultaneously whenever a write hit occurs, ensuring that memory always contains the most recent data and simplifying data consistency management. However, because every write operation also accesses main memory, write-through caches generate higher memory traffic and typically provide lower write performance than write-back caches.
* **Write-Back (WB)**: Updates are written only to the cache when a write hit occurs, while main memory is updated later when the modified cache line is evicted or explicitly cleaned. This reduces memory traffic and improves performance, but requires a dirty bit to track whether a cache line contains newer data than main memory. If a dirty cache line is selected for replacement, the cache controller must first write the entire cache line back to main memory before loading new data, ensuring that modified data is not lost.

In multi-master or DMA-based systems, write-back caches require additional maintenance operations such as cache clean or flush to ensure memory consistency during context switches or external memory access.
