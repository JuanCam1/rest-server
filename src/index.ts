import { Hono } from "hono";
import { cors } from "hono/cors";
import rest from "./app/rest-controller";

const app = new Hono();
app.use("/api/*", cors());

app.route("/rest", rest)
export default app;
