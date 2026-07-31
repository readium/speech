import { IPreferencesEditor } from "./PreferencesEditor.js";

// Readium's Preferences API shapes
// (https://readium.org/architecture/proposals/009-preferences-api.html).
export interface ConfigurableSettings {
  [key: string]: unknown;
}

export interface ConfigurablePreferences<T> {
  merging(other: T): T;
}

export interface Configurable<S extends ConfigurableSettings, P extends ConfigurablePreferences<P>> {
  settings: S;
  submitPreferences(preferences: P): void;
  preferencesEditor: IPreferencesEditor;
}
