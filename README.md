# Readium Speech

Readium Speech is a TypeScript library for implementing a read aloud feature with Web technologies. It follows [best practices](https://github.com/HadrienGardeur/read-aloud-best-practices) gathered through interviews with members of the digital publishing industry.

While this project is still in a very early stage, it is meant to power the read aloud feature for two different Readium projects: [Readium Web](https://readium.org/guided-navigation) and [Thorium](https://thorium.edrlab.org/).

Readium Speech was spun out as a separate project in order to facilitate its integration as a shared component, but also because of its potential outside of the realm of ebook reading apps.

## Scope

* Extracting [Guided Navigation objects](https://readium.org/guided-navigation) from a document (or a fragment of a document)
* Generating utterances from these Guided Navigation objects
* Processing utterances (prepending/appending text to utterances based on context, pronunciation through SSML/PLS…)
* Voice selection
* TTS playback
* Highlighting

## Current focus

For our initial work on this project, we're focusing on voice selection based on [recommended voices](https://github.com/HadrienGardeur/web-speech-recommended-voices).

The outline of this work has been explored in a [GitHub discussion](https://github.com/HadrienGardeur/web-speech-recommended-voices/discussions/9) and through a [best practices document](https://github.com/HadrienGardeur/read-aloud-best-practices/blob/main/voice-selection.md).

## Demo

[A live demo](https://readium.org/speech/demo/) of the voice selection API is available.

It demonstrates the following features:

- fetching a list of all available languages, translating them to the user's locale and sorting them based on these translations
- returning a list of voices for a given language, grouped by region and sorted based on quality
- filtering languages and voices based on gender and offline availability
- using embedded test utterances to demo voices

## QuickStart

`npm install https://github.com/readium/speech`

```
import { getVoices } from "readium-speech";
// or with cjs only : 
import { getVoices } from "readium-speech/build/cjs/voices";
// or with esm mjs :
import { getVoices } from "readium-speech/build/mjs/src/voices";

const voices = await getVoices();
console.log(voices);


// or 
import { voicesSelection } from "readium-speech/build/cjs";
import { voicesSelection } from "readium-speech/build/mjs";

const voices = await voicesSelection.getVoices();
console.log(voices);

```

## API

### Interface 

```
export interface IVoices {
    label: string;
    voiceURI: string;
    name: string;
    language: string;
    gender?: TGender | undefined;
    age?: string | undefined;
    offlineAvailability: boolean;
    quality?: TQuality | undefined;
    pitchControl: boolean;
    recommendedPitch?: number | undefined;
    recommendedRate?: number | undefined;
}

export interface ILanguages {
    label: string;
    code: string;
    count: number;
}
```

#### Parse and Extract IVoices from speechSynthesis WebAPI
```
function getVoices(preferredLanguage?: string[] | string, localization?: string): Promise<IVoices[]>
```

#### List languages from IVoices
```
function getLanguages(voices: IVoices[], preferredLanguage?: string[] | string, localization?: string | undefined): ILanguages[]
```

#### helpers

```
function listLanguages(voices: IVoices[], localization?: string): ILanguages[]

function ListRegions(voices: IVoices[], localization?: string): ILanguages[]

function parseSpeechSynthesisVoices(speechSynthesisVoices: SpeechSynthesisVoice[]): IVoices[]

function getSpeechSynthesisVoices(): Promise<SpeechSynthesisVoice[]>
```

#### groupBy

```
function groupByKindOfVoices(allVoices: IVoices[]): TGroupVoices

function groupByRegions(voices: IVoices[], language: string, preferredRegions?: string[] | string, localization?: string): TGroupVoices

function groupByLanguage(voices: IVoices[], preferredLanguage?: string[] | string, localization?: string): TGroupVoices
```

#### sortBy

```
function sortByLanguage(voices: IVoices[], preferredLanguage?: string[] | string): IVoices[]

function sortByRegion(voices: IVoices[], preferredRegions?: string[] | string, localization?: string | undefined): IVoices[]

function sortByGender(voices: IVoices[], genderFirst: TGender): IVoices[]

function sortByName(voices: IVoices[]): IVoices[]

function sortByQuality(voices: IVoices[]): IVoices[]
```

#### filterOn

```
function filterOnRecommended(voices: IVoices[], _recommended?: IRecommended[]): TReturnFilterOnRecommended

function filterOnVeryLowQuality(voices: IVoices[]): IVoices[]

function filterOnNovelty(voices: IVoices[]): IVoices[]

function filterOnQuality(voices: IVoices[], quality: TQuality | TQuality[]): IVoices[]

function filterOnLanguage(voices: IVoices[], language: string | string[]): IVoices[]

function filterOnGender(voices: IVoices[], gender: TGender): IVoices[]
```
