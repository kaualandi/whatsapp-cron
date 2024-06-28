import { Client, ContactId } from "@open-wa/wa-automate";
import { Request, Response } from "express";

export function routerOutlet(app: any, client: Client) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      worked: true,
      detail: "Servidor funcionando!",
      version: "1.2.0",
    });
  });

  app.post("/send-texts-images", async (req: Request, res: Response) => {
    const { messages, number } = req.body;
    const isoDate = new Date().toLocaleString();

    console.log("- massiva --------------------------");

    const invalidParams = {
      worked: false,
      detail: "Parâmetros inválidos! Siga o exemplo abaixo",
      example: {
        number: "5511999999999",
        messages: [
          {
            type: "image",
            image: "Imagem em base64",
            message: "",
          },
          {
            type: "text",
            image: "",
            message: "Hello world!",
          },
        ],
      },
    };
    if (!messages?.length || !number) {
      console.log(`${isoDate} - Parâmetros inválidos!`);
      res.status(400).json(invalidParams);
      return;
    }

    const validadeMessagesData = messages.every((message: any) => {
      if (message.type === "text") {
        return !!message.message;
      } else if (message.type === "image") {
        return message.image;
      }
    });

    if (!validadeMessagesData) {
      res.status(400).json(invalidParams);
      console.log(`${isoDate} - Parâmetros inválidos!`);
      return;
    }

    const userHasWA = await client.checkNumberStatus(
      `${number}@c.us` as ContactId
    );

    if (userHasWA.status != 200) {
      console.log(`${isoDate} - Usuário ${number} não possui WhatsApp!`);
      res.status(400).json({
        worked: false,
        detail: "O número informado não possui WhatsApp!",
        response: userHasWA,
        messages,
        number,
      });
      return;
    }

    const sendedMessages = [];

    for (const message of messages) {
      let sended;

      try {
        if (message.type === "image") {
          sended = await client.sendImage(
            `${number}@c.us`,
            message.image,
            "image",
            message.message || "",
            undefined,
            true
          );
        } else if (message.type === "text") {
          sended = await client.sendText(`${number}@c.us`, message.message);
        }

        sendedMessages.push(sended);
      } catch (error) {
        sendedMessages.push(error);
      }
    }

    console.log(sendedMessages);

    const errorQuantity = sendedMessages.filter((message: any) => {
      if (message.toString().startsWith("true")) {
        return false;
      }
      return true;
    }).length;

    if (errorQuantity) {
      console.log(`${isoDate} - Erro ao enviar mensagem!`);
      res.status(400).json({
        worked: false,
        detail: `Erro ao enviar ${errorQuantity} de ${messages.length}!`,
        response: sendedMessages,
        messages,
        number,
      });
      return;
    }

    console.log(`${isoDate} - Mensagem enviada com sucesso!`);
    res.status(200).json({
      worked: true,
      detail: `Mensagens enviadas com sucesso!`,
      response: sendedMessages,
      messages,
      number,
    });
  });

  app.post("/send-text", async (req: Request, res: Response) => {
    const { message, number, image } = req.body;
    const isoDate = new Date().toLocaleString();

    console.log("- única --------------------------");

    if (!message || !number) {
      res.status(400).json({
        worked: false,
        detail: "Parâmetros inválidos! Siga o exemplo abaixo",
        example: {
          message: "Olá, tudo bem?",
          number: "5511999999999",
          image: "Imagem em base64 (opicional)",
        },
      });
      console.log(`${isoDate} - Parâmetros inválidos!`);
      return;
    }

    console.log("Verificando se o número possui WhatsApp...");
    const userHasWA = await client.checkNumberStatus(
      `${number}@c.us` as ContactId
    );
    console.log("Verificação concluída!");

    if (userHasWA.status != 200) {
      console.log(`${isoDate} - Usuário ${number} não possui WhatsApp!`);
      res.status(400).json({
        worked: false,
        detail: "O número informado não possui WhatsApp!",
        response: userHasWA,
        message,
        number,
      });
      return;
    }

    console.log("Usuário possúi WhatsApp!");

    let sended;

    if (image) {
      console.log("Enviando mensagem com imagem e texto...");
      sended = await client.sendImage(
        `${number}@c.us`,
        image,
        "image",
        message
      );
      console.log("Mensagem enviada!");
    } else {
      console.log("Enviando mensagem somente com texto...");
      sended = await client.sendText(`${number}@c.us`, message);
      console.log("Mensagem enviada!");
    }

    console.log("Resposta do envio:", sended);

    if (!sended.toString().startsWith("true")) {
      console.log(`${isoDate} - Erro ao enviar mensagem para ${number}!`);
      res.status(400).json({
        worked: false,
        detail: "Erro ao enviar mensagem!",
        response: sended,
        message,
        number,
      });
    } else {
      console.log(`${isoDate} - Mensagem enviada com sucesso para ${number}!`);
      res.status(200).json({
        worked: true,
        detail: "Mensagem enviada com sucesso!",
        response: sended,
        message,
        number,
      });
    }
  });
}
