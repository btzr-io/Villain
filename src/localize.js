// ES6 module syntax
import LocalizedStrings from 'react-localization'
import DE from '@/locales/messages.de.json'
import EN from '@/locales/messages.json'
import ES from '@/locales/messages.es.json'
import FR from '@/locales/messages.fr.json'
import PT from '@/locales/messages.pt.json'
import RU from '@/locales/messages.ru.json'

const localize = new LocalizedStrings({
  EN,
  DE,
  ES,
  FR,
  PT,
  RU,
})

export default localize
