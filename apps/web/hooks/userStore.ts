import {create} from "zustand"

type User = {
  userId: string;
  fullName: string;
  phoneNumber: string;
};
// userId: string; fullName: string; phoneNumber: string 

type userStore = {
    user: User | null
    setUser: (user: User | null) => void
}

export const useUserStore = create<userStore>((set) => ({
    user:  null,
    setUser: (user) => set({user})}
))