import { API_USER } from "@lib/api";
import { rest } from "msw";

const BE_URL = "http://co-editing_backend:8080";

export const handler = [
  rest.post(`${BE_URL}/${API_USER.LOGIN}`, (req, res, ctx) => {
    return res(
      ctx.json({
        access_token: "mock_access_token",
      })
    );
  }),

  rest.post(`${BE_URL}/${API_USER.REFRESH}`, (req, res, ctx) => {
    const refresh_token = req.credentials.split(" ")[1];
    return res(
      ctx.json({
        access_token: "new_access_token",
      })
    );
  }),
];
