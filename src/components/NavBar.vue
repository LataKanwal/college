<template>
  <nav v-if="isLoggedIn" class="navbar">
    <div class="navbar__left">
      <i class="fas fa-bars" @click="$emit('toggleSideNav')"></i>
      <router-link to="/" class="navbar__link">
        <HomeIcon class="icon" />
      </router-link>
      <router-link to="/videos" class="navbar__link">
        <VideoCameraIcon class="icon" />
      </router-link>
      <router-link to="/groups" class="navbar__link">
        <UserGroupIcon class="icon" />
      </router-link>
      <router-link to="/messages" class="navbar__link">
        <MailIcon class="icon" />
      </router-link>
      <NotificationDropdown />
    </div>
    <div class="navbar__search">
      <input type="text" v-model="searchQuery" placeholder="Search" @input="performSearch" />
    </div>
    <div class="navbar__right">
      <div class="navbar__profile-dropdown" @click="toggleDropdown">
        <img v-if="profileImageUrl" :src="profileImageUrl" alt="Profile Image" class="navbar__profile-img" />
        <div v-else class="navbar__profile-img-placeholder"></div>
        <div v-if="isDropdownOpen" class="navbar__dropdown-content" :class="{ 'dark-theme-content': isDarkTheme }">
          <div class="dropdown-item" @click="handleProfileClick">{{ userName }}</div>
          <div class="dropdown-item" @click="$emit('toggleSideNav')">Help & Support</div>
          <div class="dropdown-item" @click="$emit('toggleSideNav')">Settings</div>
          <div class="dropdown-item" @click="$emit('toggleSideNav')">Display</div>
          <div class="dropdown-item" @click="handleSignOut">Log Out</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { HomeIcon, VideoCameraIcon, UserGroupIcon, MailIcon } from '@heroicons/vue/outline';
import NotificationDropdown from './NotificationDropdown.vue'; 

const router = useRouter();
const isLoggedIn = ref(false);
const profileImageUrl = ref(null);
const userName = ref('');
const isDropdownOpen = ref(false);
const isDarkTheme = ref(false); // This prop should be passed from parent component
const searchQuery = ref('');

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
    if (user) {
      profileImageUrl.value = user.photoURL ? user.photoURL : null;
      userName.value = user.displayName ? user.displayName : 'User'; 
    }
  });
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleSignOut = () => {
  signOut(auth).then(() => {
    isLoggedIn.value = false;
    router.push("/sign-in");
  });
  toggleDropdown();
};

const handleProfileClick = () => {
  router.push("/profile");
  toggleDropdown();
};

const performSearch = () => {
  console.log('Performing search:', searchQuery.value);
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}


.navbar {
  position: fixed; /* Fixed position to stay at the top */
  top: 0;
  left: 0;
  width: 100%; /* Fill the entire width of the screen */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #cc7e4b;
  color: #fff;
  z-index: 1000;
}

.navbar__left {
  display: flex;
  align-items: center;
}

.navbar__link {
  margin-right: 20px; /* Adjust margin between links */
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
}

/* Profile dropdown */
.navbar__profile-dropdown {
  position: relative;
  margin-right: 20px; /* Adjust margin between profile dropdown and search */
}

.navbar__profile-img {
  width: 40px; /* Adjust size of profile image */
  height: 40px; /* Adjust size of profile image */
  border-radius: 50%;
  margin-right: 10px; /* Adjust margin between profile image and dropdown arrow */
  cursor: pointer;
  border: 2px solid #fff;
}

.navbar__profile-img-placeholder {
  width: 40px; /* Adjust size of placeholder */
  height: 40px; /* Adjust size of placeholder */
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px; /* Adjust margin between placeholder and dropdown arrow */
}

.navbar__dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  width: 300px; /* Increase the width */
  padding: 15px; /* Add padding */
  border-radius: 10px; /* Add border radius */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Add shadow */
  z-index: 1;
  right: 0;
  animation: fadeIn 0.3s ease-in-out; /* Add fade-in animation */
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.navbar__dropdown-content .dropdown-item {
  color: #333;
  padding: 15px 20px; /* Increase padding for items */
  cursor: pointer;
  border-radius: 8px; /* Add border radius to items */
  transition: background-color 0.3s ease; /* Add transition for hover effect */
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between text and action icon */
}

.navbar__dropdown-content .dropdown-item:hover {
  background-color: #f0f2f5;
}

.navbar__profile-dropdown:hover .navbar__dropdown-content {
  display: block;
}
dark-theme .navbar__dropdown-content {
  background-color: #222;
  color: #fff;
}

.dark-theme .navbar__dropdown-content .dropdown-item:hover {
  background-color: #444;
}

/* Large and attractive styles for dropdown */
.navbar__dropdown-content {
  width: 300px; /* Wider dropdown */
  padding: 20px; /* Add more padding */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Deeper shadow */
}

.navbar__dropdown-content .dropdown-item {
  padding: 15px 20px; /* More padding for each item */
  margin-bottom: 10px; /* Space between items */
  border-radius: 8px; /* Rounded corners for items */
  background-color: #f0f2f5; /* Light background for items */
}

