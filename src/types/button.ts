const BTN_TYPES = ['primary', 'secondary', 'destructive'] as const;
export type BtnType = (typeof BTN_TYPES)[number];
