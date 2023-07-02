import Fonts from '$lib/fonts';
import type { Fonts as TFonts } from 'figlet';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

export const prerender = false;

const FontRenderRequest: z.ZodType<{ text: string; fonts: TFonts[] }> = z.object({
  text: z.string().transform(decodeURI),
  // anon func below appeases TypeScript
  fonts: z.array(z.any().transform((x) => decodeURI(x) as TFonts)),
});

export async function GET({ url }) {
  const input = FontRenderRequest.parse({
    text: url.searchParams.get('text'),
    fonts: url.searchParams.getAll('fonts'),
    pageIndex: z.number().default(0),
    pageSize: z.number().default(20),
  });
  const rendered: { [f: string]: string } = input.fonts.reduce(
    (acc, font) => ({ ...acc, [font]: Fonts.render(input.text, font) }),
    {}
  );
  return json(rendered);
}
