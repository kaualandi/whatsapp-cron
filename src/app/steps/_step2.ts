import { Client, Message } from "@open-wa/wa-automate";
import { messages } from "../../messages";
import { IUser } from "../models/user";
import {
  getCompanyInfoByCellphone,
  tokenCompanyInfoSanitazer,
} from "../services/company";
import { updateUserData, updateUserStep } from "../services/user";

export async function step2(client: Client, message: Message, user: IUser) {
  const { from, body } = message;

  const phoneNumber = from.replace("@c.us", "").replace("55", "");
  const number = Number(body);
  if (isNaN(number)) {
    await client.sendText(from, messages.invalidNumber());
    return;
  }

  // ? Se for zero, ele pediu para digitar o CNPJ
  if (number === 0) {
    await client.sendText(from, messages.whatIsCnpj());
    await updateUserStep(user.id, 3);
    return;
  }

  // ? Re-listar as empresas vinculadas e verificar o ID da selecionada
  const companysByPhone = await getCompanyInfoByCellphone(phoneNumber).catch(
    (err) => {
      console.log(err);
      return {
        data: [],
      };
    }
  );

  if (!companysByPhone.data.length) {
    // ? Se não tiver empresas vinculadas, pedir CNPJ
    await client.sendText(from, messages.whatIsCnpj());
    await updateUserStep(user.id, 3);
    return;
  }

  // ? Se tiver empresas vinculadas lista-las e selecionar a escolhida
  const sanitizedList = tokenCompanyInfoSanitazer(companysByPhone.data);

  const selected = sanitizedList.find((c, i) => i + 1 === number);

  if (!selected) {
    await client.sendText(from, messages.invalidOption());
    return;
  }

  await updateUserData(user.id, "token", selected.token);
  await client.sendText(from, messages.whatIsFiscalNumber());
  await updateUserStep(user.id, 4);
}
