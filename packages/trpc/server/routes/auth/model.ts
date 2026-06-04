import { z } from "zod"


export const registerUserInputModel = z.object({
    fullName: z.string().describe("user's full name"),
    phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "invalid phone number or country code").describe("user phone number"),
    password: z.string().max(40, { message: "password should have less than 40 chracters" }),
    accountType: z.enum(["personal", "bussiness"]),
    email: z.string().optional().describe("user's email (optional)")
})

export const registerUserOutputModel = z.object({
    id: z.string().describe("user's id")
})

export const logInInputModel = z.object({
    phoneNumber: z.string().describe("user's phone number"),
    password: z.string(),
})

export const logInOutputModel = z.object({
    userId: z.string().describe("user's id"),
    fullName: z.string().describe("user's fullname"),
    phoneNumber: z.string().describe("user's phone number") ,
})