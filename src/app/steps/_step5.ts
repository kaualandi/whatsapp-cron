import { Client, Message } from "@open-wa/wa-automate";
import { messages } from "../../messages";
import { IUser } from "../models/user";
import { updateUserStep } from "../services/user";

const options = {
  1: async (client: Client, message: Message, user: IUser) => {
    const { from } = message;
    await client.sendText(from, messages.whatIsFiscalNumber());
    await updateUserStep(user.id, 4);
  },
  2: async (client: Client, message: Message, user: IUser) => {
    const { from } = message;
    await client.sendText(from, messages.closeFlow());
    await updateUserStep(user.id, 0);
  },
};

export async function step5(client: Client, message: Message, user: IUser) {
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
