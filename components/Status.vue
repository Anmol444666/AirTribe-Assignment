<template>
    <div class="w-1/3 p-4 border">
      <h2 class="text-lg font-bold">{{ status }} ({{ tasksByStatus.length }})</h2>
      <div class="mt-4" @drop="dropTask" @dragover.prevent>
        <Task v-for="task in tasksByStatus" :key="task.id" :task="task" @edit-task="editTask" @delete-task="deleteTask" @dragstart="dragStart(task, $event)"></Task>
      </div>
      <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showAddTaskModal = true">New Task</button>
  
      <!-- Add Task Modal -->
      <div v-if="showAddTaskModal" class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-lg font-bold mb-4">Add New Task</h2>
          <input v-model="newTask.title" type="text" class="border rounded w-full mb-2 p-2" placeholder="Title">
          <textarea v-model="newTask.description" class="border rounded w-full mb-4 p-2" placeholder="Description"></textarea>
          <div class="flex justify-end">
            <button @click="addTask" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add</button>
            <button @click="showAddTaskModal = false" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>
      
      <!-- Edit Task Modal -->
      <div v-if="showEditTaskModal" class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-lg font-bold mb-4">Edit Task</h2>
          <input v-model="editTaskData.title" type="text" class="border rounded w-full mb-2 p-2" placeholder="Title">
          <textarea v-model="editTaskData.description" class="border rounded w-full mb-4 p-2" placeholder="Description"></textarea>
          <div class="mb-4">
            <label for="editTaskStatus" class="block text-sm font-bold mb-2">Status:</label>
            <select v-model="editTaskData.status" id="editTaskStatus" class="border rounded w-full p-2">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="updateTask" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
            <button @click="showEditTaskModal = false" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>
  
      <!-- Delete Task Modal -->
      <div v-if="showDeleteTaskModal" class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-lg font-bold mb-4">Delete Task</h2>
          <p>Are you sure you want to delete this task?</p>
          <div class="flex justify-end mt-4">
            <button @click="confirmDeleteTask" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Delete</button>
            <button @click="showDeleteTaskModal = false" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>
  
      <!-- Add Status Button -->
      <button class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="showAddStatusModal = true">Add Status</button>
  
      <!-- Add Status Modal -->
      <div v-if="showAddStatusModal" class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-lg font-bold mb-4">Add New Status</h2>
          <input v-model="newStatus" type="text" class="border rounded w-full mb-2 p-2" placeholder="Status">
          <div class="flex justify-end">
            <button @click="addNewStatus" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add</button>
            <button @click="showAddStatusModal = false" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Task from '@/components/Task.vue'
  
  export default {
    props: ['status'],
    data() {
      return {
        showAddTaskModal: false,
        showEditTaskModal: false,
        showDeleteTaskModal: false,
        showAddStatusModal: false,
        newTask: {
          title: '',
          description: ''
        },
        editTaskData: {
          id: null,
          title: '',
          description: '',
          status: ''
        },
        newStatus: '',
        tasks: [],
        statuses: ['Todo', 'In Progress', 'Done'] // Define the statuses array
      }
    },
    components: {
      Task
    },
    created() {
      this.fetchTasks()
    },
    computed: {
      tasksByStatus() {
        return this.tasks.filter(task => task.status === this.status)
      }
    },
    methods: {
      fetchTasks() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
      },
      addTask() {
        if (!this.newTask.title.trim()) return
        const newTask = {
          id: Math.random().toString(36).substr(2, 9),
          title: this.newTask.title,
          description: this.newTask.description,
          status: this.status
        }
        this.tasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
        this.showAddTaskModal = false
      },
      editTask(taskId) {
        this.showEditTaskModal = true
        const taskToEdit = this.tasks.find(task => task.id === taskId)
        if (taskToEdit) {
          this.editTaskData = { ...taskToEdit }
        }
      },
      updateTask() {
  const index = this.tasks.findIndex(task => task.id === this.editTaskData.id);
  if (index !== -1) {
    // Remove task from current column
    const updatedTask = { ...this.editTaskData };
    this.tasks.splice(index, 1);
    
    // Update status and add task to the new column
    updatedTask.status = this.status;
    //console.log('Updated Task:', updatedTask);
    this.tasks.push(updatedTask);
    //console.log('Tasks:', this.tasks);
    
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.showEditTaskModal = false;
  }
},



      deleteTask(taskId) {
        this.showDeleteTaskModal = true
        this.editTaskData.id = taskId
      },
      confirmDeleteTask() {
        const index = this.tasks.findIndex(task => task.id === this.editTaskData.id)
        if (index !== -1) {
          this.tasks.splice(index, 1)
          localStorage.setItem('tasks', JSON.stringify(this.tasks))
          this.showDeleteTaskModal = false
        }
      },
      dropTask(event) {
        const taskId = event.dataTransfer.getData('taskId')
        const task = this.tasks.find(task => task.id === taskId)
        if (task) {
          task.status = this.status
          localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
      },
      dragStart(task, event) {
        event.dataTransfer.setData('taskId', task.id)
      },
      addNewStatus() {
        if (!this.newStatus.trim()) return
        // Avoid duplicates
        if (!this.statuses.includes(this.newStatus)) {
          this.statuses.push(this.newStatus) // Add the new status
          this.$emit('add-status', this.newStatus)
          this.showAddStatusModal = false
        }
      }
    }
  }
  </script>
  
  
  
  
  