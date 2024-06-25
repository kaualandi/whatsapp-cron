import { Client, Message } from "@open-wa/wa-automate";
import { messages } from "../../messages";
import { IUser } from "../models/user";
import { getCompanyInfoByCnpj } from "../services/company";
import { updateUserData, updateUserStep } from "../services/user";
import { isCnpj } from "../services/validators";

export async function step3(client: Client, message: Message, user: IUser) {
  const { from, body } = message;

  if (!isCnpj(body)) {
    await client.sendText(from, messages.invalidCnpj());
    return;
  }

  // ? get da company pelo cnpj
  const company = await getCompanyInfoByCnpj(body).catch((err) => {
    console.log(err);
    return undefined;
  });

  if (!company) {
    // ? company not found
    await client.sendText(from, messages.unknownCnpj());
    return;
  }

  await updateUserData(user.id, "token", company.data.token);
  await client.sendText(from, messages.whatIsFiscalNumber());
  await updateUserStep(user.id, 4);
}
