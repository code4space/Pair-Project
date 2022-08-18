function currencyConverter(numberValue) {
  return numberValue.toLocaleString('id', { style: 'currency', currency: 'IDR' })


}

module.exports = currencyConverter;