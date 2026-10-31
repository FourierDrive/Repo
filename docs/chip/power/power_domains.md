# Power Domains

A system power tree is typically divided into multiple voltage domains, each serving different components:

* **Vsys (Main Supply, 3.8 V)**: The primary input power (e.g., battery), distributed to all sub-modules.
* **Vmem (1.8 V)**: Supplies memory-related and IO modules (GPIO, Flash, PSRAM, Codec, etc.).
* **Vana (1.3 V)**: Supplies analog components (crystal, RF, Bluetooth, etc.), may require higher voltage under high-performance scenarios (e.g., RF TX).
* **Vcore (Digital Core, 0.6 V ~ 1.0 V)**:
  * **Vcore_m (Memory Array)**: Supplies RAM or memory-related logic.
  * **Vcore_l (Logic Cell)**: Supplies core and logic.
  * Voltage typically scales with system frequency.

## Power Topology

```
Vsys
├── LDO/DCDC -> Vmem    -> memory, IO (GPIO, Flash, PSRAM, Codec)
├── LDO/DCDC -> Vana    -> analog (crystal, RF, Bluetooth)
├── LDO/DCDC -> Vcore_m -> digital (memory)
│   └── LDO  -> Vcore_l -> digital (core, logic)
└── LDOs                -> other modules
```

## Power Isolation

In systems with power gating where certain power domains can be completely shut down to save energy, isolation cells are required at the boundaries between different power domains.

* **Preventing Floating Inputs**: When a power domain is powered off, its outputs can float, potentially causing downstream logic gates in powered-on domains to operate incorrectly or draw excessive short-circuit current.
* **Clamping States**: Isolation cells clamp output signals to a safe, deterministic logic state (such as logical 0 or 1) when the driving domain enters a power-down state.
* **Collaboration with Level Shifters**: In multi-voltage designs, isolation cells are often combined with level shifters to handle both voltage translation and domain shutdown safely.
