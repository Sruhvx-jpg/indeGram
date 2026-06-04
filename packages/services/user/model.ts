import { maxLength, z } from "zod";
 
//===========================================================================================================================
export const registerInput = z.object({
  fullName: z.string().describe("user's full name"),
  phoneNumber: z.string().max(17, {message: "not a valid phone number"}).describe("user phone number") ,
  password: z.string().max(40, {message: "password should have less than 40 chracters"}),
  accountType: z.enum(["personal", "bussiness"]),
  email: z.string().optional().describe("user's email (optional)")
})
export type registerInputType = z.infer<typeof registerInput>

//===========================================================================================================================
export const registerUserWithEmailInput  = z.object({
  fullName: z.string().describe("user's full name"),
  phoneNumber: z.string().max(17, {message: "not a valid phone number"}).describe("user phone number") ,
  password: z.string(),
  accountType: z.enum(["personal", "bussiness"]),
  email: z.string().describe("user's email")
})
export type registerUserWithEmailInputType = z.infer<typeof registerUserWithEmailInput>

//===========================================================================================================================
export const registerUserWithoutEmailInput  = z.object({
  fullName: z.string().describe("user's full name"),
  phoneNumber: z.string().max(17, {message: "not a valid phone number"}).describe("user phone number") ,
  password: z.string(),
  accountType: z.enum(["personal", "bussiness"]),
})
export type registerUserWithoutEmailInputType = z.infer<typeof registerUserWithoutEmailInput>

//===========================================================================================================================
export const userInsertOutputInput = z.object({
  fullName: z.string().describe("user's full name"),
  phoneNumber: z.string().max(17, {message: "not a valid phone number"}).describe("user phone number") ,
  password: z.string(),
  accountType: z.enum(["personal", "bussiness"]),
  email: z.string().optional().describe("user's email")
})
export type userInsertOuputInputType = z.infer<typeof userInsertOutputInput>

//===========================================================================================================================
export const logInInput = z.object({
  phoneNumber: z.string().describe("user's phone number"),
  password: z.string(),
})
export type logInInputType = z.infer<typeof logInInput>




