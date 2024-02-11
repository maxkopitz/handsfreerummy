import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL);

export const SocketEvents = {
    GAME_CREATED: "GAME_CREATED",
    CREATE_GAME: "CREATE_GAME",
}
