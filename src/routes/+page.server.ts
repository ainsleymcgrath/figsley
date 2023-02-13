import type { PageServerLoad } from './$types';
import figlet, { type Fonts } from 'figlet';
import { promisify } from 'util';

const asyncFigletFonts = promisify(figlet.fonts);
const getFigletFonts = async () => await asyncFigletFonts().then((fonts) => fonts);

export const prerender = true;

export const load: PageServerLoad = async () => {
	const fonts = (await getFigletFonts()) as Fonts[];
	for (const font of fonts) {
		figlet.loadFontSync(font);
	}
	return { fonts };
};
