import type { Context } from "hono";

type stateType = "success" | "error";

export const sendResponse = <T>(c: Context, exito: stateType, estado: number, mensaje: string, data: T) => {
  return c.json({
    exito,
    estado,
    mensaje,
    data
  })
}