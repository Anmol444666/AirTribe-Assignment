export const state = () => ({
  tasks: []
})

export const mutations = {
  addTask(state, task) {
    state.tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  updateTask(state, updatedTask) {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id)
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  deleteTask(state, id) {
    const index = state.tasks.findIndex(task => task.id === id)
    if (index !== -1) {
      state.tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  loadTasks(state) {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      state.tasks = JSON.parse(savedTasks)
    }
  }
}


  