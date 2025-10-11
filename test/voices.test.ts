import test from "ava";
import { filterOnRecommended, groupByLanguages, ReadiumSpeechVoice, sortByLanguage, groupByRegions } from "../src/voices.js";
import { IRecommended } from "../src/data.gen.js";

test('dumb test', t => {
	t.deepEqual([], []);
});

test.before(t => {
	// This runs before all tests
	globalThis.window = { navigator: { languages: [] } as any } as any;
});

test('sortByLanguage: Empty preferred language list', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, [], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'en-US');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'fr-FR');
});

test('sortByLanguage: Preferred language list with one language', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, ['fr-FR'], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'fr-FR');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'en-US');
});

test('sortByLanguage: Preferred language list with multiple languages', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 4', voiceURI: 'uri4', name: 'Name 4', language: 'es-ES', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, ['fr-FR', 'es-ES'], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'fr-FR');
	t.true(result[1].language === 'es-ES');
	t.true(result[2].language === 'en-US');
	t.true(result[3].language === 'en-US');
});

test('sortByLanguage: No matching languages', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, ['de-DE'], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'en-US');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'fr-FR');
});

test('sortByLanguage: Preferred language list is not an array', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, 'en-US', "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'en-US');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'fr-FR');
});

test('sortByLanguage: Preferred language undefined and navigator langua', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, 'en-US', "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'en-US');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'fr-FR');
});

test('sortByLanguage: Preferred language list with one language and navigator.languages', t => {
	(globalThis.window.navigator as any).languages = ['fr-FR', 'en-US'];
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, ['fr-FR'], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'fr-FR');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'en-US');
});

test('sortByLanguage: Preferred language list with multiple languages and navigator.languages', t => {
	(globalThis.window.navigator as any).languages = ['fr-FR', 'en-US'];
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 4', voiceURI: 'uri4', name: 'Name 4', language: 'es-ES', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, ['fr-FR', 'es-ES'], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'fr-FR');
	t.true(result[1].language === 'es-ES');
	t.true(result[2].language === 'en-US');
	t.true(result[3].language === 'en-US');
});

test('sortByLanguage: No matching languages and navigator.languages', t => {
	(globalThis.window.navigator as any).languages = ['de-DE', 'en-US'];
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, ['de-DE'], "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'en-US');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'fr-FR');
});

test('sortByLanguage: Preferred language list is not an array and navigator.languages', t => {
	(globalThis.window.navigator as any).languages = ['fr-FR', 'en-US'];
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];

	const result = sortByLanguage(voices, 'en-US', "");
	t.true(result.length === voices.length);
	t.true(result[0].language === 'en-US');
	t.true(result[1].language === 'en-US');
	t.true(result[2].language === 'fr-FR');
});

test('filterOnRecommended: Empty input', t => {
	const voices: ReadiumSpeechVoice[] = [];
	const result = filterOnRecommended(voices);
	t.deepEqual(result, [[], []]);
});

test('filterOnRecommended: No recommended voices', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
	];
	const result = filterOnRecommended(voices, []);
	t.deepEqual(result, [[], []]);
});

test('filterOnRecommended: Single recommended voice with single quality', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high'], language: 'en-US', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[],
	]);
});

test('filterOnRecommended: Single recommended voice with multiple qualities', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high', 'normal'], language: 'en-US', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'normal', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[],
	]);
});

test('filterOnRecommended: Single recommended voice with multiple qualities and remaining lowQuality', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 1 (Premium)', language: 'en-US', offlineAvailability: true, pitchControl: true },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high', 'normal'], language: 'en-US', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri3', name: 'Name 1 (Premium)', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'low', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
	]);
});

