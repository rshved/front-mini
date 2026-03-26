import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
    state: () => ({
        currentScreen: 'home'
    }),
    actions: {

    }
})