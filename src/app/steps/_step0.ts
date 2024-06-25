import { Client, Message } from "@open-wa/wa-automate";
import { IUser } from "../models/user";
import { updateUserStep } from "../services/user";
import { messages } from "../../messages";

export async function step0(client: Client, message: Message, user: IUser) {
  await client.sendText(message.from, messages.welcome());
  await updateUserStep(user.id, 1);
}
