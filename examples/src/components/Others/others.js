export const isObject = value =>
  value && typeof value === 'object' && value.constructor === Object

export const isBoolean = value => typeof value === 'boolean'

export const parseEvent = target => {
  const name = target.name
  let value = target.value
  if (target.type === 'checkbox') value = target.checked
  else if (target.type === 'file') value = target.files[0]
  else if (!isNaN(Number(value))) value = value === '' ? '' : Number(value)
  return { name, value }
}
