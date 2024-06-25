import { Client, Message } from "@open-wa/wa-automate";
import { messages } from "../../messages";
import { IUser } from "../models/user";
import { getInvoiceByNumber } from "../services/company";
import { updateUserStep } from "../services/user";
import { debounceTime, toBRL } from "../services/utils";

export async function step4(client: Client, message: Message, user: IUser) {
  const { from, body } = message;

  if (body === "0") {
    await client.sendText(from, messages.menu());
    await updateUserStep(user.id, 1);
    return;
  }

  // ? get fiscal note
  const fiscalNote = await getInvoiceByNumber(user, body).catch((err) => {
    console.log(err);
    return undefined;
  });

  if (!fiscalNote) {
    // ? fiscal number not found
    await client.sendText(from, messages.invalidFiscalNumber());
    return;
  }

  await client.sendText(
    from,
    messages.selectedNote(
      fiscalNote.data.nfe_number,
      toBRL(fiscalNote.data.value),
      fiscalNote.data.status
    )
  );
  await debounceTime(2);
  await client.sendText(from, messages.anotherNote());
  await updateUserStep(user.id, 5);
}
