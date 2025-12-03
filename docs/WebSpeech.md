# SpeechSynthesis in browsers and OSes

Through the work done to document a list of recommended voices, various browsers/OS have been tested to see how they behave. This section is meant to summarize some of this information.

## General

* The Web Speech API returns the following fields through the `getVoices()` method: `name`, `voiceURI`, `lang`, `localService` and `default`.
* While `voiceURI` should be the most consistent way of identifying a voice in theory, in practice this couldn't be further from the truth. Most browsers use the same value than `name` for `voiceURI` and do not enforce uniqueness.
* As we'll see in notes for specific browsers/OS, `name` is also inconsistently implemented and can return different values for the same voice on the same device.
* `localService` indicates if a voice is available for offline use and it seems to be working as expected, which is why the current list of recommended voices doesn't contain that information.
* `lang` seems to be mostly reliable across implementations, returning a language using BCP 47 language tags, with the main language in downcase and the subtag in uppercase (`pt-BR`).
* There are unfortunately a few outliers:
	* On Android, Samsung and Chrome use an underscore as the separator instead: `en_us` ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/13))
	* While Firefox on Android gets even more creative, using three letter codes for languages and adding an extra string at the end: `eng-US-f000` ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/17))
* `default` is meant to indicate if a voice is the default voice for the current app language. In theory this should be extremely useful, but in practice it's really hard to use due to inconsistencies across implementations, limited context (system default vs user default) and the lack of capability for setting a default voice per language.
* In addition to the use of `default`, implementers should always consider using the `Accept-Language` HTTP header as well, as it contains an ordered list of preferred language/region for a given user.

## Android

* For now, we've only covered testing and documentation on vanilla versions of Android, as available on Google Pixel devices. The list of voices available may vary greatly based on OEM, device and Android version.
* Due to the nature of Android, documenting all these variations will be very difficult. Further attempts will be made in future version of this project through the use of device farms ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/8)).
* In recent versions of vanilla Android, there's an excellent selection of high quality voices which cover a wide range of languages/regions (67 as of April 2024).
* To use these voices, the user needs to go fairly deep in system settings either to download them (only your system language and some of the most popular languages are preloaded by default) or select their preferred voice per language/region.
* Unfortunately, Chrome on Android doesn't return the list of voices available to the users, instead it returns an unfiltered list of languages/regions ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/12)).
* To make things worse, these voices and regions are all localized with the system locale.
* Among other things, this means that even languages and regions which require a voice pack to be installed will show up in the list returned by the Web Speech API ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/14)).
* If the user selects a language/region for which the voice pack needs to be downloaded, Chrome will default to an English voice instead ([related issue](https://github.com/HadrienGardeur/read-aloud-best-practices/issues/6)).
* Even when a voice pack has been installed, the user may need to select a default voice for each region before a language/region can be used at all. 
* With this poor approach to voice selection, Chrome on Android doesn't indicate the user's preferred language/region either using `default` ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/16)).

## Chrome Desktop

