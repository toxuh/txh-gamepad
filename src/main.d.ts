interface Error {
  code: number;
  text: string;
}

interface VibrationInnerSettings {
  duration: number;
  type: "default" | "soft";
}

interface XBoxVibrationActuatorAPIVibrationProperties {
  duration: number;
  strongMagnitude: number;
  weakMagnitude: number;
}

interface XBoxVibrationActuatorAPI {
  vibrationActuator?: {
    playEffect: (
      type: "dual-rumble",
      vibrationSettings: XBoxVibrationActuatorAPIVibrationProperties
    ) => void;
  };
}

interface AppProperties {
  pollingRate?: number;
  calibrateValue?: number;
  vibrationSettings?: VibrationInnerSettings;

  onConnect?: () => void;
  onDisconnect?: () => void;
  onLeftStickMove?: (valuesArray: number[]) => void;
  onRightStickMove?: (valuesArray: number[]) => void;
}

interface AppReturnType {
  connected: boolean | string;
  errors: Error[];
  init: () => void;
  vibrate: () => void;
}
