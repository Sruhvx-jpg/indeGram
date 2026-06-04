import { trpc } from "~/trpc/client"

export const useLogin = () => {
    const {
        mutateAsync: loginUserAsync,
        mutate: loginUser,
        error,
        isError,
        isIdle,
        isSuccess,
        status
    } = trpc.auth.logIn.useMutation()

    return {
        loginUserAsync,
        loginUser,
        err: error,
        isError,
        isIdle,
        isSuccess,
        status
    }
}