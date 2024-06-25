import { TFiscalNoteStatus } from "./app/models/company";
import { goodDay } from "./app/services/validators";

const numberOnlyPlease = `Digite apenas números, por favor.`;

export const messages = {
  default: () =>
    `Olá, tudo bem? 😃\nAinda não estamos realizando atendimento via Whatsapp por este canal.\nCaso tenha alguma dúvida entre em contato com a central de ajuda pelo telefone disponibilizado na nota fiscal.`,
  welcome: () => `${goodDay()}, estamos aqui para te auxiliar.\n\n${menu()}`,
  menu,
  closeFlow: () =>
    `Agradecemos o seu contato.\n\nAtenciosamente equipe PixPay.`,

  learnAboutPixPay: () =>
    `Confira a plataforma PixPay clicando no link abaixo.\npixpay.digital`,
  questions: () =>
    `Para esclarecer qualquer dúvida, entre em contato através do número impresso em sua nota fiscal.`,
  chooseCompany: (list: string) =>
    `Deseja atendimento para qual empresa:\n\n${numberOnlyPlease}\n*0*: Digitar CNPJ da empresa\n${list}`,

  whatIsCnpj: () =>
    `Por favor, digite o CNPJ da empresa que você deseja consultar.`,
  invalidCnpj: () => `CNPJ inválido, tente novamente.`,
  unknownCnpj: () =>
    `O CNPJ fornecido não está cadastrado em nosso sistema. Por favor, verifique os dados e tente novamente.`,

  whatIsFiscalNumber: () => `Digite o número da nota fiscal:`,
  invalidFiscalNumber: () => `Número da nota fiscal inválido, tente novamente.`,
  selectedNote: (n: string, v: string, s: TFiscalNoteStatus) =>
    `A nota fiscal de número ${n}, de valor ${v} está ${fiscalNoteStatus[s]}.`,
  anotherNote: () =>
    `Deseja consultar outra nota fiscal?\n\n${numberOnlyPlease}\n*1*: Sim\n*2*: Não`,

  serverError: () =>
    `Opss! Parece que algo deu errado em nosso servidor. 😥\nTente novamente mais tarde.`,
  invalidStep: () =>
    `Opss! Parece que você está em um caminho sem saída. 🤔\nVou encerrar o atendimento por aqui, isso deve ajudar.`,
  invalidNumber: () =>
    `Parece que você não digitou um número válido. ${numberOnlyPlease}`,
  invalidOption: () =>
    `Parece que você não digitou uma opção válida. Tente novamente.`,
};

function menu() {
  return (
    `• Para verificar o status da nota fiscal, digite o número *1*.\n` +
    `• Digite o número *2* para conhecer o PixPay.\n` +
    `• Para esclarecer outras dúvidas, digite o número *3*.\n\n` +
    numberOnlyPlease
  );
}

const fiscalNoteStatus = {
  CANCELED: `cancelada 🔴`,
  "GENERATED QR CODE": `pendente 🔴`,
  "SEND QR CODE": `pendente 🔴`,
  PROCESSING: `pendente 🔴`,
  "PAID PIX": `paga 🟢`,
  "PAID DH": `paga em dinheiro 🟢`,
  ERROR: `pendente 🔴`,
  EXPIRED: `pendente 🔴`,
};
