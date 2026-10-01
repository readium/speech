# Guided Navigation

Guided Navigation (GND) generation lives in [`@readium/guided-navigation`](https://github.com/readium/ts-toolkit/tree/develop/guided-navigation). Its output, `@readium/shared`'s `GuidedNavigationObject[]`, is what [Utterance Extraction](UtteranceExtraction.md) and [`loadGndContent()`](Playback.md) take.

```typescript
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "@readium/speech";

const utterances = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }));
```

Pass objects returned by `parseMarkup()`/`makeGnd()` rather than deserialized JSON: text taken from `aria-label`/`aria-labelledby` is only known on those, and without it such text gets quote-located instead of located on its element.
