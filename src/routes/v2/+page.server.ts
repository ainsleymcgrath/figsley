import fonts from '$lib/fonts';

export async function load() {
	return { fonts: fonts.list() };
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