test('filterOnRecommended: Multiple recommended voices', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high'], language: 'en-US', localizedName: "" },
		{ name: 'Name 2', label: 'Voice 2', quality: ['normal'], language: 'es-ES', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
			{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false, quality: 'normal', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[],
	]);
});
test('filterOnRecommended: Recommended voices with altNames', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 1-1', voiceURI: 'uri1-1', name: 'Name 1 with an altNames', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high'], altNames: ['Name 1 with an altNames'], language: 'en-US', localizedName: "" },
		{ name: 'Name 2', label: 'Voice 2', quality: ['normal'], language: 'es-ES', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
			{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false, quality: 'normal', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[
			{ label: 'Voice 1', voiceURI: 'uri1-1', name: 'Name 1 with an altNames', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
	]);
});
test('filterOnRecommended: Recommended voices with altNames only and voices not in name', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1 with an altNames', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high'], altNames: ['Name 1 with an altNames'], language: 'en-US', localizedName: "" },
		{ name: 'Name 2', label: 'Voice 2', quality: ['normal'], language: 'es-ES', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1 with an altNames', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
			{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false, quality: 'normal', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[
		],
	]);
});
test('filterOnRecommended: Recommended voices with multiple altNames and voices not in name', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1 with an altNames', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 1-1', voiceURI: 'uri1-1', name: 'Name 1 with a second altNames', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
	];
	const recommended: IRecommended[] = [
		{ name: 'Name 1', label: 'Voice 1', quality: ['high'], altNames: ['Name 1 with an altNames', 'Name 1 with a second altNames'], language: 'en-US', localizedName: "" },
		{ name: 'Name 2', label: 'Voice 2', quality: ['normal'], language: 'es-ES', localizedName: "" },
	];
	const result = filterOnRecommended(voices, recommended);
	t.deepEqual(result, [
		[
			{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1 with an altNames', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
			{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'es-ES', offlineAvailability: false, pitchControl: false, quality: 'normal', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
		[
			{ label: 'Voice 1', voiceURI: 'uri1-1', name: 'Name 1 with a second altNames', language: 'en-US', offlineAvailability: true, pitchControl: true, quality: 'high', recommendedRate: undefined, recommendedPitch: undefined, gender: undefined },
		],
	]);
});
test('groupByLanguage: ', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 4', voiceURI: 'uri4', name: 'Name 4', language: 'es-ES', offlineAvailability: true, pitchControl: true },
	];
	const result = groupByLanguages(voices, ['fr-FR', 'es-ES'], "");
	t.deepEqual(result, new Map([
		['fr', [
			{
				label: 'Voice 2',
				language: 'fr-FR',
				name: 'Name 2',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri2',
			},
		]],
		['es', [
			{
				label: 'Voice 4',
				language: 'es-ES',
				name: 'Name 4',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri4',
			},
		]],
		['en', [
			{
				label: 'Voice 1',
				language: 'en-US',
				name: 'Name 1',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri1',
			},
			{
				label: 'Voice 3',
				language: 'en-US',
				name: 'Name 3',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri3',
			},
		]],
	]));
});
test('groupByLanguage: localized en', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 4', voiceURI: 'uri4', name: 'Name 4', language: 'es-ES', offlineAvailability: true, pitchControl: true },
	];
	const result = groupByLanguages(voices, ['fr-FR', 'es-ES'], "en");
	t.deepEqual(result, new Map([
		['French', [
			{
				label: 'Voice 2',
				language: 'fr-FR',
				name: 'Name 2',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri2',
			},
		]],
		['Spanish', [
			{
				label: 'Voice 4',
				language: 'es-ES',
				name: 'Name 4',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri4',
			},
		]],
		['English', [
			{
				label: 'Voice 1',
				language: 'en-US',
				name: 'Name 1',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri1',
			},
			{
				label: 'Voice 3',
				language: 'en-US',
				name: 'Name 3',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri3',
			},
		]],
	]));
});
test('groupByRegion: ', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-GB', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 4', voiceURI: 'uri4', name: 'Name 4', language: 'es-ES', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 5', voiceURI: 'uri5', name: 'Name 5', language: 'en-CA', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 6', voiceURI: 'uri6', name: 'Name 6', language: 'fr-CA', offlineAvailability: true, pitchControl: true },
	];
	const result = groupByRegions(voices, ['fr-FR', 'es-ES'], "");
	t.deepEqual(result, new Map([
		['FR', [
			{
				label: 'Voice 2',
				language: 'fr-FR',
				name: 'Name 2',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri2',
			},
		]],
		['ES', [
			{
				label: 'Voice 4',
				language: 'es-ES',
				name: 'Name 4',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri4',
			},
		]],
		['US', [
			{
				label: 'Voice 1',
				language: 'en-US',
				name: 'Name 1',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri1',
			},
		]],
		['CA', [
			{
				label: 'Voice 5',
				language: 'en-CA',
				name: 'Name 5',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri5',
			},
			{
				label: 'Voice 6',
				language: 'fr-CA',
				name: 'Name 6',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri6',
			},
		]],
		['GB', [
			{
				label: 'Voice 3',
				language: 'en-GB',
				name: 'Name 3',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri3',
			},
		]],
	]));
});
test('groupByRegion: localized fr', t => {
	const voices = [
		{ label: 'Voice 1', voiceURI: 'uri1', name: 'Name 1', language: 'en-US', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 2', voiceURI: 'uri2', name: 'Name 2', language: 'fr-FR', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 3', voiceURI: 'uri3', name: 'Name 3', language: 'en-GB', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 4', voiceURI: 'uri4', name: 'Name 4', language: 'es-ES', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 5', voiceURI: 'uri5', name: 'Name 5', language: 'en-CA', offlineAvailability: true, pitchControl: true },
		{ label: 'Voice 6', voiceURI: 'uri6', name: 'Name 6', language: 'fr-CA', offlineAvailability: true, pitchControl: true },
	];
	const result = groupByRegions(voices, ['fr-FR', 'es-ES'], "fr");
	t.deepEqual(result, new Map([
		['France', [
			{
				label: 'Voice 2',
				language: 'fr-FR',
				name: 'Name 2',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri2',
			},
		]],
		['Espagne', [
			{
				label: 'Voice 4',
				language: 'es-ES',
				name: 'Name 4',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri4',
			},
		]],
		['États-Unis', [
			{
				label: 'Voice 1',
				language: 'en-US',
				name: 'Name 1',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri1',
			},
		]],
		['Canada', [
			{
				label: 'Voice 5',
				language: 'en-CA',
				name: 'Name 5',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri5',
			},
			{
				label: 'Voice 6',
				language: 'fr-CA',
				name: 'Name 6',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri6',
			},
		]],
		['Royaume-Uni', [
			{
				label: 'Voice 3',
				language: 'en-GB',
				name: 'Name 3',
				offlineAvailability: true,
				pitchControl: true,
				voiceURI: 'uri3',
			},
		]],
	]));
});