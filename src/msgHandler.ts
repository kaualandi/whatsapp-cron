import { Client, Message } from "@open-wa/wa-automate";
import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "./app/models/user";
import { createUser, getUser, updateUserStep } from "./app/services/user";
import { steps } from "./app/steps";
import { messages } from "./messages";

export async function msgHandler(client: Client, message: Message) {
  const { from, body, sender } = message;

  if (!body) return;

  if (body === "!ping") {
    client.sendText(from, "pong");
    return;
  }

  // ? Check registered user
  let user = {} as AxiosResponse<IUser>;
  try {
    user = await getUser(from);
  } catch (error) {
    user = (error as AxiosError<IUser>).response!;
    console.log(user);

    if (!user || user.status !== 404) {
      return client.sendText(from, messages.serverError());
    }
    user = await createUser(from, sender.formattedName);
  }

  const step = user.data.step;

  if (steps[step]) {
    steps[step](client, message, user.data);
  } else {
    await client.sendText(from, messages.invalidStep());
    await updateUserStep(user.data.id, 0);
  }
}
