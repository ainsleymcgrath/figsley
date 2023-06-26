import Fonts from '$lib/fonts';

export const prerender = false;

export async function load() {
  const fonts = Fonts.list();
  return { fonts };
}
