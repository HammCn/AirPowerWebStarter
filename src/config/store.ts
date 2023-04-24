import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => ({
    hello: 'World',
  }),
  actions: {
    newWorld() {
      this.hello = 'new world'
    },
  },
})
