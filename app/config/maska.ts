import type { MaskInputOptions } from "maska";

export const documentMaskOptions: MaskInputOptions = {
  mask: ["###.###.###-##", "##.###.###/####-##"],
  eager: true,
};

export const phoneMaskOptions: MaskInputOptions = {
  mask: ["(##) #####-####", "(##) ####-####"],
  eager: true,
};

export const zipCodeMaskOptions: MaskInputOptions = {
  mask: "#####-###",
  eager: true,
};

export const currencyMaskOptions: MaskInputOptions = {
  number: {
    locale: "pt-BR",
    fraction: 2,
    unsigned: true,

  },
  postProcess: (val) => val ? `R$ ${val}` : '',
  eager: true,
};
