// nodeで必要な際に実行する

const axios = require('axios')
const enJson = require('../../translations/en/manual.json')
const esJson = require('../../translations/es/manual.json')
const fs = require('fs')
require('dotenv').config();

const tes = async() => {
  let translatedObject = {};
  const translateTarget = esJson;
  const tes = Object.entries(translateTarget).map(async([key, value]) => {
    if(value === "" || value === null || value === undefined) {
      const baseLangSentence = enJson[key];
      const targetLang = "ES";
      const url = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_AUTH_KEY}&text=${baseLangSentence}&target_lang=${targetLang}`;
      const deepLres = await axios.post(url).then(r => r);
      const translatedSentence = String(deepLres.data.translations[0].text);
      translatedObject[key] = translatedSentence;

      return {[key]: translatedSentence};
    }
    translatedObject[key] = value;

    return {[key]: value};
  });

  const translatedArr = await Promise.all([...tes]).then(r => r);

  return Object.assign(...translatedArr);
}

const translateDeepL = async() => {
  const contents = await tes();
  const JSONdata = JSON.stringify(contents, null, 2);
  await fs.writeFileSync('src/translations/es/deepl.json', JSONdata);
}

translateDeepL();