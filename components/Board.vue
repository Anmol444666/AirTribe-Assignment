<template>
  <div class="flex">
    <!-- Status columns -->
    <div v-for="(status, index) in statuses" :key="index" class="flex-1 p-4">
      <h2 class="text-lg font-semibold mb-4">{{ status }} ({{ tasksByStatus(status).length }})</h2>
      <!-- Display tasks in each status column -->
      <div v-if="tasksByStatus(status).length === 0" class="text-gray-500">No tasks</div>
      <draggable v-else class="task-list" :element="'div'" :options="dragOptions" :list="tasksFilteredByStatus(status)" @end="onDragEnd">
        <div v-for="task in tasksFilteredByStatus(status)" :key="task.id" class="task">
          <Task :task="task" @update="updateTask" @delete="deleteTask" />
        </div>
      </draggable>
      <!-- Form to add new task -->
      <NewTaskForm @add="addTask(index)" :status="status" />
    </div>
    <!-- Form to add new status -->
    <div class="flex-1 p-4">
      <input v-model.trim="newStatus" type="text" placeholder="New Status" class="w-full mb-2 p-2 rounded-md">
      <button @click="addStatus" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Status</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import Task from '~/components/Task.vue'
import NewTaskForm from '~/components/NewTaskForm.vue'

export default {
  components: {
    draggable,
    Task,
    NewTaskForm
  },
  computed: {
    ...mapState(['tasks']),
    statuses() {
      return ['Todo', 'In Progress', 'Done']
    }
  },
  data() {
    return {
      newStatus: '',
      dragOptions: {
        animation: 150,
        group: 'tasks',
        handle: '.task-handle'
      }
    }
  },
  methods: {
    tasksByStatus(status) {
      return this.tasks.filter(task => task.status.toLowerCase() === status.toLowerCase())
    },
    tasksFilteredByStatus(status) {
      return this.tasksByStatus(status).map(task => ({ ...task }))
    },
    addTask(index) {
      const task = {
        id: Math.floor(Math.random() * 1000),
        title: '',
        description: '',
        status: this.statuses[index]
      }
      this.$store.commit('addTask', task)
    },
    updateTask(task) {
      this.$store.commit('updateTask', task)
    },
    deleteTask(id) {
      this.$store.commit('deleteTask', id)
    },
    addStatus() {
      if (this.newStatus.trim() !== '') {
        this.statuses.push(this.newStatus.trim())
        this.newStatus = ''
      }
    },
    onDragEnd(event) {
      // Handle drag end event if needed
      console.log(event)
    }
  }
}
</script>

<style>
.task-list {
  list-style: none;
  padding: 0;
}

.task {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
}
</style>



  
  
  