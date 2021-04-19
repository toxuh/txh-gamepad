# txh-gamepad (JS Gamepad API)

This library is a wrapper on Gamepad API. Great for creating online games with JS, that uses gamepads.

### Installation

Just add to project from npm repository:

```javascript
// Npm:
npm i txh-gamepad --save

// Yarn
yarn add txh-gamepad
```

### Usage

```javascript
const controller = new txhGamepad({ ...options });

controller.init();
```

### Properties

* `pollingRate: number (default 10)` - controller actions refresh rate in ms. Bigger property value will decrease controller responsibility. Lesser can freeze your browser. Choose wisely.
* `calibrateValue: number (default 0.1)` - value to ignore gamepad stick and triggers events, that less than this property. This setting needed, because controller make some noise even when idle.
* `vibrationSettings: object (default { duration: 1000, type: 'default' })` - vibration settings. `duration` - vibration duration, `type` - default/soft vibration
* `onLeftStickMove: function` - this callback will return to you left stick position as array ['x position', 'y position'].
* `onRightStickMove: function` - this callback will return to you right stick position as array ['x position', 'y position'].
* `onConnect: function` - this callback will be fired on controller connect.
* `onDisconnect: function` - this callback will be fired on controller disconnect.

### Methods

* `init` - library initiating. Will add event listeners for gamepad events.
* `vibrate` - vibration trigger. Vibration settings must be passed to properties. WIP.
* `connected` - returns connection status. WIP.
* `errors` - returns errors array. WIP.

### Roadmap

* All buttons/triggers usage
* Methods
* Return controller name
* Dual shock controller support