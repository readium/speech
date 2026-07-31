import { ConfigurablePreferences } from "./Configurable.js";

export interface IPreferencesEditor {
  preferences: ConfigurablePreferences<unknown>;
  clear(): void;
}