.navbar__dropdown-content .dropdown-item:hover {
  background-color: #e4e6eb; /* Slightly darker on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.navbar__profile-dropdown:hover .navbar__dropdown-content {
  display: block; /* Show dropdown on hover */
}

/* Dark theme styles */
.dark-theme .navbar__dropdown-content {
  background-color: #242526; /* Dark background for dark theme */
  color: #fff; /* White text for dark theme */
}

.dark-theme .navbar__dropdown-content .dropdown-item {
  background-color: #3a3b3c; /* Darker background for items */
}

.dark-theme .navbar__dropdown-content .dropdown-item:hover {
  background-color: #4a4b4c; /* Slightly darker on hover */
}
/* Dark theme styles */
.dark-theme {
  background-color: #333;
  color: #fff;
}

/* Add styles for the sidenav overlay */
.sidenav-overlay {
  display: none; /* Hide the overlay by default */
}

.sidenav-open .sidenav-overlay {
  display: block; /* Show the overlay when the sidenav is open */
}

/* Adjust sidenav width and left position for smaller screens */
@media (max-width: 768px) {
  .navbar__link {
    margin-right: 10px; /* Reduce margin between links for smaller screens */
  }

  .navbar__profile-dropdown {
    margin-right: 10px; /* Reduce margin between profile dropdown and search for smaller screens */
  }
}


.navbar__profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid #fff;
}

.navbar__profile-img-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
}

.navbar__dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
}

.navbar__dropdown-content .dropdown-item {
  color: #333;
  padding: 12px 16px;
  cursor: pointer;
}

.navbar__dropdown-content .dropdown-item:hover {
  background-color: #f0f2f5;
}

.navbar__profile-dropdown:hover .navbar__dropdown-content {
  display: block;
}

/* Dark theme styles */
.dark-theme {
  background-color: #333;
  color: #fff;
}


/* Add styles for the sidenav overlay */
.sidenav-overlay {
  display: none; /* Hide the overlay by default */
}

.sidenav-open .sidenav-overlay {
  display: block; /* Show the overlay when the sidenav is open */
}

/* Adjust sidenav width and left position for smaller screens */
@media (max-width: 768px) {
  .sidenav {
    width: 80%; /* Reduce width for smaller screens */
  }

  .navbar__link {
    margin-right: 5px; /* Reduce margin between links for smaller screens */
  }

  .navbar__profile-dropdown {
    margin-right: 5px; /* Reduce margin between profile dropdown and search for smaller screens */
  }
}

.navbar__profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid #fff;
}

.navbar__profile-img-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
}

.navbar__dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
}

.navbar__dropdown-content .dropdown-item {
  color: #333;
  padding: 12px 16px;
  cursor: pointer;
}

.navbar__dropdown-content .dropdown-item:hover {
  background-color: #f0f2f5;
}

.navbar__profile-dropdown:hover .navbar__dropdown-content {
  display: block;
}

/* Dark theme styles */
.dark-theme {
  background-color: #333;
  color: #fff;
}


.dark-theme .navbar__profile-img-placeholder {
  background-color: #555;
}

.dark-theme .navbar__dropdown-content {
  background-color: #222;
  color: #fff;
}

.dark-theme .navbar__dropdown-content .dropdown-item:hover {
  background-color: #444;
}

.dark-theme .navbar__link {
  color: #fff;
}

.dark-theme-heading {
  color: #000; 
}

.theme-switch {
  display: flex;
  align-items: center;
}
.dark-slider {
  background-color: #ccc; 
}

.slider.round {
  background-color: #ccc; 
}

.dark-slider.round {
  background-color: #2196F3; 
}

.dark-theme-heading {
  color: #000; 
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Add styles for the sidenav overlay */
.sidenav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  transition: width 0.5s ease;
  pointer-events: none;
}

.sidenav-open {
  width: 100%;
  pointer-events: auto;
  
}

.sidenav {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  
  background-color: #fef8f8;
  z-index: 11;
  transition: left 0.5s ease;
}

.sidenav-open {
  left: 0;

}

/* Main content styles */
.main-content {
  transition: margin-center 0.5s ease;
}

.sidenav-open .main-content {
  margin-left: 0;
}

/* Close button styles */
.sidenav__close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #3b5998; /* Facebook blue */
  cursor: pointer;
}

/* Icon styles */
.icon {
  width: 24px;
  height: 24px;
  color: #fff;
  margin-right: 10px;
}
.navbar__search {
  flex: 1; /* Take up remaining space */
  display: flex;
  align-items: center;
}

.navbar__search input[type="text"] {
  width: 20%;
  padding: 8px 12px; /* Adjust padding */
  border: 1px solid #dfe1e5; /* Adjust border color */
  border-radius: 25px; /* Make the border more rounded */
  background-color: #f0f2f5; /* Set background color */
  outline: none;
}

/* Placeholder text color */
.navbar__search input[type="text"]::placeholder {
  color: #9a9a9a;
}

/* Icon styles (optional) */
.navbar__search .search-icon {
  margin-right: 8px; /* Adjust spacing */
  color: #9a9a9a; /* Icon color */
}


</style>