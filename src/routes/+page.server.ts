import figlet from 'figlet';

import type { Actions } from './$types';

export const actions: Actions = {
	renderUserInput: async (event) => {
		const data = await event.request.formData();
		const userInput = data.get('userInput');

		if (userInput === null) return { rendered: '' };

		const rendered = figlet.textSync(userInput.toString(), {
			font: 'Ghost',
			horizontalLayout: 'default',
			verticalLayout: 'default',
			width: 80,
			whitespaceBreak: true
		});

		return { rendered };
	}
};
