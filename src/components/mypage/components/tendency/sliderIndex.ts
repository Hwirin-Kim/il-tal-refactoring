export interface ISliderData {
  label: string;
  marks: { 1: string; 5: string };
  state: string;
  defaultValues: number[];
}

export const sliderIndex = [
  {
    label: "겁",
    marks: { 1: "쫄", 5: "탱" },
    state: "scare",
    defaultValues: [1, 5],
  },
  {
    label: "방",
    marks: { 1: "적음", 5: "많음" },
    state: "room",
    defaultValues: [1, 5],
  },
  {
    label: "자물쇠",
    marks: { 1: "적음", 5: "많음" },
    state: "lock",
    defaultValues: [1, 5],
  },
  {
    label: "장치",
    marks: { 1: "적음", 5: "많음" },
    state: "device",
    defaultValues: [1, 5],
  },
  {
    label: "인테리어",
    marks: { 1: "무관", 5: "중요" },
    state: "interior",
    defaultValues: [1, 5],
  },
  {
    label: "활동성",
    marks: { 1: "적음", 5: "많음" },
    state: "activity",
    defaultValues: [1, 5],
  },
];
