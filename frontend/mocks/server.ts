import { setupServer } from "msw/node";
import { handler } from "./handler";

export const server = setupServer(...handler);

server.listen({
  onUnhandledRequest(request, print) {
    console.log(request.method, request);
  },
});

// server.printHandlers();
