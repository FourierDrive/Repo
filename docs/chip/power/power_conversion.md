## Power Conversion
In a power management system, different voltage levels are required for various modules. Power conversion circuits are used to generate these voltages efficiently, while additional components like level shifters ensure safe communication between domains.

* Low-Dropout Regulator (LDO)

  * Simple and stable
  * Commonly used during startup
  * Lower efficiency due to linear regulation

* Buck Converter (DCDC)

  * Higher efficiency (>70%)
  * Preferred during normal operation
  * Burst operating mode: Optimized for light load (better efficiency)
  * PWM operating mode: Used under heavy load (better stability)

* Level Shifter

  * Used between different voltage domains (e.g., Vcore <-> Vio)
  * Ensures signal integrity and prevents damage when voltages differ
  * Essential in multi-voltage systems but does not generate power (e.g., SD card interfaces require voltage switching at high-speed modes)
