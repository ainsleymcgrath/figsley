import figlet from 'figlet';

export default {
  load: () => {
    const fonts = figlet.fontsSync();
    for (const font of fonts) {
      figlet.loadFontSync(font);
    }
  },
  render: (text: string, font: figlet.Fonts) => figlet.textSync(text, font),
  list: () => figlet.fontsSync()
};
