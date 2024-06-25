export function isCnpj(body: string) {
  const number = body.replace(/\D/g, "");
  if (number.length !== 14) {
    return false;
  }
  return true;
}

export function goodDay() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 0 && hour < 12) {
    return "Bom dia";
  }

  if (hour >= 12 && hour < 18) {
    return "Boa tarde";
  }

  if (hour >= 18 && hour < 24) {
    return "Boa noite";
  }

  return "Olá";
}
