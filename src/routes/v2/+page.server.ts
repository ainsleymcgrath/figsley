import fonts from '$lib/fonts';

import { formInputFromUrl } from '$lib/urls';

export const prerender = false;

export async function load({ url }) {
  const input = formInputFromUrl(url);

  const rendered = (input?.fonts ?? []).reduce(
    (acc, cur) => ({ ...acc, [cur]: fonts.render(input?.text ?? '', cur) }),
    {}
  );
  return { fonts: fonts.list(), rendered };
}
