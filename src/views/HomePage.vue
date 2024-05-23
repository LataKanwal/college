<template>
  <div class="container">
    <div class="main-content">
      <div class="sidebar">
        <Sidebar :is-active="isSidebarActive" :friends="friends" :friend-requests="friendRequests" @profile-clicked="showProfileDetails" />
      </div>
      <div class="post-section">
        <div class="new-post-container">
          <NewPost @create-post="addNewPost" />
        </div>
        <div class="recent-posts-container">
          <RecentPosts :posts="posts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/SideBar.vue';
import NewPost from '../components/NewPost.vue';
import RecentPosts from '../components/RecentPosts.vue';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path according to your project structure

export default {
  components: {
    Sidebar,
    NewPost,
    RecentPosts,
  },
  setup() {
    const auth = getAuth();
    const storage = getStorage();
    const user = auth.currentUser;

    const isSidebarActive = ref(true);
    const friends = ref([
      { name: 'Friend 1', age: 25, city: 'City 1', interests: ['Interest 1', 'Interest 2'] },
      { name: 'Friend 2', age: 30, city: 'City 2', interests: ['Interest 3', 'Interest 4'] },
      { name: 'Friend 3', age: 22, city: 'City 3', interests: ['Interest 5', 'Interest 6'] }
    ]);
    const friendRequests = ref([
      { name: 'Request 1', age: 27, city: 'City 4', interests: ['Interest 7', 'Interest 8'] },
      { name: 'Request 2', age: 35, city: 'City 5', interests: ['Interest 9', 'Interest 10'] }
    ]);
    const selectedProfile = ref(null);
    const posts = ref([]);

    onMounted(async () => {
      if (user) {
        // Load posts from Firestore
        const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          posts.value.push({ id: doc.id, ...doc.data() });
        });
      }
    });

    const showProfileDetails = (profile) => {
      selectedProfile.value = profile;
    };

    const addNewPost = async (newPostContent, newPostImage) => {
      if (user && newPostContent) {
        try {
          let imageUrl = null;
          if (newPostImage) {
            const imageRef = storageRef(storage, `postImages/${user.uid}/${Date.now()}`);
            await uploadBytes(imageRef, newPostImage);
            imageUrl = await getDownloadURL(imageRef);
          }
          const post = {
            userId: user.uid,
            content: newPostContent,
            imageUrl,
            createdAt: new Date(),
          };
          const docRef = await addDoc(collection(db, 'posts'), post);
          posts.value.push({ ...post, id: docRef.id });
        } catch (error) {
          console.error('Error adding new post:', error);
        }
      }
    };

    return {
      isSidebarActive,
      friends,
      friendRequests,
      selectedProfile,
      posts,
      showProfileDetails,
      addNewPost
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 0 px;
  display: flex;
}

.sidebar {
  margin-right: 10px; /* Adjust spacing between Sidebar and Post sections */
  margin-top: 30px;
}

.post-section {
  display: flex;
  flex-direction: column;
}

.new-post-container,
.recent-posts-container {
  margin-top: 30px; /* Adjust spacing between components */
}

.profile-details {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>
