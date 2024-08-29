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


## QuickStart

`npm install readium-speech`

#### node :
```
import { getVoices } from "readium-speech/build/cjs/voices";

const voices = await getVoices();
console.log(voices);
```

#### web : 
```
import { getVoices } from "readium-speech/build/mjs/voices";

const voices = await getVoices();
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
    language: string;
    count: number;
}
```


#### Parse and Extract voices from speechSynthesis WebAPI
```
function getVoices(): Promise<IVoices[]>
```

#### List languages from voices or speechSynthesis WebAPI
```
function getLanguages(allVoices?: IVoices[], localization?: string): Promise<ILanguages[]>
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

function filterOnGender(voices: IVoices[], gender: TGender): IVoices[]
```

## ressources

https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html


