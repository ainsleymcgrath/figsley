import type { Fonts } from 'figlet';
import JSURL from 'jsurl2';

interface FormInput {
  text: string;
  fonts: Fonts[];
}

const TEXT_SHORT_KEY = '.';
const FONTS_SHORT_KEY = ',';

export function formInputShrink({ text, fonts }: FormInput) {
  const short = JSURL.stringify({ [TEXT_SHORT_KEY]: text, [FONTS_SHORT_KEY]: fonts });
  return short as string;
}

export function formInputExpand(shrunken: string) {
  // eslint-disable-next-line
  const restored: any = JSURL.parse(shrunken);
  return { text: restored[TEXT_SHORT_KEY], fonts: restored[FONTS_SHORT_KEY] } as FormInput;
}

export function formInputFromUrl(url: URL) {
  const inputRaw = url.searchParams.get('-') as string;
  if (inputRaw === null) return null;
  const input = formInputExpand(inputRaw);
  return input;
}
