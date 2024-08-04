export default function getPrice(priceString) {
  const space = new RegExp(String.fromCharCode(160), "g");
  return (+priceString).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'code',
  }).replace(space, ' ');
}
