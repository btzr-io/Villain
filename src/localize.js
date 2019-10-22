// ES6 module syntax
import LocalizedStrings from 'react-localization'

const localize = new LocalizedStrings({
  EN: require('@/locales/messages.json'),
  DE: require('@/locales/messages.de.json'),
  PT: require('@/locales/messages.pt.json'),
  RU: require('@/locales/messages.ru.json'),
  FR: require('@/locales/messages.fr.json'),
})

export default localize
