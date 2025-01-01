---
sidebar_position: 6
title: Shelly Gen2 to Tasmota
description: Convert Shelly Gen2 to Tasmota
tags: [shelly, tasmota]
---

# Convert Shelly Gen2 to Tasmota

:::tip Disclaimer
You do this at your own risk, if you brick or break your devices, I take no responsibility.
:::

This post contains notes to remind me what I did to convert a Shelly gen2+ device to Tasmota


## Prerequisites

* Shelly gen2+ device. In my case, I use the [Shelly Plus 2PM]
* Grab the latest conversion file for your device on [mgos32-to-tasmota32/releases]
* Be sure you have read the [mgos32-to-tasmota32/Prerequisites]

## Conversion process
* Follow the steps as outlined on [mgos32-to-tasmota32/Start]:https://github.com/tasmota/mgos32-to-tasmota32?tab=readme-ov-file#lets-start

## Tasmota Configuration

On the console, I set the following

Since I am using push buttons for physical switches, I have to set the following:
(3 = pushbutton (default 1, 0 = toggle))
[Tasmota/Commands/control]
```
SwitchMode1 3
SwitchMode2 3
```

Since I am using the Shelly Plus 2PM for lights, I have the set the following:
(1 = both relays and PWM are announced as light to Home Assistant)
[Tasmota/Commands/setoptions]
```
SetOption30 1
```

## References

* [mgos32-to-tasmota32]
* [mgos32-to-tasmota32/releases]
* [Tasmota/Commands/control]
* [Tasmota/Commands/setoptions]


[mgos32-to-tasmota32]: https://github.com/tasmota/mgos32-to-tasmota32
[mgos32-to-tasmota32/Prerequisites]:https://github.com/tasmota/mgos32-to-tasmota32?tab=readme-ov-file#prerequisites
[mgos32-to-tasmota32/Start]:https://github.com/tasmota/mgos32-to-tasmota32?tab=readme-ov-file#lets-start
[mgos32-to-tasmota32/releases]: https://github.com/tasmota/mgos32-to-tasmota32/releases
[Shelly Plus 2PM]: https://www.shelly.com/products/shelly-plus-2pm
[Tasmota/Commands/control]: https://tasmota.github.io/docs/Commands/#control
[Tasmota/Commands/setoptions]: https://tasmota.github.io/docs/Commands/#setoptions


