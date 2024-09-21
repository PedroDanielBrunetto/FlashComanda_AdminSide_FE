export const moedaUtils = {
  formatCurrency,
  parseCurrency,
};

function formatCurrency(value) {
  if (!value) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function parseCurrency(value) {
  const numericValue = value.replace(/[^\d]/g, "");
  return parseFloat(numericValue) / 100;
}
