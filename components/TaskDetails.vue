<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">{{ task.title }}</h2>
    <div>
      <input v-model.trim="editedTitle" type="text" placeholder="Task title" class="w-full mb-2 p-2 rounded-md">
      <textarea v-model.trim="editedDescription" placeholder="Task description" class="w-full mb-2 p-2 rounded-md"></textarea>
      <button @click="saveChanges" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Save Changes</button>
      <button @click="deleteTask" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete Task</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      editedTitle: this.task.title,
      editedDescription: this.task.description
    }
  },
  methods: {
    saveChanges() {
      this.$emit('update', { id: this.task.id, title: this.editedTitle, description: this.editedDescription })
      this.$router.push('/')
    },
    deleteTask() {
      if (confirm('Are you sure you want to delete this task?')) {
        this.$emit('delete', this.task.id)
        this.$router.push('/')
      }
    }
  }
}
</script>
