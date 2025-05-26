import { createServer } from "http";
import app from "./app.js";

const server = createServer(app);

server.listen(5000, () => console.log("Server listening port 5000..."));