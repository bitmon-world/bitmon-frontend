export const BITMON_UPDATE_AUTHORITY =
  "Cw4wy1Yg1334gRQ5SxG43Qt5QbM1DM665ur8R6imWGkR";

export enum ATTRIBUTES_INDEX {
  BODY_COLOR,
  MOUTH,
  EYE,
  EYEBROW,
  NOSE,
  HAIR,
  BACK_HAIR,
  BEARD,
  ACCESSORY,
  FACE_ACCESSORY,
  CLOTHES,
  GLASSES,
  BACKGROUND,
}

export const ATTRIBUTES_AMOUNT: { [k: number]: number } = {
  [ATTRIBUTES_INDEX.MOUTH]: 19,
  [ATTRIBUTES_INDEX.EYE]: 15,
  [ATTRIBUTES_INDEX.NOSE]: 6,
  [ATTRIBUTES_INDEX.EYEBROW]: 9,
  [ATTRIBUTES_INDEX.ACCESSORY]: 80,
  [ATTRIBUTES_INDEX.FACE_ACCESSORY]: 22,
  [ATTRIBUTES_INDEX.BACKGROUND]: 15,
  [ATTRIBUTES_INDEX.GLASSES]: 17,
};

export const ATTRIBUTES_PREFIX: { [k: number]: string } = {
  [ATTRIBUTES_INDEX.MOUTH]: "mouth",
  [ATTRIBUTES_INDEX.EYE]: "eye",
  [ATTRIBUTES_INDEX.NOSE]: "nose",
  [ATTRIBUTES_INDEX.EYEBROW]: "eyebrow",
  [ATTRIBUTES_INDEX.ACCESSORY]: "accessory",
  [ATTRIBUTES_INDEX.FACE_ACCESSORY]: "face-accessory",
  [ATTRIBUTES_INDEX.BACKGROUND]: "background",
  [ATTRIBUTES_INDEX.GLASSES]: "glasses",
};

export const EYE_COLORS: { [k: number]: string } = {
  1: "#483823",
  2: "#afaaaf",
  3: "#799b2d",
  4: "#5a3f5e",
  5: "#4f92bd",
  6: "#b53839",
  7: "#af4369",
  8: "#b58850",
};

export const BODY_COLOR: { [k: number]: string } = {
  1: "#d0a884",
  2: "#fceee3",
  3: "#eab874",
  4: "#392a27",
  5: "#f7c7c3",
  6: "#bbb7cd",
  7: "#cec96b",
  8: "#cf7bb3",
  9: "#b58850",
  10: "#ffe599",
  11: "#ffd966",
  12: "#bf9000",
  13: "#7f6000",
  14: "#f9cb9c",
  15: "#f6b26b",
  16: "#e69138",
  17: "#b45f06",
  18: "#ea9999",
  19: "#e06666",
  20: "#a61c00",
  21: "#85200c",
  22: "#660000",
  23: "#5b0f00",
  24: "#000000",
  25: "#cc4125",
  26: "#dd7e6b",
  27: "#ffd966",
  28: "#ea9999",
  29: "#e06666",
  30: "#f4cccc",
};
