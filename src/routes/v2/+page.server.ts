import fonts from '$lib/fonts';
import type { Fonts } from 'figlet';

export const prerender = false;

export async function load({ params, url }) {
	const fontChoices = url.searchParams.getAll('font-choices') as Fonts[];
	const text = url.searchParams.get('text') as string;

	const rendered = fontChoices.reduce(
		(acc, cur) => ({ ...acc, [cur]: fonts.render(text, cur) }),
		{}
	);
	return { fonts: fonts.list(), rendered };
}

export const actions = {
	render: async (event) => {
		const formData = await event.request.formData();
		console.log('submission!');
		const text = formData.get('text') as string;
		const fontChoices = formData.getAll('font-choices') as figlet.Fonts[];
		return {
			rendered: fontChoices.reduce(
				(acc, cur) => ({
					...acc,
					[cur]: fonts.render(text, cur)
				}),
				{}
			)
		};
	}
};
