# Read Operations

The read operation facilitates the retrieval of data from the storage array. The device supports a power-on read function, which automatically loads the 1st page of the 1st block into the cache upon power-up, allowing immediate host access. For other data, a specific read sequence is required to transfer data from the array to the cache before extraction.

## Page Read (13h)

The driver issues the 13h command followed by a 24-bit address (including dummy, block, and page address) to initiate the transfer of the target page from the storage array to the internal cache register. The device enters a busy state for a duration of tRD or tRD_ECC (typically ranging from 20μs to 120μs).

## Status Monitoring (0Fh)

During the busy period following the Page Read command, the driver may issue the Get Feature command to poll the operation status, ensuring the transfer is complete before attempting to fetch data.

## Read From Cache (03h/0Bh/3Bh/BBh/6Bh/EBh/EEh)

Once the read operation is complete, the driver issues a read-from-cache command (supporting standard, x2, or x4 modes) using the column address to shift the desired bytes from the internal cache register across the serial bus into host RAM. Note that Read From Cache x4 (6Bh/EBh/EEh) is only available if Quad Enable (QE) bit in the Status Register is enabled. When user read to the end of 64-byte spare area, it won’t wrap around from the beginning boundary and an additional 64-byte ECC code will be read if internal ECC enabled.
