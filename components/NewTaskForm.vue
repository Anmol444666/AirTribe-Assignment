<template>
  <div class="p-4 mb-4 bg-gray-100 rounded-md">
    <form @submit.prevent="addTask">
      <input v-model.trim="title" type="text" placeholder="Task title" class="w-full mb-2 p-2 rounded-md">
      <textarea v-model.trim="description" placeholder="Task description" class="w-full mb-2 p-2 rounded-md"></textarea>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['status'],
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addTask() {
      const task = {
        id: Math.floor(Math.random() * 1000),
        title: this.title,
        description: this.description,
        status: this.status
      }
      this.$emit('add', task)
      this.title = ''
      this.description = ''
    }
  }
}
</script>


  