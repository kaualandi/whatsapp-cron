export async function debounceTime(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function toBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
