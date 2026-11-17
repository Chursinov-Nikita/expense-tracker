export function formatMoney(kopecks: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(kopecks / 100);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: "UTC" }).format(date);
}
