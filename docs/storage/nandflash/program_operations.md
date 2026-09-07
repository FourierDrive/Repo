# Program Operations

The page program operation sequence programs data into a page, ranging from a single byte up to a full page. The process relies on sequential addressing within a block and requires specific command ordering to ensure data is correctly committed to the storage cells.

## Program Data Load (02h/32h)

Issues the command followed by 4 dummy bits and a 12-bit column address, then streams data bytes into the full-page-length data buffer. This sequence concludes when CS# transitions from LOW to HIGH. If data exceeds the page length, additional bytes are ignored. Note that Program Load x4 (32h) is only available if Quad Enable (QE) bit in the Status Register is enabled. This command resets any unused data bytes in the data buffer to 0xFF.

## Write Enable (06h)

This command must be executed after the data is loaded but prior to the Program Execute command. It sets the internal Write Enable Latch (WEL) bit, which is a mandatory prerequisite for any memory modification, without it, the hardware ignores the subsequent program sequence.

## Program Execute (10h)

Commits the buffer content to the specified physical page. The operation is initiated by driving CS# low, shifting the 10h opcode followed by 8 dummy clocks and the 16-bit page address. Once CS# goes high, a self-timed cycle begins with a duration of tPROG or tPROG_ECC (typically ranging from 200μs to 700μs). Following this command, the data in the data buffer is no longer valid, and the WEL bit is automatically cleared. This operation requires sequential page programming within a block, and is prohibited if the page is protected or if the page has already been partially programmed.

## Status Monitoring (0Fh)

Issues the Get Features command to read the status register, allowing the driver to verify the outcome of the operation and ensure the programming cycle finished successfully.

## Random Program Data Load (84h/34h)

Performs the same data loading function as the standard load command but updates only the specific bytes provided in the input sequence. The rest of the data buffer remains unchanged, allowing for partial page updates. This command is also used during internal data move operations, after reading the source page content into the cache register via a Page Read (13h) command, one or more Random Program Data Load commands can be issued to modify specific bytes before committing the final data with the Write Enable (06h) and Program Execute (10h) sequence.
