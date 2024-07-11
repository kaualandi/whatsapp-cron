import { ChatId } from "@open-wa/wa-automate";

export interface ISchedule {
  id: number;
  body: string;
  image: string;
  time: string;
  chatId: ChatId;
}
