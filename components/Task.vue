<template>
  <div class="bg-gray-200 p-2 mt-2" draggable="true" @dragstart="dragStart">
    <h3 class="text-sm font-bold">{{ task.title }}</h3>
    <p class="text-xs">{{ task.description }}</p>
    <div class="mt-2">
      <button @click="editTask">Edit</button>
      <button @click="deleteTask">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    editTask() {
      this.$emit('edit-task', this.task.id)
    },
    deleteTask() {
      this.$emit('delete-task', this.task.id)
    },
    dragStart(event) {
      event.dataTransfer.setData('taskId', this.task.id)
    }
  }
}
</script>



  