export function makeFocusOnMetaKeyHandler(element: HTMLElement | (() => HTMLElement), key: string) {
	return (e: KeyboardEvent) => {
		if (e.metaKey && e.key === key) {
			if (typeof element === 'function') {
				element().focus();
			} else {
				element.focus();
			}
		}
	};
}
