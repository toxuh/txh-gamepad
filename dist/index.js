var txhGamepad = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.pollingRate, pollingRate = _c === void 0 ? 10 : _c, _d = _b.calibrateValue, calibrateValue = _d === void 0 ? 0.1 : _d, _e = _b.vibrationSettings, vibrationSettings = _e === void 0 ? {
        duration: 1000,
        type: "default",
    } : _e, _f = _b.onLeftStickMove, onLeftStickMove = _f === void 0 ? function (e) { return console.log(e); } : _f, _g = _b.onRightStickMove, onRightStickMove = _g === void 0 ? function (e) { return console.log(e); } : _g, _h = _b.onConnect, onConnect = _h === void 0 ? function () { return console.log("Your gamepad connected"); } : _h, _j = _b.onDisconnect, onDisconnect = _j === void 0 ? function () { return console.log("Your gamepad was disconnected"); } : _j;
    var errors = [];
    var vibrate;
    var pollInterval;
    var connected = false;
    var init = function () {
        window.addEventListener("gamepadconnected", function (e) {
            if (!e.gamepad) {
                return;
            }
            var controller = navigator.getGamepads()[0];
            connected = true;
            onConnect();
            vibrate = function () {
                controller.vibrationActuator.playEffect("dual-rumble", {
                    duration: vibrationSettings.duration,
                    strongMagnitude: vibrationSettings.type === "default" ? 1.0 : 0.5,
                    weakMagnitude: vibrationSettings.type === "default" ? 1.0 : 0.5,
                });
            };
            var getCalibratedValue = function (value) {
                var calibrated = Math.round(value * 100) / 100;
                if (Math.abs(calibrated) > calibrateValue) {
                    return calibrated;
                }
                else {
                    return 0;
                }
            };
            pollInterval = setInterval(function () {
                onLeftStickMove([
                    getCalibratedValue(navigator.getGamepads()[0].axes[0]),
                    getCalibratedValue(navigator.getGamepads()[0].axes[1]),
                ]);
                onRightStickMove([
                    getCalibratedValue(navigator.getGamepads()[0].axes[2]),
                    getCalibratedValue(navigator.getGamepads()[0].axes[3]),
                ]);
            }, pollingRate);
        });
        window.addEventListener("gamepaddisconnected", function () {
            connected = false;
            onDisconnect();
            clearInterval(pollInterval);
        });
    };
    return { connected: connected, errors: errors, init: init, vibrate: vibrate };
};
module.exports.txhGamepad = txhGamepad;
//# sourceMappingURL=index.js.map