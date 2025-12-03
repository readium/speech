# Voices and Filtering

With hundreds of voices available by default across various browsers and OS, it can be tricky for developers to provide sensible defaults and a curated list of voices.

One of the goals of this project is to document higher quality voices available on various platforms and provide an easy way to implement these recommendations using JSON configuration files.

## Use cases

* Providing the best possible default voice per language
* Displaying an ordered list of voices, based on quality
* Displaying user-friendly voice names
* Filtering recommended voices per gender and age (adult vs children)
* Filtering out novelty and low quality voices
* Previewing a voice with a test utterance

## List of supported languages

The goal of this project is to support all 43 languages available on Windows and macOS.

In its current state, it covers 43 languages:

* [Arabic](json/ar.json) (Algeria, Bahrain, Egypt, Iraq, Jordan, Kuwait, Lebanon, Libya, Morocco, Oman, Qatar, Saudi Arabia, Syria, Tunisia, United Arab Emirates, Yemen)
* [Basque](json/eu.json)
* [Bengali](json/bn.json) (India and Bangladesh)
* [Bhojpuri](json/bho.json)
* [Bulgarian](json/bg.json)
* [Catalan](json/ca.json)
* Chinese:
  * [Mandarin Chinese](json/cmn.json) (Mainland China, Taiwan)
  * [Wu Chinese](json/wuu.json) (aka "Shanghainese")
  * [Yue Chinese](json/yue.json) (aka "Cantonese")
* [Croatian](json/hr.json)
* [Czech](json/cs.json)
* [Danish](json/da.json)
* [Dutch](json/nl.json) (Netherlands and Belgium)
* [English](json/en.json) (United States, United Kingdom, Australia, Canada, Hong Kong, India, Ireland, Kenya, New Zealand, Nigeria, Scotland, Singapore, South Africa and Tanzania)
* [Finnish](json/fi.json)
* [French](json/fr.json) (France, Canada, Belgium and Switzerland)
* [Galician](json/gl.json)
* [German](json/de.json) (Germany, Austria and Switzerland)
* [Greek](json/el.json)
* [Hebrew](json/he.json)
* [Hindi](json/hi.json)
* [Hungarian](json/hu.json)
* [Indonesian](json/id.json)
* [Italian](json/it.json)
* [Japanese](json/ja.json)
* [Kannada](json/kn.json)
* [Korean](json/ko.json)
* [Malay](json/ms.json)
* [Marathi](json/mr.json)
* [Norwegian](json/nb.json)
* [Persian](json/fa.json)
* [Polish](json/pl.json)
* [Portuguese](json/pt.json) (Portugal and Brazil)
* [Romanian](json/ro.json)
* [Russian](json/ru.json)
* [Slovak](json/sk.json)
* [Slovenian](json/sl.json)
* [Spanish](json/es.json) (Spain, Argentina, Bolivia, Chile, Colombia, Costa Rica, Cuba, Dominican Republic, Ecuador, El Salvador, Equatorial Guinea, Guatemala, Honduras, Mexico, Nicaragua, Panama, Paraguay, Peru, Puerto Rico, United States, Uruguay and Venezuela)
* [Swedish](json/sv.json)
* [Tamil](json/ta.json) (India, Sri Lanka, Malaysia and Singapore)
* [Telugu](json/te.json)
* [Thai](json/th.json)
* [Turkish](json/tr.json)
* [Ukrainian](json/uk.json)
* [Vietnamese](json/vi.json)

## List of voices to filter out

At the other end up the spectrum, this project also identifies a number of voices that should be filtered out from a voice selector component. 

Some of them are harmful to the overall reading experience, while others have a very low quality on platforms where better preloaded options are available.

* [Novelty voices](json/filters/novelty.json) (Apple devices)
* [Very low quality voices](json/filters/veryLowQuality.json) (Apple devices and Chrome OS)


## Guiding principles

