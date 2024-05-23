<template>
<<<<<<< HEAD
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <Navbar @toggleSideNav="toggleSideNav"/>
    <div class="sidenav-overlay" :class="{ 'sidenav-open': isSideNavOpen }" @click="toggleSideNav"></div>
    <div class="sidenav" :class="{ 'sidenav-open': isSideNavOpen }">
      <div class="sidenav__content">
        <h2 class="dark-theme-heading">Dark Mode</h2>
        <div class="sidenav__theme-switch">
          <label class="switch">
            <input type="checkbox" v-model="isDarkTheme">
            <span class="slider round" :class="{ 'dark-slider': isDarkTheme }"></span>
          </label>
          <span>{{ isDarkTheme ? 'On' : 'Off' }}</span>
        </div>
        <button class="sidenav__close-btn" @click="toggleSideNav">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const profileImageUrl = ref(null);
    const isDropdownOpen = ref(false);
    const isDarkTheme = ref(false);
    const isSideNavOpen = ref(false);
    const searchQuery = ref('');

    let auth;
    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
        if (user) {
          profileImageUrl.value = user.photoURL ? user.photoURL : null;
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

    const toggleSideNav = () => {
      isSideNavOpen.value = !isSideNavOpen.value;
    };

    const performSearch = () => {
      console.log('Performing search:', searchQuery.value);
    };

    return {
      isLoggedIn,
      profileImageUrl,
      isDropdownOpen,
      isDarkTheme,
      isSideNavOpen,
      searchQuery,
      toggleDropdown,
      handleSignOut,
      toggleSideNav,
      performSearch
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
=======
  <div id="app">

    <router-view/>
  </div>
</template>
<style lang="scss">

body{
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #F7F7F7 ; 
  font-family: 'Roboto', Helvetica, sans-serif;
}
#app{
  width: 100vw;
  min-height:100vh;
}
</style>
>>>>>>> origin/master
