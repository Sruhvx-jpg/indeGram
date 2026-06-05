import z from "zod"

export const addToContactInput = z.object({
    phoneNumber: z.string().describe("phone number to search new contact for"),
    ownerId: z.string().describe("contact table's owner id")
}) 
export type addToContactType = z.infer<typeof addToContactInput>