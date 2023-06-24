import Fonts from '$lib/fonts';

import { formInputFromUrl } from '$lib/urls';

export const prerender = false;

export async function load({ url }) {
  const fonts = Fonts.list();
  const input = formInputFromUrl(url);

  if (input === null) return { fonts };

  const rendered = input.fonts.reduce(
    (acc, cur) => ({ ...acc, [cur]: Fonts.render(input.text, cur) }),
    {}
  );

  return { fonts, rendered };
}
