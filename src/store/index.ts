import { create } from 'zustand'

interface GameStore {
    user: string;
    setUser: (newUser:string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    user: '',
    setUser: (newUser: string) => set({user: newUser})
}))
