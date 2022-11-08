const Translator = require('../components/translator');

module.exports = (app) => {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale, test } = req.body;
      if (
        text === undefined
        || locale === undefined
        || locale === ''
      ) { return res.send({ error: 'Required field(s) missing' }); }

      if (text === '') { return res.send({ error: 'No text to translate' }); }

      if (!(locale === 'british-to-american') && !(locale === 'american-to-british')) {
        return res.send({ error: 'Invalid value for locale field' });
      }

      let highLight;
      if (test) {
        highLight = false;
      } else {
        highLight = true;
      }
      const translation = translator.translate(text, locale, highLight);

      if (translation === text) return res.send({ text, translation: 'Everything looks good to me!' });
      return res.send({ text, translation });
    });
};
