import { Client, Message } from "@open-wa/wa-automate";
import { IUser } from "../models/user";
import { step0 } from "./_step0";
import { step1 } from "./_step1";
import { step2 } from "./_step2";
import { step3 } from "./_step3";
import { step4 } from "./_step4";
import { step5 } from "./_step5";

interface ISteps {
  [key: number]: (client: Client, message: Message, user: IUser) => void;
}

export const steps: ISteps = {
  0: step0, // ? Início do atendimento
  1: step1, // ? Escolha (verificar status da nota, conhecer o PixPay, esclarecer dúvidas)
  2: step2, // ? Escolha de empresa ou digitar CNPJ
  3: step3, // ? Validação de CNPJ e Login
  4: step4, // ? Validação da nota fiscal
  5: step5, // ? Verificação se reinicia o fluxo ou termina
};
