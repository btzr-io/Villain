// ES6 module syntax
import LocalizedStrings from 'react-localization'
import EN from '@/locales/messages.json'
import DE from '@/locales/messages.de.json'
import FR from '@/locales/messages.fr.json'
import PT from '@/locales/messages.pt.json'
import RU from '@/locales/messages.ru.json'

const localize = new LocalizedStrings({
  EN,
  DE,
  PT,
  RU,
  FR,
})

export default localize