* Each voice list is ordered and meant to provide an optimal listening experience on all browsers/OS/languages covered by this project.
* But each list also includes default options, to make sure that there's always something reliable to lean on.
* With these two goals in mind, higher quality voices are listed on top of the list, while lower quality voices or specialized ones are listed at the bottom.
* The number of voices can look overwhelming (110+ voices in English alone) but in practice, just a few of them will be available to users on each of their device.
* The voice names returned by the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) are hardly user-friendly, which is the reason why this list provides alternate ones that usually include a first name (or a gender) along with the region associated to the voice.
* Whenever possible, I will always try to include a good mix of high quality and default options for both genders.
* But the list has to be prioritized somehow, female voices are currently listed above their male counterparts. Since the gender associated to each voice is documented, this allows implementers to re-prioritize/filter the list based on this criteria.
* Regional variants are also grouped together in a single list rather than separated in their own files on purpose. On some devices, only two or three voices might be available and separating regional variants wouldn't make much sense.
* But regional variants have to be prioritized somehow in the list. For now, the regions with the best selections of voices are listed above, but it is highly recommended to implementers [to consider the user's regional preferences](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages).


## Syntax

[A JSON Schema](voices.schema.json) is available for validation or potential contributors interested in opening a PR for new languages or voice additions.

### Label

`label` is required for each recommended voice and provides a human-friendly label for each voice.

This string is localized for the target language and usually contains the following information:

* First name (if available)
* Gender (when the first name is missing)
* Country/region

**Example 1: Microsoft Natural voices**

While the names documented by Microsoft for their natural voices are easily understandable, they tend to be very long and they're all localized in English.

```json
{
  "label": "Isabella (Italia)",
  "name": "Microsoft Isabella Online (Natural) - Italian (Italy)",    
  "language": "it-IT"
}
```

**Example 2: Chrome OS voices**

Chrome OS provides a number of high quality voices through its Android subsystems, but they come with some of the worst names possibles for an end-user.

```json
{
  "label": "Female voice 1 (US)",
  "name": "Android Speech Recognition and Synthesis from Google en-us-x-tpc-network",
  "language": "en-US"
}
```

### Names

`name` is required for each recommended voice and it's used as the main identifier for voices in this project.

Names are mostly stable across browsers, which means that for most voices, a single string is sufficient.

But there are unfortunately some outliers: Android, iOS, iPadOS and macOS voices.

For those voices, at least a portion of the string is often localized, naming can be inconsistent across browsers and they can change depending on the number of variants installed.

Because of this, each list can also contain the following properties:

- `altNames` with an array of alternate strings for a given voice
- and `localizedName` that identifies the string pattern used for localizing these voices
 
**Example 3: Alternate version of an Apple preloaded voice**

```json
{
  "label": "Samantha (US)",
  "name": "Samantha",
  "localizedName": "apple",
  "altNames": [
    "Samantha (Enhanced)",
    "Samantha (English (United States))"
  ],
  "language": "en-US"
}
```

### Languages

`language` is required for each recommended voice.

It contains a BCP 47 language tag where a downcased two-letter language code is followed by an uppercased two-letter country code.

The language and country codes are separated using a hyphen (-).

Somes voices are also capable of handling another language, for example a Spanish voice for the United States might also be capable of handling English.

For this reason, an `additionalLanguages` property is also available although it is fairly rarely used right now.

It contains a list of languages using only two-letter codes, without a sub-tag.

Some brand new voices from Microsoft are also capable of a multilingual output. The language switch isn't supported in the middle of a sentence, but the output seems capable of auto-detecting the language of each sentence and adopt itself accordingly.

In order to support this, the output might automatically switch to a different voice in the process.

These voices are identified using the `multiLingual` boolean.

**Example 4: Voice with a multilingual output**

```json
{
  "label": "Emma (US)",
  "name": "Microsoft EmmaMultilingual Online (Natural) - English (United States)",
  "language": "en-US",
  "multiLingual": true
}
```

**Example 5: Voice capable of handling a secondary language**

```json
{
  "label": "Sylvie (Canada)",
  "name": "Microsoft Sylvie Online (Natural) - French (Canada)",
  "language": "fr-CA",
  "otherLanguages": [
    "en"
  ]
}
```

### Gender and children voices

`gender` is an optional property for each voice, that documents the gender associated to each voice.

The following values are supported: `female`, `male` or `neutral`.

`children` is also optional and identifies children voices using a boolean.

**Example 6: Female children voice**

```json
{
  "label": "Ana (US)",
  "name": "Microsoft Ana Online (Natural) - English (United States)",
  "language": "en-US",
  "gender": "female",
  "children": true
}
```

### Quality

`quality` is an optional property for each voice, that documents the quality of the various variants of a voice.

The following values are supported:
<dl>
<dt>veryHigh</dt>
<dd>Very high, almost human-indistinguishable quality of speech synthesis</dd>
<dt>high</dt>
<dd>High, human-like quality of speech synthesis</dd>
<dt>normal</dt>
<dd>Normal quality of speech synthesis</dd>
<dt>low</dt>
<dd>Low, not human-like quality of speech synthesis</dd>
<dt>veryLow</dt>
<dd>Very low, but still intelligible quality of speech synthesis</dd>
</dl>

**Example 7: An Apple voice available in three quality variants**

```json
{
  "label": "Ava (US)",
  "name": "Ava",
  "note": "This voice can be installed on all Apple devices and offers three variants. Like all voices that can be installed on Apple devices, it suffers from inconsistent naming due to localization.",
  "altNames": [
    "Ava (Premium)",
    "Ava (Enhanced)",
    "Ava (English (United States))",
  ],
  "language": "en-US",
  "gender": "female",
  "quality": [
    "low",
    "normal",
    "high"
  ],
  "rate": 1,
  "pitch": 1,
  "os": [
    "macOS",
    "iOS",
    "iPadOS"
  ]
}
```


### OS and browser

Both `os` and `browser` are optional properties. They're used to indicate in which operating systems and browsers a voice is available.

These two properties are meant to be interpreted separately and not as a combination.

**Example 8: A Microsoft voice available in both Edge and Windows**

```json
{
  "label": "Denise (France)",
  "name": "Microsoft Denise Online (Natural) - French (France)",
  "note": "This voice is preloaded in Edge on desktop. In other browsers, it requires the user to run Windows 11 and install the voice pack.",
  "language": "fr-FR",
  "gender": "female",
  "os": [
    "Windows"
  ],
  "browser": [
    "Edge"
  ]
}
```

In addition, `preloaded` indicates if the voice is preloaded in all the OS and browsers that have been identified. 

With the current approach, it's not possible to indicate that a voice is available on Chrome and Windows, but requires a download on Windows for example.

**Example 9: A Google voice preloaded in Chrome Desktop**

```json
{
  "label": "Google female voice (UK)",
  "name": "Google UK English Female",
  "language": "en-GB",
  "gender": "female",
  "browser": [
    "ChromeDesktop"
  ],
  "preloaded": true
}
```

### Speech rate and pitch

When using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), `SpeechSynthesisUtterance` supports optional values for:

- [`rate`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate) to control the speech rate
- and [`pitch`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch) to control the pitch

Each voice documented in this repo supports the following optional properties:

- `pitchControl` is a boolean that defaults to `true` and indicates if a voice can be pitch controlled
- `rate` is an integer between 0.1 and 10 that defaults to 1 and provides a recommended default speech rate for each voice
- `pitch` is an integer between 0 and 2 that defaults to 1 and provides a recommended default pitch for each voice

**Example 10: Microsoft voice where the pitch cannot be adjusted**

```json
{
  "label": "Ana (US)",
  "name": "Microsoft Ana Online (Natural) - English (United States)",
  "language": "en-US",
  "gender": "female",
  "pitchControl": false
}
```

**Example 11: Google voice with recommended pitch and speed rates**

```json
{
  "label": "Voix Google féminine (France)",
  "name": "Google français",
  "language": "fr-FR",
  "gender": "female",
  "rate": 1,
  "pitch": 0.8
}
```