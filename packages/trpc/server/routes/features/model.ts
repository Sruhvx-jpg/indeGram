import { z } from "zod";

export const addToContactInput = z.object({
    ownerId: z.string().uuid(),
    phoneNumber: z.string().trim().min(1),
})

export const addToContactOutput = z.object({
    message: z.string()
});

export const listContactsInput = z.object({
    phoneNumber: z.string()
})

export const listContactsOutput = z.object({
    phoneNumber: z.string(),
    fullName: z.string(),
    profileImageUrl: z.string().optional(),
    lastSeen: z.string().optional()
})

