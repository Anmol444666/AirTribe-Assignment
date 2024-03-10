<template>
  <div class="container mx-auto">
    <div class="flex">
      <client-only>
        <Status v-for="(status, index) in statuses" :key="index" :status="status" @add-status="updateStatuses"></Status>
      </client-only>
    </div>
  </div>
</template>

<script>
import Status from '@/components/Status.vue';

export default {
  components: {
    Status
  },
  data() {
    return {
      statuses: ['Todo', 'In Progress', 'Done'] // Initialize with default statuses
    };
  },
  methods: {
    updateStatuses(newStatus) {
      this.statuses.push(newStatus);
    }
  }
};
</script>







