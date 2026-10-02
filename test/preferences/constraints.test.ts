import test from "ava";
import {
  autoPauseScopes,
  extractionFormats,
  extractionPreferenceKeys,
  languageModes,
  pauseDurationRangeConfig,
  pitchRangeConfig,
  rateRangeConfig,
  segmentationModes,
  verbosityPresets,
  volumeRangeConfig,
} from "../../src/preferences/constraints.js";

const valueLists = { autoPauseScopes, extractionFormats, extractionPreferenceKeys, languageModes, segmentationModes, verbosityPresets };
const rangeConfigs = { pauseDurationRangeConfig, pitchRangeConfig, rateRangeConfig, volumeRangeConfig };

for (const [name, list] of Object.entries(valueLists)) {
  test(`${name} is frozen`, (t) => {
    t.true(Object.isFrozen(list));
    t.throws(() => (list as string[]).push("extra"), { instanceOf: TypeError });
  });
}

for (const [name, config] of Object.entries(rangeConfigs)) {
  test(`${name} and its range are frozen`, (t) => {
    t.true(Object.isFrozen(config));
    t.true(Object.isFrozen(config.range));
    t.throws(() => { (config.range as [number, number])[1] = 1e9; }, { instanceOf: TypeError });
  });
}
