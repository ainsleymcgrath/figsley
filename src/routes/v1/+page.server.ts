import fonts from '$lib/fonts';

export async function load() {
  return { fonts: fonts.list() };
}

// export const actions = {
// 	render: async (event) => {
// 		const formData = await event.request.formData();
// 		fonts.render();
// 	}
// };
