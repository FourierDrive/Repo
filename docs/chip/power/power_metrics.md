# Power Metrics

This section outlines the critical evaluation metrics and parameters that determine power rail quality, voltage stability, and overall system energy efficiency under different operating conditions.

## Power Quality Metrics

In a power management system, the quality of a power rail is evaluated by several key parameters, which together determine voltage accuracy, stability, and efficiency:

* **Bandgap (Reference)**: Provides a stable reference voltage for the entire power system (e.g., LDO, DCDC, ADC), and its accuracy directly affects overall voltage precision.
* **Ripple**: Small voltage fluctuations on top of the DC output, usually caused by switching regulators. Lower ripple means cleaner power, which is important for analog and RF circuits.
* **Load Capability**: The ability to supply current without the output voltage dropping out of specification. Higher capability supports heavier loads.
* **Load Regulation**: Output voltage stability when load current changes.
* **Line Regulation**: Output voltage stability when input voltage changes.
* **Efficiency**: Defined as output power divided by input power. Higher efficiency reduces power loss and heat generation.
* **Active Current**: Current consumed while the processor, memories, buses, and peripherals are actively operating. Active current is commonly measured in mA/MHz and is strongly related to clock frequency, voltage, and switching activity.
* **Sleep Current**: Current consumed while the system is in a low-power or sleep state. Sleep current is mainly caused by leakage, retention circuits, analog blocks, RTC logic, and I/O pads, and is typically measured in mA or µA.
* **Energy Efficiency**: Measures how much computational work can be completed per unit of energy, commonly expressed as DMIPS/mW or CoreMark/mW. Traditional low-power evaluation often compares active current and sleep current characteristics.
* **Transient Response**: Describes how quickly and stably the voltage recovers after sudden load changes.
