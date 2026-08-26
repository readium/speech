import { ReadiumSpeechVoice, TServerVoiceControls } from '../voices/types';
import { SpeechServerVoice } from './types';
export declare function mapServerVoice(voice: SpeechServerVoice, providerControls?: TServerVoiceControls): ReadiumSpeechVoice;
