import { z } from "zod";

export const formSchema = z.object({
    username: z.string(),
    password: z.string(),
})