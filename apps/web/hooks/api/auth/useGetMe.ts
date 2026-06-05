import { trpc } from "~/trpc/client"

export const useGetMe = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = trpc.auth.getMe.useQuery()

    return {
        user: data,
        isLoading,
        isError,
        error,
        refetch,
    }
}
