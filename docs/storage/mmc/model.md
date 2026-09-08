# Model

The eMMC network consists of a Host and a Device, typically communicating between a single host and one or more devices.

## Host

The host refers to the active communication party responsible for controlling and managing all interactions with external devices. The eMMC controller module is the hardware component on the host side used to communicate with the device, typically integrated on-chip, and is responsible for implementing the protocol stack, data transmission, and command/response processing. Host functions include:

### Device Initialization and Configuration

The host initializes the device at the start of communication, including voltage matching, setting clock frequency, transmission mode, data width, and other parameters.

### Command Issuance

The host is responsible for sending commands such as read, write, erase, and query to the device and waiting for responses.

### Data Transmission Control

The host performs data read and write operations with the device via the eMMC interface, controlling data transfer from host to device and device to host.

### File System Management

In many applications, the host is also responsible for managing the storage device's file system (such as FAT32, exFAT), facilitating file read/write and directory management operations.

## Device

The device refers to the passive communication party, functioning as a storage device that executes operations according to the host's commands. Internally, eMMC encapsulates a NAND flash memory array and a flash controller together. The controller is responsible for managing the memory, providing a standard interface, and automatically adjusting the operating modes between the host and the device. The primary functions of the device include:

### Data Exchange

The device is responsible for storing data and conducting data exchanges with the host based on its commands.

### Identification and Matching

The device matches with the host through related electrical characteristics and device category parameters, ensuring normal communication and information transmission.

### Compatibility

By following the same set of standard protocols and providing backward compatibility, this compatibility reduces development complexity and facilitates the integration of existing hardware and drivers.
