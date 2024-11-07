import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import prisma from "@/lib/prisma";


type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  
  if (!res.socket.server.io) {
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Usuário conectado ao WebSocket");

      socket.on("send-message", async (data) => {
        const { conversationId, senderId, text } = data;

       
        const message = await prisma.message.create({
          data: {
            conversationId,
            senderId,
            text,
          },
        });

        
        io.emit(`receive-message-${conversationId}`, message);
      });

      socket.on("disconnect", () => {
        console.log("Usuário desconectado do WebSocket");
      });
    });
  }

  
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default SocketHandler;
