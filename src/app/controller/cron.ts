import { Client } from "@open-wa/wa-automate";
import { CronJob } from "cron";
import axios from "./axios";
import { ISchedule } from "../models/schedule";

export function cronRegister(client: Client) {
  const job = new CronJob(
    "0 * * * * *",
    async () => {
      const now = new Date();
      const dateISO = getISO(now);

      console.log("\n====================================\n");
      console.log("VERIFICANDO ==>", now.toLocaleString());
      console.log("ISO ==>", dateISO);

      const { data: schedules } = await axios.get<ISchedule[]>("/schedules");
      if (!schedules.length) {
        console.log("MENHUMA MENSAGEM AGENDADA!");
        return;
      }

      const schedulesToSend = schedules.filter((schedule) => {
        if (schedule.time === dateISO) {
          return schedule;
        }
      });

      if (!schedulesToSend.length) {
        console.log("NENHUMA MENSAGEM PARA ESSE HORÁRIO!");
        return;
      }

      console.log("MENSAGENS PARA ENVIAR ==>", schedulesToSend.length);

      for (const schedule of schedulesToSend) {
        try {
          if (schedule.image) {
            await client.sendImage(
              schedule.chatId,
              schedule.image,
              "imagem agendada",
              schedule.body
            );
          } else {
            await client.sendLinkWithAutoPreview(
              schedule.chatId,
              schedule.body
            );
          }
          console.log("ENVIADO PARA ==>", schedule.chatId);
          await axios.delete(`/schedules/${schedule.id}`);
        } catch (error) {
          console.log("ERRO AO ENVIAR PARA ==>", schedule.chatId);
          await axios.post("/errors", {
            chatId: schedule.chatId,
            time: dateISO,
            message: error,
          });
        }
      }
    },
    null,
    true,
    "America/Sao_Paulo"
  );

  return job;
}

function getISO(now: Date) {
  const [day, month, year] = now.toLocaleDateString().split("/");
  const [hours, minutes, seconds] = now.toLocaleTimeString().split(":");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
