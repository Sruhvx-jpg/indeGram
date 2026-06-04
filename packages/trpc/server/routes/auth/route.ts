import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { generatePath } from "../../utils/path-generator";
import { logInInputModel, logInOutputModel, registerUserInputModel, registerUserOutputModel } from "./model";
import { userService } from "../../services"
import { setAuthToken } from "../../utils/cookie";



const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
    //==================================================== register router =============================================
    registerUser: publicProcedure.meta({
        openapi: {
            method: 'POST',
            path: getPath('/register'),
            tags: TAGS
        }
    }).input(registerUserInputModel).output(registerUserOutputModel).mutation(async ({ input }) => {
        try {
            const { fullName, phoneNumber, password, accountType, email, } = input

            const { id }: any = await userService.Register({ fullName, phoneNumber, password, accountType, email, })

            return {
                id
            }
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "Registration failed",
            })
        }
    }),

    //===================================================== login router =====================================================
    logIn: publicProcedure.meta({
        openapi: {
            method: 'POST',
            path: getPath('/login'),
            tags: TAGS
        }
    }).input(logInInputModel).output(logInOutputModel).mutation(async ({ input, ctx }) => {
        try {
            const result = await userService.logIN(input)

            setAuthToken(ctx, result.accessToken)
            ctx.createCookie("refresh_token", result.refreshToken)

            
            const{userId, fullName, phoneNumber } = result
            return {
                userId,
                fullName, phoneNumber
            }
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "Login failed",
            })
        }
    })
})