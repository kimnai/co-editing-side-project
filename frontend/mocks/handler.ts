import { API_USER } from "@lib/api/Auth";
import { rest } from "msw";
import { sign } from "jsonwebtoken";

export const BE_URL = "http://co-editing_backend:8080";

export const handler = [
  rest.post(`${BE_URL}/${API_USER.LOGIN}`, (req, res, ctx) => {
    const data = {
      email: "abc@gmail.com",
      password: "lydiaWu12345",
    };
    const jwt = sign(data, "test-secret", { expiresIn: "3m" });
    return res(
      ctx.status(200),
      ctx.json({
        access_token: jwt,
        refresh_token: "mock_refresh_token",
      })
    );
  }),

  rest.post(`${BE_URL}/${API_USER.REFRESH}`, (req, res, ctx) => {
    const refresh_token = req.credentials.split(" ")[1];

    const data = {
      email: "abc@gmail.com",
      password: "lydiaWu12345",
    };
    const jwt = sign(data, "test-secret", { expiresIn: "3m" });

    return res(
      ctx.status(200),
      ctx.json({
        access_token: jwt,
        refresh_token: refresh_token,
      })
    );
  }),
];
