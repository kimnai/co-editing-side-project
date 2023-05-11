import { API_USER } from "@lib/api";
import { rest } from "msw";

const BE_URL = "http://localhost/backend";

export const handler = [
  rest.post(`http://localhost/backend/user/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie("refresh_token", "refresh_http_only_cookie", {
        expires: new Date("2024-5-11"),
        httpOnly: true,
      }),
      ctx.json(`access_token`)

      // ctx.json(
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NzBiMDg1YmY2NDliNzI2YjM1NzQ3NjQwMzBlMWJkZTlhMTBhZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODM2MTA0ODcsImF1ZCI6IjQ1NjU3MTgxMzg2MS03N2NjNGF2ZHYyYTVnZjBoaWIzdnVsc2Qwam9hdWh1cS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMTE0NDUyMTY4NDk1ODg3ODU5NyIsImVtYWlsIjoiYjA2MTA2MDM1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI0NTY1NzE4MTM4NjEtNzdjYzRhdmR2MmE1Z2YwaGliM3Z1bHNkMGpvYXVodXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoi5ZCz5qyj5qi6IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFlnalp4cy1FYjdtQlZ3RUNVSWRrdU5zY29TbUZCWWZUM2twNnNSPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iuaso-aouiIsImZhbWlseV9uYW1lIjoi5ZCzIiwiaWF0IjoxNjgzNjEwNzg3LCJleHAiOjE2ODM2MTQzODcsImp0aSI6ImJhYzhhNmM1ZjE3MGQ5MzA3NTRlYjM1MTU2ODM4NWRhNjkyMTU5ZjAifQ.T_zcPuoZSWOaEMnj_olwMSu6F_fDEPEIZgKjNHm-GsX5zI1_LZcsIVRNZTc3BPPTvLCGCnVf_s821nGZg64oGp9XmlQe0u4hehvsc6sbrp2k73-oG6-p5rxFX-WtF-pl5qCptv32D9p31DyisG-2ZGDTbnURsE19iMzel3aPmRSnnyDB7-eKNODpuMzMVXRNRbVvy5ZMG5mTrTh54QPXYvszIdIcHy-kz8Zg3Ic27pUS4O7T8NC8nLxYbNs8JAjifffW-ACRceaY79VA6ytzD9IVX7EblMsnjIJPIgQUSE-dJ5l4G6pfVk48qX8pnzeajLPZ3UUhUW3gFZ88xJ3sxA"
      // )
    );
  }),

  rest.post(`http://localhost/backend/user/create`, (req, res, ctx) => {
    return res(
      ctx.status(400)
      // ctx.json({
      //   status: 200,

      // })
    );
  }),

  rest.post(`http://localhost/backend/refresh`, (req, res, ctx) => {
    const cookies = req.cookies;
    console.log(cookies);
    const access_token = "updated_access_token";
    return res(
      ctx.json({
        access_token: access_token,
      })
    );
  }),

  rest.post("http://localhost/backend/resource", (req, res, ctx) => {
    return res(ctx.status(403));
  }),
];
