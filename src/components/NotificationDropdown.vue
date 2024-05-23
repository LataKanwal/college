<template>
  <div class="notification-dropdown">
    <BellIcon class="icon" @click="toggleDropdown" />
    <div v-if="showDropdown" class="dropdown-content">
      <div v-for="notification in notifications" :key="notification.id" class="notification">
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BellIcon } from '@heroicons/vue/outline';

const notifications = ref([
  { id: 1, message: 'New message from John' },
  { id: 2, message: 'Your order has been shipped' },
  { id: 3, message: 'Update your profile information' },
]);

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>

<style scoped>
.notification-dropdown {
  position: relative;
  cursor: pointer;
}

.icon {
  width: 40px;
  height: 40px;
  color: black;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  min-width: 160px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.notification {
  padding: 8px 12px;
  cursor: pointer;
}

.notification:hover {
  background-color: #ddd;
}
</style>
