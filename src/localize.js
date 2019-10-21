// ES6 module syntax
import LocalizedStrings from 'react-localization'

const Localization = new LocalizedStrings({
  en: require('@/locales/messages.json'),
  de: require('@/locales/messages.de.json'),
  pt: require('@/locales/messages.pt.json'),
  ru: require('@/locales/messages.ru.json'),
})

export default Localization