* On desktop, Chrome comes preloaded with a limited selection of 19 high quality voices across 15 languages.
* All of these voices require online access to use them, without any fallback to a lower quality offline variant.
* Unfortunately, these voices are also plagued by a bug if any utterance read by the Web Speech API takes longer than 14 seconds ([related issue](https://github.com/HadrienGardeur/read-aloud-best-practices/issues/3)) and do not return boundary events ([related issue](https://github.com/HadrienGardeur/read-aloud-best-practices/issues/4)).
* Under the current circumstances, these Google voices have been prioritized lower than their Microsoft/Apple counterparts in the list of recommended voices.
* Overall, it's unfortunate that Chrome Desktop is lagging far behind Android and Chrome OS when it comes to the range of voices and languages supported by default ([related issue](https://github.com/HadrienGardeur/read-aloud-best-practices/issues/21)).

## Chrome OS

* Chrome OS comes with four sets of voices: Chrome OS voices, Android voices (50+ languages), Natural voices and eSpeak voices (38 languages).
* By default, Chrome OS downloads Chrome OS voices for your system language, while Android and eSpeak voices are available for all languages.
* Google is also gradually adding support for Natural voices, which are basically the higher quality variants of their Android voices with the added benefit of working offline. Natural voices require the user to go to their system settings to install them.
* Chrome OS has an unfortunate tendency of uninstalling voice packs whenever a new Chrome OS update is installed, which happens very often.
* Most Android voices offer offline and online variants and they're on par quality-wise with what Apple offers in terms of downloadable voices.
* These Android voices have some of the worst names on any platform/browser, making them hardly usable without the kind of re-labeling offered by this project.
* Android voices also suffer from issues with latency and/or availability. In some cases, it might take up to a minute for the first utterance to be read aloud.
* Chrome voices are one step below Android voices, but they offer a decent selection for the most common languages.
* eSpeak voices should be avoided at all cost due to their extremely low quality and have been documented separately in order to filter them out.

## Edge

* On desktop, Edge provides the best selection of high quality voices with over 250 preloaded voices across 75 languages (as of April 2024).
* All of these so-called "natural" voices rely on Machine Learning (ML) and therefore require online access to use them.
* A small number of those voices are also multilingual and seem to be able to detect the language of a sentence and adapt accordingly. Unfortunately, this doesn't work as well when there's a language switch in the middle of a sentence.
* On macOS at least, there's a weird bug where Edge only displays 18 natural voices initially, but this extends to 250+ once Web Speech API has been used to output an utterance.
* There are also additional issues that implementers should be aware of when using these voices: they don't support pitch adjustment ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/35)) and a number of characters need to be escaped to avoid playback issues ([related issue](https://github.com/HadrienGardeur/read-aloud-best-practices/issues/8)).
* On mobile, Edge isn't nearly as interesting: 
  * It's completely unusable on Android since it returns an empty list of voices, which makes it impossible to use with Web Speech API ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/20)). 
  * On iOS/iPadOS, all browsers are currently forced to use Safari as their engine, which means that Edge behaves exactly like Safari Mobile.
  
## Firefox

* On desktop, Firefox seems fairly straightforward when it comes to voice selection.
* Unlike Chrome and Edge, Firefox doesn't come with any preloaded voice of its own.
* Firefox has a different approach for `voiceURI` where each voice is truly identified by a unique URN.
* Since this is unique to Firefox, the current JSON files do not document these URI yet, but this could be a future addition.
* On macOS, Firefox requires a full system reboot for new voices to show up in the list.

## iOS and iPadOS

* Both OS come with the same set of preloaded voices and downloadable voices than macOS. [Read the macOS section](#macOS) below for additional information about the voices available.
* For an unknown reason, some preloaded voices are also listed twice but provide the same audio output.
* All browsers need to run on the system webview which means that they're just a shell on top of Safari Mobile rather than truly different browsers.
* This situation could change due to the Digital Market Act in Europe, forcing Apple to change its policy on third-party browsers and webviews.

## macOS

* macOS provides an extensive list of voices across 45 languages, both preloaded or downloadable.
* These voices can have up to three different variants, based on the quality of the output (and download size).
* The highest quality voices are probably the ones available for Siri, but they're unfortunately unavailable through the Web Speech API ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/22)).
* At the other end of the spectrum, Apple had the unfortunate idea of preloading a large range of low quality and weird voices such as the Eloquence (8 voices) and Effects (15 voices) voice packs.
* The existence of these voices alone is a good reason to filter voices available to macOS users and highlight the ones recommended on this repo.
* Unlike other platforms/OS, macOS decided to localize voice names. This wouldn't be an issue if `voiceURI` could be used as a reliable identifier for voices, but that's not the case ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/23)).
* In its current state, this repo only documents localizations for the languages supported officially and not the 45 languages supported by the macOS TTS engine.

## Safari

* For better or for worse, Safari's behaviour is mostly consistent between its desktop and mobile versions.
* Downloadable voices do not show up in the list returned by the Web Speech API ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/19)).
* Even worse than that, when installing higher quality variants of preloaded voices, these voices disappear in Safari, which means that entire languages could disappear completely.
* All voices return `true` for `default` in Safari, which makes it impossible to detect and select the system/user default ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/16)).

## Windows

* [Microsoft provides a very helpful page](https://support.microsoft.com/en-us/windows/appendix-a-supported-languages-and-voices-4486e345-7730-53da-fcfe-55cc64300f01), listing all voices available across Windows 10 and 11 for a total of 98 voices across 36 languages.
* Natural voices provide a far better experience but they require an up-to-date version of Windows 11 and need to be downloaded (with the added benefit that they also work offline).
* Microsoft has been slow to add these natural voices to Windows 11 overall. Until fairly recently, only US voices (3 voices) were available. The list is now a little longer (23 voices across 8 languages) but remains far behind what they offer through Edge (250+ voices across 75 languages).
* Unfortunately, these higher quality voices are not properly listed in Chrome or Firefox currently ([related issue](https://github.com/HadrienGardeur/web-speech-recommended-voices/issues/15)). They only show up in Edge, where they're preloaded anyway but strictly for an online use.
