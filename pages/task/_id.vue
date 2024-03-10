<template>
  <div class="container mx-auto">
    <div class="p-4 border">
      <h2 class="text-lg font-bold">{{ task.title }}</h2>
      <p class="text-sm mb-4">{{ task.status }}</p>
      <p>{{ task.description }}</p>
      <button class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteTask">Delete Task</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: null
    }
  },
  async mounted() {
    this.fetchTask()
  },
  methods: {
    async fetchTask() {
      const taskId = this.$route.params.id
      const tasks = JSON.parse(localStorage.getItem('tasks')) || []
      this.task = tasks.find(task => task.id === taskId)
    },
    deleteTask() {
      const taskId = this.$route.params.id
      let tasks = JSON.parse(localStorage.getItem('tasks')) || []
      tasks = tasks.filter(task => task.id !== taskId)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.$router.push({ name: 'index' })
    }
  }
}
</script>


  