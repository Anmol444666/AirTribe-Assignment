export default ({ store }) => {
    if (process.client) {
      window.onNuxtReady(() => {
        store.dispatch('loadTasks')
      })
    }
  }
  