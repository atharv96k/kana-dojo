export type ClickSoundId =
  | 'click'
  | 'beep'
  | 'pop'
  | 'nk-creams'
  | 'typewriter'
  | 'osu'
  | 'hitmarker'
  | 'sine'
  | 'sawtooth'
  | 'square'
  | 'triangle'
  | 'pentatonic'
  | 'wholetone'
  | 'fist-fight'
  | 'rubber-keys'
  | 'fart'

export interface ClickSoundOption {
  id: ClickSoundId;
  label: string;
  monkeytypeId: string;
  sourceType: 'file' | 'synthetic-generated';
  variants: string[];
}

export const DEFAULT_CLICK_SOUND_ID: ClickSoundId = "nk-creams";

export const CLICK_SOUND_OPTIONS: ClickSoundOption[] = [
  {
    id: 'click',
    label: 'click',
    monkeytypeId: '1',
    sourceType: 'file',
    variants: [
      'click1_1',
      'click1_2',
      'click1_3',
    ],
  },
  {
    id: 'beep',
    label: 'beep',
    monkeytypeId: '2',
    sourceType: 'file',
    variants: [
      'click2_1',
      'click2_2',
      'click2_3',
    ],
  },
  {
    id: 'pop',
    label: 'pop',
    monkeytypeId: '3',
    sourceType: 'file',
    variants: [
      'click3_1',
      'click3_2',
      'click3_3',
    ],
  },
  {
    id: 'nk-creams',
    label: 'nk creams',
    monkeytypeId: '4',
    sourceType: 'file',
    variants: [
      'click4_1',
      'click4_11',
      'click4_2',
      'click4_22',
      'click4_3',
      'click4_33',
      'click4_4',
      'click4_44',
      'click4_5',
      'click4_55',
      'click4_6',
      'click4_66',
    ],
  },
  {
    id: 'typewriter',
    label: 'typewriter',
    monkeytypeId: '5',
    sourceType: 'file',
    variants: [
      'click5_1',
      'click5_11',
      'click5_2',
      'click5_22',
      'click5_3',
      'click5_33',
      'click5_4',
      'click5_44',
      'click5_5',
      'click5_55',
      'click5_6',
      'click5_66',
    ],
  },
  {
    id: 'osu',
    label: 'osu',
    monkeytypeId: '6',
    sourceType: 'file',
    variants: [
      'click6_1',
      'click6_11',
      'click6_2',
      'click6_22',
      'click6_3',
      'click6_33',
    ],
  },
  {
    id: 'hitmarker',
    label: 'hitmarker',
    monkeytypeId: '7',
    sourceType: 'file',
    variants: [
      'click7_1',
      'click7_11',
      'click7_2',
      'click7_22',
      'click7_3',
      'click7_33',
    ],
  },
  {
    id: 'sine',
    label: 'sine',
    monkeytypeId: '8',
    sourceType: 'synthetic-generated',
    variants: [
      'sine_01',
      'sine_02',
      'sine_03',
      'sine_04',
      'sine_05',
      'sine_06',
      'sine_07',
      'sine_08',
      'sine_09',
      'sine_10',
    ],
  },
  {
    id: 'sawtooth',
    label: 'sawtooth',
    monkeytypeId: '9',
    sourceType: 'synthetic-generated',
    variants: [
      'sawtooth_01',
      'sawtooth_02',
      'sawtooth_03',
      'sawtooth_04',
      'sawtooth_05',
      'sawtooth_06',
      'sawtooth_07',
      'sawtooth_08',
      'sawtooth_09',
      'sawtooth_10',
    ],
  },
  {
    id: 'square',
    label: 'square',
    monkeytypeId: '10',
    sourceType: 'synthetic-generated',
    variants: [
      'square_01',
      'square_02',
      'square_03',
      'square_04',
      'square_05',
      'square_06',
      'square_07',
      'square_08',
      'square_09',
      'square_10',
    ],
  },
  {
    id: 'triangle',
    label: 'triangle',
    monkeytypeId: '11',
    sourceType: 'synthetic-generated',
    variants: [
      'triangle_01',
      'triangle_02',
      'triangle_03',
      'triangle_04',
      'triangle_05',
      'triangle_06',
      'triangle_07',
      'triangle_08',
      'triangle_09',
      'triangle_10',
    ],
  },
  {
    id: 'pentatonic',
    label: 'pentatonic',
    monkeytypeId: '12',
    sourceType: 'synthetic-generated',
    variants: [
      'pentatonic_01',
      'pentatonic_02',
      'pentatonic_03',
      'pentatonic_04',
      'pentatonic_05',
      'pentatonic_06',
      'pentatonic_07',
      'pentatonic_08',
    ],
  },
  {
    id: 'wholetone',
    label: 'wholetone',
    monkeytypeId: '13',
    sourceType: 'synthetic-generated',
    variants: [
      'wholetone_01',
      'wholetone_02',
      'wholetone_03',
      'wholetone_04',
      'wholetone_05',
      'wholetone_06',
      'wholetone_07',
      'wholetone_08',
    ],
  },
  {
    id: 'fist-fight',
    label: 'fist fight',
    monkeytypeId: '14',
    sourceType: 'file',
    variants: [
      'click14_1',
      'click14_2',
      'click14_3',
      'click14_4',
      'click14_5',
      'click14_6',
      'click14_7',
      'click14_8',
    ],
  },
  {
    id: 'rubber-keys',
    label: 'rubber keys',
    monkeytypeId: '15',
    sourceType: 'file',
    variants: [
      'click15_1',
      'click15_2',
      'click15_3',
      'click15_4',
      'click15_5',
    ],
  },
  {
    id: 'fart',
    label: 'fart',
    monkeytypeId: '16',
    sourceType: 'file',
    variants: [
      'click16_1',
      'click16_10',
      'click16_11',
      'click16_2',
      'click16_3',
      'click16_4',
      'click16_5',
      'click16_6',
      'click16_7',
      'click16_8',
      'click16_9',
    ],
  },
];

export const CLICK_SOUND_OPTIONS_BY_ID: Record<ClickSoundId, ClickSoundOption> =
  CLICK_SOUND_OPTIONS.reduce((acc, option) => {
    acc[option.id] = option;
    return acc;
  }, {} as Record<ClickSoundId, ClickSoundOption>);

export function getClickSoundVariantBaseUrls(id: ClickSoundId): string[] {
  const option = CLICK_SOUND_OPTIONS_BY_ID[id];
  if (!option) return [];
  return option.variants.map(variant => `/sounds/monkeytype-pack/${option.id}/${variant}`);
}
