import test from "ava";
import { detectPlatformFeatures } from "../../src/utils/patches.js";

const userAgents = {
  safariMac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  safariIOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  chromeIOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1",
  edgeIOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 EdgiOS/129.0.2792.84 Mobile/15E148 Safari/605.1.15",
  chromeMac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  chromeAndroid: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
  edge: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
  firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
  firefoxLinux: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0",
  firefoxAndroid: "Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
};

const detect = (userAgent: string) => {
  const previous = (globalThis as any).window;
  (globalThis as any).window = { navigator: { userAgent } };
  try {
    return detectPlatformFeatures();
  } finally {
    (globalThis as any).window = previous;
  }
};

const isSafari = (userAgent: string): boolean => detect(userAgent).isSafari;

for (const name of ["safariMac", "safariIOS", "chromeIOS", "edgeIOS"] as const) {
  test(`isSafari is true for ${name}`, (t) => {
    t.true(isSafari(userAgents[name]));
  });
}

for (const name of ["chromeMac", "chromeAndroid", "edge", "firefox"] as const) {
  test(`isSafari is false for ${name}`, (t) => {
    t.false(isSafari(userAgents[name]));
  });
}

test("isLinux is true for Firefox on Linux", (t) => {
  t.true(detect(userAgents.firefoxLinux).isLinux);
});

test("isLinux is false for Chrome on Android, whose user agent mentions Linux", (t) => {
  t.false(detect(userAgents.chromeAndroid).isLinux);
});

test("isLinux is false for Firefox on Android", (t) => {
  t.false(detect(userAgents.firefoxAndroid).isLinux);
});
