import { trpc } from "~/trpc/client"

export const useSignup = () => {
    const {
        mutateAsync: registerUserAsync,
        mutate: registerUser,
        error,
        isError,
        isIdle,
        isSuccess,
        status
    } = trpc.auth.registerUser.useMutation()

    return {
        registerUserAsync,
        registerUser,
        err: error,
        isError,
        isIdle,
        isSuccess,
        status
    }
}