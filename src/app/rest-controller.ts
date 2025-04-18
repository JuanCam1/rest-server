import { Hono } from "hono";
import { prisma } from "../util/prisma";
import { zValidator as zv } from '@hono/zod-validator';
import { validateErrorCatch } from "../util/validateError";
import { sendResponse } from "../util/sendResponse";
import { idSchema, newFolderSchema } from "./rest-schema";
import { capitalizeText } from "../util/capitalize";

const rest = new Hono();

// GET /rest -> Listar todos los folders
rest.get("/", async (c) => {
  try {
    const folders = await prisma.folder.findMany({
      select: {
        id: true,
        name: true,
        isOpen: true,
        requests: {
          select: {
            id: true,
            name: true,
            url: true,
            method: true,
            headers: {
              select: {
                key: true,
                value: true,
              }
            },
            body: true,
          }
        }
      }
    });

    return sendResponse<FolderTypeI[]>(
      c,
      "success",
      200,
      "Folders retrieved successfully",
      folders
    )
  } catch (error) {
    return validateErrorCatch(c, error);
  }
})

// POST /rest -> Crear un nuevo folder
rest.post("/", zv('json', newFolderSchema), async (c) => {
  try {
    const { name, isOpen } = c.req.valid("json");

    const folder = await prisma.folder.create({
      data: {
        name: capitalizeText(name),
        isOpen: isOpen,
      }
    });

    return sendResponse(
      c,
      "success",
      200,
      "Folder created successfully",
      folder
    )
  } catch (error) {
    return validateErrorCatch(c, error);
  }
})

// GET /rest/:id -> Obtener un folder
rest.get("/:id", zv("param", idSchema), async (c) => {
  try {
    const id = c.req.valid("param");
    const folder = await prisma.folder.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        isOpen: true,
        requests: {
          select: {
            id: true,
            name: true,
            url: true,
            method: true,
            headers: {
              select: {
                key: true,
                value: true,
              }
            },
            body: true,
          }
        }
      }
    });

    if (!folder) {
      return sendResponse<null>(
        c,
        "error",
        404,
        "Folder not found",
        null
      )
    }

    return sendResponse(
      c,
      "success",
      200,
      "Folder retrieved successfully",
      folder
    )
  } catch (error) {
    return validateErrorCatch(c, error);
  }
})



// // PUT /rest/:id -> Actualizar un folder
// rest.put("/:id", zv("param", idSchema), async (c) => {
//   try {
//     const id = c.req.valid("param");
//     const { name, isOpen } = c.req.valid("json");

//     const folder = await prisma.folder.update({
//       where: {
//         id: id
//       },
//       data: {
//         name: capitalizeText(name),
//         isOpen: isOpen,
//       }
//     });

//     return sendResponse(
//       c,
//       "success",
//       200,
//       "Folder updated successfully",
//       folder
//     )
//   } catch (error) {
//     return validateErrorCatch(c, error);
//   }
// })

// // DELETE /rest/:id -> Eliminar un folder
// rest.delete("/:id", zv("param", idSchema), async (c) => {
//   try {
//     const id = c.req.valid("param");

//     const folder = await prisma.folder.delete({
//       where: {
//         id: id
//       }
//     });

//     return sendResponse(
//       c,
//       "success",
//       200,
//       "Folder deleted successfully",
//       folder
//     )
//   } catch (error) {
//     return validateErrorCatch(c, error);
//   }
// })

// // GET /rest/:id/requests -> Obtener las requests de un folder
// rest.get("/:id/requests", zv("param", idSchema), async (c) => {
//   try {
//     const id = c.req.valid("param");
//     const requests = await prisma.request.findMany({
//       where: {
//         folderId: id
//       },
//       select: {
//         id: true,
//         name: true,
//         url: true,
//         method: true,
//         headers: {
//           select: {
//             key: true,
//             value: true,
//           }
//         },
//         body: true,
//       }
//     });

//     return sendResponse(
//       c,
//       "success",
//       200,
//       "Requests retrieved successfully",
//       requests
//     )
//   } catch (error) {
//     return validateErrorCatch(c, error);
//   }
// })

// // POST /rest/:id/requests -> Crear una request en un folder
// rest.post("/:id/requests", zv("param", idSchema), zv('json', newFolderSchema), async (c) => {
//   try {
//     const id = c.req.valid("param");
//     const { name, url, method, headers, body } = c.req.valid("json");

//     const request = await prisma.request.create({
//       data: {
//         name: capitalizeText(name),
//         url: url,
//         method: method,
//         headers: headers,
//         body: body,
//         folderId: id
//       }
//     });

//     return sendResponse(
//       c,
//       "success",
//       200,
//       "Request created successfully",
//       request
//     )
//   } catch (error) {
//     return validateErrorCatch(c, error);
//   }
// })

// // PUT /rest/:id/requests/:requestId -> Actualizar una request en un folder
// rest.put("/:id/requests/:requestId", zv("param", idSchema), zv("param", idSchema), zv('json', newFolderSchema), async (c) => {
//   try {
//     const id = c.req.valid("param");
//     const requestId = c.req.valid("param");
//     const { name, url, method, headers, body } = c.req.valid("json");

//     const request = await prisma.request.update({
//       where: {
//         id: requestId
//       },
//       data: {
//         name: capitalizeText(name),
//         url: url,
//         method: method,
//         headers: headers,
//         body: body,
//         folderId: id
//       }
//     });

//     return sendResponse(
//       c,
//       "success",
//       200,
//       "Request updated successfully",
//       request
//     )
//   } catch (error) {
//     return validateErrorCatch(c, error);
//   }
// })

// // DELETE /rest/:id/requests/:requestId -> Eliminar una request en un folder
// rest.delete("/:id/requests/:requestId", zv("param", idSchema), zv("param", idSchema), async (c) => {
//   try {
//     const id = c.req.valid("param");
//     const requestId = c.req.valid("param");

//     const request = await prisma.request.delete({
//       where: {
//         id: requestId
//       }
//     });

//     return sendResponse(
//       c,
//       "success",
//       200,
//       "Request deleted successfully",
//       request
//     )
//   } catch (error) {
//     return validateErrorCatch(c, error);
//   }
// })

export default rest;