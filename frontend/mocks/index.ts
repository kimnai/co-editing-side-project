import { worker } from "./browser";
import { server } from "./server";

// in responsible for figuring out whether to send data from server or brwoser
// window object only exists on browser
if (typeof window !== "undefined") {
  worker.start();
} else server.listen();
