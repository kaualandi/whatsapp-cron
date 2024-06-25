import { Client, Message } from "@open-wa/wa-automate";
import { messages } from "../../messages";
import { IUser } from "../models/user";
import {
  getCompanyInfoByCellphone,
  tokenCompanyInfoSanitazer,
} from "../services/company";
import { updateUserStep } from "../services/user";
import { debounceTime } from "../services/utils";

const options = {
  1: async (client: Client, message: Message, user: IUser) => {
    const { from } = message;
    const phoneNumber = from.replace("@c.us", "").replace("55", "");

    // ? Verificar se o número é um entregador
    const companysByPhone = await getCompanyInfoByCellphone(phoneNumber).catch(
      (err) => {
        console.log(err);
        return {
          data: [],
        };
      }
    );

    if (!companysByPhone.data.length) {
      // ? Se não for ou for e não tiver empresas vinculadas, pedir CNPJ
      await client.sendText(from, messages.whatIsCnpj());
      await updateUserStep(user.id, 3);
      return;
    }

    // ? Se sim, e tiver empresas vinculadas selecionar uma das empresas
    const sanitizedList = tokenCompanyInfoSanitazer(companysByPhone.data);
    const list = sanitizedList.map((company, index) => {
      return `${index + 1} - ${company.name}`;
    });

    await client.sendText(from, messages.chooseCompany(list.join("\n")));
    await updateUserStep(user.id, 2);
    return;
  },

  2: async (client: Client, message: Message, user: IUser) => {
    const { from } = message;
    await client.sendText(from, messages.learnAboutPixPay());
    await debounceTime(2);
    await client.sendText(from, messages.menu());
    await updateUserStep(user.id, 0);
  },

  3: async (client: Client, message: Message, user: IUser) => {
    const { from } = message;
    await client.sendText(from, messages.questions());
    await debounceTime(2);
    await client.sendText(from, messages.menu());
    await updateUserStep(user.id, 0);
  },
};

export async function step1(client: Client, message: Message, user: IUser) {
  const { body } = message;

  const number = Number(body);
  if (isNaN(number)) {
    await client.sendText(message.from, messages.invalidNumber());
    return;
  }

  const option = options[number as keyof typeof options];
  if (!option) {
    await client.sendText(message.from, messages.invalidOption());
    return;
  }

  await option(client, message, user);
}
