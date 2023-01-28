import type { PageServerLoad } from './$types';
import figlet from 'figlet';
import { promisify } from 'util';

const asyncFigletFonts = promisify(figlet.fonts);
const getFigletFonts = async () => await asyncFigletFonts().then((fonts) => fonts);

export const load: PageServerLoad = async () => {
	const fonts = (await getFigletFonts()) as string[];
	return { fonts };
};
