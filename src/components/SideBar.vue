<template>
    <aside class="sidebar" :class="{ 'sidebar-active': isActive }">
      <div class="sidebar-section">
        <h2>Friends</h2>
        <ul>
          <li v-for="(friend, index) in friends" :key="index" @click="showProfileDetails(friend)">{{ friend.name }}</li>
        </ul>
      </div>
      <div class="sidebar-section">
        <h2>Requests</h2>
        <ul>
          <li v-for="(request, index) in friendRequests" :key="index" @click="showProfileDetails(request)">{{ request.name }}</li>
        </ul>
      </div>
      <div class="sidebar-section">
        <h2>Settings</h2>
        <ul>
          <li>Profile</li>
          <li>Privacy</li>
          <li>Account</li>
        </ul>
      </div>
      <router-link to="/newsfeed" class="newsfeed-link">Go to Newsfeed</router-link>
    </aside>
  </template>
  
  <script>
  export default {
    props: {
      isActive: {
        type: Boolean,
        default: false,
      },
      friends: {
        type: Array,
        default: () => [],
      },
      friendRequests: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      showProfileDetails(profile) {
        this.$emit('profile-clicked', profile);
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    overflow: hidden;
    background-color: #f0f2f5;
    padding: 20px;
  }
  
  .sidebar-active {
    width: 250px;
  }
  
  .sidebar-section {
    margin-bottom: 20px;
  }
  
  .sidebar-section h2 {
    margin-top: 0;
    font-size: 16px;
    color: #3b5998;
  }
  
  .sidebar-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar-section ul li {
    cursor: pointer;
    padding: 10px 0;
    font-size: 14px;
    color: #333;
  }
  
  .sidebar-section ul li:hover {
    background-color: #ddd;
  }
  
  .newsfeed-link {
    display: block;
    margin-top: 20px;
    color: #007bff;
    text-decoration: none;
  }
  
  .newsfeed-link:hover {
    text-decoration: underline;
  }
  </style>
  