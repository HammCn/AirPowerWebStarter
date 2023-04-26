import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => ({
    hello: 'World',
  }),
  actions: {
    newHello() {
      this.hello = 'new world'
    },
  },
})
