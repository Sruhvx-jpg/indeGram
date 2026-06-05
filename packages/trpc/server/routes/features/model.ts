import { z } from "zod";

export const addToContactInput = z.object({
    ownerId: z.string().uuid(),
    phoneNumber: z.string().trim().min(1),
})

export const addToContactOutput = z.object({
    message: z.string()
});

