import Timeout = NodeJS.Timeout;

const txhGamepad = (
  {
    pollingRate = 10,
    calibrateValue = 0.1,
    vibrationSettings = {
      duration: 1000,
      type: "default",
    },

    onLeftStickMove,
    onRightStickMove,
    onConnect,
    onDisconnect,
  } = {} as AppProperties
): AppReturnType => {
  const errors = [] as Error[];

  let vibrate: () => void;
  let pollInterval: Timeout;
  let connected = false;

  const init = () => {
    window.addEventListener("gamepadconnected", (e) => {
      if (!e.gamepad) {
        return;
      }

      const controller: Gamepad &
        XBoxVibrationActuatorAPI = navigator.getGamepads()[0];

      if (typeof onConnect === "function") {
        onConnect();
      }

      connected = true;

      vibrate = () => {
        controller.vibrationActuator.playEffect("dual-rumble", {
          duration: vibrationSettings.duration,
          strongMagnitude: vibrationSettings.type === "default" ? 1.0 : 0.5,
          weakMagnitude: vibrationSettings.type === "default" ? 1.0 : 0.5,
        });
      };

      const getCalibratedValue = (value: number): number => {
        const calibrated = Math.round(value * 100) / 100;

        if (Math.abs(calibrated) > calibrateValue) {
          return calibrated;
        } else {
          return 0;
        }
      };

      pollInterval = setInterval(() => {
        if (typeof onLeftStickMove === "function") {
          onLeftStickMove([
            getCalibratedValue(navigator.getGamepads()[0].axes[0]),
            getCalibratedValue(navigator.getGamepads()[0].axes[1]),
          ]);
        }

        if (typeof onRightStickMove === "function") {
          onRightStickMove([
            getCalibratedValue(navigator.getGamepads()[0].axes[2]),
            getCalibratedValue(navigator.getGamepads()[0].axes[3]),
          ]);
        }
      }, pollingRate);
    });

    window.addEventListener("gamepaddisconnected", () => {
      if (typeof onDisconnect === "function") {
        onDisconnect();
      }

      connected = false;

      clearInterval(pollInterval);
    });
  };

  return { connected, errors, init, vibrate };
};

module.exports.txhGamepad = txhGamepad;
