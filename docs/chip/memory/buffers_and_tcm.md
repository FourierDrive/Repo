# Buffers and Tightly Coupled Memory (TCM)

This section outlines hardware-managed performance components including write buffers, fetch buffers, and software-visible tightly coupled memories.

## Write Buffer and Fetch Buffer

* **Write Buffer**: A hardware mechanism that temporarily holds store operations so the processor does not stall on slow memory or peripheral accesses. 
    * Improves performance by reducing pipeline stalls and merging adjacent writes into burst transfers.
    * Requires memory barriers (DSB, DMB) when write buffering is enabled to ensure correct visibility of writes.
* **Fetch Buffer**: A hardware structure that improves instruction throughput by preloading instructions before they are required by the pipeline. Small transient structure and not software-visible.

## Tightly Coupled Memory (TCM)

Tightly Coupled Memory (TCM) is a software-visible on-chip memory directly connected to the processor core, providing deterministic low-latency access without cache-related overhead.

* **Configurations**: May be configured as Instruction TCM (ITCM), Data TCM (DTCM), or a unified TCM structure.
* **Predictability**: TCM contents are managed entirely by software and remain unaffected by cache hit/miss behavior, often completing in a single processor cycle.
* **Attributes**: Configured as normal memory attributes with MPU control, but cacheability/shareability attributes are ignored.
* **Typical Use Cases**: Interrupt handlers, exception vectors, RTOS kernels, motor-control loops, DSP routines, and DMA buffers requiring deterministic real-time behavior.
