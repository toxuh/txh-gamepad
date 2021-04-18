import Timeout = NodeJS.Timeout;

const txhGamepad = (
  {
    pollingRate = 10,
    calibrateValue = 0.1,
    vibrationSettings = {
      duration: 1000,
      type: "default",
    },

    onLeftStickMove = (e: number[]) => console.log(e),
    onRightStickMove = (e: number[]) => console.log(e),
    onConnect = () => console.log("Your gamepad connected"),
    onDisconnect = () => console.log("Your gamepad was disconnected"),
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

      connected = true;
      onConnect();

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

    window.addEventListener("gamepaddisconnected", () => {
      connected = false;
      onDisconnect();

      clearInterval(pollInterval);
    });
  };

  return { connected, errors, init, vibrate };
};

module.exports.txhGamepad = txhGamepad;
