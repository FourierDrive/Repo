# Erase Operations

The block erasure process is the prerequisite for any write operation, resetting a physical block to its initial state to ensure that subsequent programming can occur correctly.

## Write Enable (06h)

Issues the command to set the internal Write Enable Latch (WEL) bit, which is required to authorize any subsequent memory modification, if the Write Enable command is not issued, then the rest of the erase sequence is ignored.

## Block Erase (D8h)

Transmits the erase command followed by 8 dummy clocks and the 16-bit page address to identify the specific block to be cleared.

## Timing and Erase-Verify

Once the page address is registered, the internal control logic automatically manages the erase timing and verify operations without further host intervention. The typical Block Erase Time (tBERS) ranges from 2ms to 10ms depending on the specific NAND flash architecture.

## Status Monitoring (0Fh)

Issues the Get Features command to read the status register, allowing the driver to monitor the device busy state for the duration of the tBERS cycle.
