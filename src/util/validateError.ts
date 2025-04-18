import type { Context } from "hono";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { z } from "zod";
import { sendResponse } from "./sendResponse";

export const validateErrorCatch = (c: Context, error: unknown) => {
  console.error("✖️", error);
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return sendResponse<null>(
        c,
        "error",
        409,
        "Violación de unicidad en la base de datos",
        null,
      );
    }
    if (error.code === "P2025") {
      return sendResponse<null>(
        c,
        "error",
        404,
        "Registro no encontrado",
        null,
      );
    }
    return sendResponse<null>(
      c,
      "error",
      400,
      "Error conocido en la base de datos",
      null,
    );
  }

  if (error instanceof PrismaClientValidationError) {
    return sendResponse<null>(
      c,
      "error",
      400,
      "Error de validación en la consulta de base de datos",
      null,
    );
  }

  if (error instanceof PrismaClientInitializationError) {
    return sendResponse<null>(
      c,
      "error",
      500,
      "Error al conectar con la base de datos",
      null,
    );
  }

  if (error instanceof PrismaClientRustPanicError) {
    return sendResponse<null>(
      c,
      "error",
      500,
      "Error crítico en el motor de base de datos",
      null,
    );
  }

  if (error instanceof z.ZodError) {
    return sendResponse(c, "error", 404, "Datos inválidos", null);
  }

  return sendResponse<null>(
    c,
    "error",
    500,
    "Error en servicio de base de datos",
    null,
  );
};
