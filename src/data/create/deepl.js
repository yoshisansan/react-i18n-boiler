// nodeで必要な際に実行する

const axios = require('axios')
const EN_JSON = require('../../translations/en/manualTranslation.json')
const ES_JSON = require('../../translations/es/manualTranslation.json')
const JA_JSON = require('../../translations/ja/manualTranslation.json')
const fs = require('fs')
require('dotenv').config();

const translate = async(baseLang, targetLang) => {
  const baseLangManualJSON = baseLang.manualJSON;
  const targetManualJSON = targetLang.manualJSON;

  const afterTranslation = Object.entries(targetManualJSON).map(async([key, value]) => {
    if(value === "" || value === null || value === undefined) {
      const baseLangSentence = baseLangManualJSON[key],
        { deeplKeyName } = targetLang,
        url = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_AUTH_KEY}&text=${baseLangSentence}&target_lang=${deeplKeyName}`,
        deepLres = await axios.post(url).then(r => r),
        translatedSentence = String(deepLres.data.translations[0].text);

      return {[key]: translatedSentence};
    }

    return {[key]: value};
  });

  const translatedArr = await Promise.all([...afterTranslation]).then(r => r);

  return Object.assign(...translatedArr);
}

const createDeepLTranslatedJSON = async(baseLang, targetLangArr) => {
  targetLangArr.map(async(targetLang) => {
    await translate(baseLang, targetLang).then(async(dataForJSON) => {
      console.log(dataForJSON);
      const JSONdata = JSON.stringify(dataForJSON, null, 2);
      await fs.writeFileSync(targetLang.outputDir, JSONdata);
    });
  });
}

const options = {
  baseLang: {
    name: 'en',
    deeplKeyName: 'EN',
    manualJSON: EN_JSON,
  },
  targetLangArr: [
    {
      name: 'ja',
      deeplKeyName: 'JA',
      manualJSON: JA_JSON,
      outputDir: 'src/translations/ja/deeplTranslation.json'
    },
    {
      name: 'es',
      deeplKeyName: 'ES',
      manualJSON: ES_JSON,
      outputDir: 'src/translations/es/deeplTranslation.json'
    }
  ]
}

createDeepLTranslatedJSON(options.baseLang, options.targetLangArr);