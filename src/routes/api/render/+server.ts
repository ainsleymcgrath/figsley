import Fonts from '$lib/fonts';
import type { Fonts as TFonts } from 'figlet';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = false;

const FontRenderRequest: z.ZodType<{ text: string; fonts: TFonts[] }> = z.object({
  text: z.string(),
  fonts: z.array(z.any().transform((x) => decodeURI(x) as TFonts)),
});

export async function GET({ url }) {
  const input = FontRenderRequest.parse({
    text: url.searchParams.get('text'),
    fonts: url.searchParams.getAll('fonts'),
  });
  const rendered: { [f: string]: string } = input.fonts.reduce(
    (acc, font) => ({ ...acc, [font]: Fonts.render(input.text, font) }),
    {}
  );
  return json(rendered);
}
