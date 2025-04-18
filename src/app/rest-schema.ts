import { z } from "zod";


export const newFolderSchema = z.object({
  name: z.string(),
  isOpen: z.boolean(),
})

export const idSchema = z.string()