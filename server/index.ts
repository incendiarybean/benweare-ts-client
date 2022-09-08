import http from "http";
import express from "express";
import { Server } from "socket.io";
import {
    contentHandler,
    headerHandler,
    routeHandler,
    socketHandler,
    validatorHandler,
} from "./handlers";

const app = express();

const HTTPServer = http
    .createServer(app)
    .listen(process.env.PORT || process.env.HTTPS || 8080, () => {
        console.log(`[${new Date()}] ENV: ${process.env.NODE_ENV}`);
        console.log(
            `[${new Date()}] Server is active on port: ${
                process.env.PORT || process.env.HTTPS || 8080
            }`
        );
    });

HTTPServer.on("error", (err: Error) => {
    console.log(`[${new Date()}] Server has failed to start.`);
    throw new Error(err.message);
});

export const IO = new Server(HTTPServer, {
    cors: {
        methods: ["GET"],
    },
});

// SET CORS RULES \\
if (process.env.NODE_ENV === "production") app.use(headerHandler);

// SET SOCKET \\
socketHandler();

// SET CONTENT RULES \\
app.use(contentHandler);

// VALIDATE ROUTE \\
app.use(validatorHandler);

// USE ROUTES \\
app.use(routeHandler);
