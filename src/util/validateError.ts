import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientRustPanicError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { SendResponse } from "./sendResponse";
import { z } from "zod";

export const validateErrorCatch = (error: unknown) => {
	console.error("✖️", error);
	if (error instanceof PrismaClientKnownRequestError) {
		if (error.code === "P2002") {
			return new SendResponse<null>(
				"error",
				409,
				"Violación de unicidad en la base de datos",
				null,
			);
		}
		if (error.code === "P2025") {
			return new SendResponse<null>(
				"error",
				404,
				"Registro no encontrado",
				null,
			);
		}
		return new SendResponse<null>(
			"error",
			400,
			"Error conocido en la base de datos",
			null,
		);
	}

	if (error instanceof PrismaClientValidationError) {
		return new SendResponse<null>(
			"error",
			400,
			"Error de validación en la consulta de base de datos",
			null,
		);
	}

	if (error instanceof PrismaClientInitializationError) {
		return new SendResponse<null>(
			"error",
			500,
			"Error al conectar con la base de datos",
			null,
		);
	}

	if (error instanceof PrismaClientRustPanicError) {
		return new SendResponse<null>(
			"error",
			500,
			"Error crítico en el motor de base de datos",
			null,
		);
	}

	if (error instanceof z.ZodError) {
		return new SendResponse("error", 404, "Datos inválidos", null);
	}

	return new SendResponse<null>(
		"error",
		500,
		"Error en servicio de base de datos",
		null,
	);
};
