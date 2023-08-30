import Fonts from '$lib/fonts';
import type { Fonts as TFonts } from 'figlet';
import { text } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = false;

const queryParamsSchema = z.object({
  text: z.string().transform(decodeURI),
});

const paramsSchema = z.object({
  // anon func below appeases TypeScript
  fontName: z.any().transform((x) => decodeURI(x) as TFonts),
});

export async function GET({ url, params }) {
  const { fontName } = paramsSchema.parse(params);
  const { text: inputText } = queryParamsSchema.parse({
    text: url.searchParams.get('text'),
  });
  const rendered = Fonts.render(inputText, fontName);
  return text(rendered);
}
