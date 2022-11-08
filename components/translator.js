const americanOnly = require('./american-only');
const americanToBritishSpelling = require('./american-to-british-spelling');
const americanToBritishTitles = require('./american-to-british-titles');
const britishOnly = require('./british-only');

class Translator {
  translate(text, locale, highlightTranslatedWords = false) {
    let result;
    if (locale === 'american-to-british') {
      result = this.toBritishEnglish(text, highlightTranslatedWords);
    } else if (locale === 'british-to-american') {
      result = this.toAmericanEnglish(text, highlightTranslatedWords);
    }
    return result;
  }

  toBritishEnglish(text, highlightTranslatedWords) {
    const lowerCaseText = text.toLowerCase();
    const translatedWords = [];

    const wordsWithSpaces = Object.entries(americanOnly).filter(([k, v]) => k.includes(' '));
    for (const [key, value] of wordsWithSpaces) {
      if (lowerCaseText.includes(key)) {
        translatedWords.push([key, value]);
      }
    }

    const words = lowerCaseText.split(' ');
    let cleanWord;
    let allWords = Object.entries(americanOnly).filter(([k, v]) => !k.includes(' '));
    allWords = allWords.concat(Object.entries(americanToBritishSpelling));

    for (let i = 0; i < words.length; i += 1) {
      cleanWord = words[i].replaceAll(/[?|!]|\.$/g, '');
      for (const [key, value] of allWords) {
        if (cleanWord === key) {
          translatedWords.push([key, value]);
        }
      }
    }

    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      if (lowerCaseText.includes(key)) {
        translatedWords.push([key, value[0].toUpperCase() + value.slice(1)]);
      }
    }

    const timeRegex = /^[0-9]{2}:[0-9]{2}$/;
    for (let i = 0; i < words.length; i += 1) {
      if (timeRegex.test(words[i])) {
        translatedWords.push([words[i], words[i].replace(':', '.')]);
      }
    }

    const result = this.replaceTranslatedWords(text, translatedWords, highlightTranslatedWords);
    return result;
  }

  replaceTranslatedWords(text, translatedWords, highlightTranslatedWords) {
    let translation = text;
    let value;
    let regex;
    for (let i = 0; i < translatedWords.length; i += 1) {
      if (highlightTranslatedWords) {
        value = this.wrapHighlight(translatedWords[i][1]);
      } else {
        value = translatedWords[i][1];
      }
      regex = new RegExp(translatedWords[i][0], 'gi');
      translation = translation.replaceAll(regex, value);
    }
    return translation;
  }

  reverseMapObject(obj) {
    const res = {};
    Object.keys(obj).map((key) => {
      res[obj[key]] = key;
    });
    return res;
  }

  toAmericanEnglish(text, highlightTranslatedWords) {
    const lowerCaseText = text.toLowerCase();
    const translatedWords = [];

    const wordsWithSpaces = Object.entries(britishOnly).filter(([k, v]) => k.includes(' '));
    for (const [key, value] of wordsWithSpaces) {
      if (lowerCaseText.includes(key)) {
        translatedWords.push([key, value]);
      }
    }

    const words = lowerCaseText.split(' ');
    let cleanWord;
    let allWords = Object.entries(britishOnly).filter(([k, v]) => !k.includes(' '));
    allWords = allWords.concat(
      Object.entries(
        this.reverseMapObject(americanToBritishSpelling),
      ),
    );

    for (let i = 0; i < words.length; i += 1) {
      cleanWord = words[i].replaceAll(/[?|!]|\.$/g, '');
      for (const [key, value] of allWords) {
        if (cleanWord === key) {
          translatedWords.push([key, value]);
        }
      }
    }

    for (let i = 0; i < words.length; i += 1) {
      for (const [key, value] of Object.entries(americanToBritishTitles)) {
        if (words[i] === value) {
          translatedWords.push([value, key[0].toUpperCase() + key.slice(1)]);
        }
      }
    }

    const timeRegex = /^[0-9]{1,2}\.[0-9]{2}$/;
    for (let i = 0; i < words.length; i += 1) {
      cleanWord = words[i].replaceAll(/[?|!]|\.$/g, '');
      if (timeRegex.test(cleanWord)) {
        translatedWords.push([cleanWord, cleanWord.replace('.', ':')]);
      }
    }

    const result = this.replaceTranslatedWords(text, translatedWords, highlightTranslatedWords);
    return result;
  }

  wrapHighlight(word) {
    return `<span class="highlight">${word}</span>`;
  }
}

module.exports = Translator;
