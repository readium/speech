import { GndRole } from '../gnd/types.js';
import { VerbosityPreset } from './SpeechPreferences.js';
export declare const skippableAtVerbosity: Readonly<Record<Exclude<VerbosityPreset, "custom">, ReadonlySet<GndRole>>>;
export declare const contextualizedAtVerbosity: Readonly<Record<Exclude<VerbosityPreset, "custom">, ReadonlySet<GndRole>>>;
