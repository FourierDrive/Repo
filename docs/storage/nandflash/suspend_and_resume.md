# Suspend and Resume

Hardware-level interruptibility. To solve non-concurrent deadlock and maintain real-time responsiveness, modern flash devices support interruptible command states.

## Suspend Operation

When an urgent read request occurs during an ongoing erase or program cycle, the driver issues a suspend command to freeze the internal charge pumps and state machine. Once the status register flags the suspension as successful, the device is ready for high-priority access.

## Execution During Suspension

With the device suspended, the driver can safely perform high-priority read operations or allow the processor to fetch XIP code from the flash array.

## Resume Operation

After critical tasks conclude, the driver issues a resume command. This restarts the internal state machine, allowing the original erase or program cycle to finish from its point of interruption. Drivers must verify that the device has cleared its busy state before triggering this sequence.
