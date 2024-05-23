<template>
  <div class="user-profile">
    <h1>Profile</h1>
    <div class="profile-info">
      <div class="profile-image">
        <img v-if="profileImageUrl" :src="profileImageUrl" alt="Profile Image" />
        <div v-else class="profile-image-placeholder"></div>
        <label class="upload-label">
          Change Profile Image
          <input type="file" @change="uploadProfileImage" />
        </label>
      </div>
      <div class="profile-details">
        <label>
          Name:
          <input type="text" v-model="userName" />
        </label>
        <label>
          University:
          <input type="text" v-model="university" />
        </label>
        <button @click="updateProfile">Update Profile</button>
      </div>
    </div>
    <div class="new-post">
      <h2>Add New Post</h2>
      <textarea v-model="newPostContent" placeholder="What's on your mind?"></textarea>
      <input type="file" @change="uploadPostImage" />
      <button @click="addNewPost">Post</button>
    </div>
    <div class="posts">
      <h2>Your Posts</h2>
      <div v-for="post in posts" :key="post.id" class="post">
        <p>{{ post.content }}</p>
        <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, updateProfile as firebaseUpdateProfile } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path according to your project structure

const auth = getAuth();
const storage = getStorage();
const user = auth.currentUser;

const userName = ref('');
const university = ref('');
const profileImageUrl = ref(null);
const newPostContent = ref('');
const newPostImage = ref(null);
const posts = ref([]);

onMounted(async () => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userName.value = userData.displayName || '';
      university.value = userData.university || '';
      profileImageUrl.value = userData.photoURL || null;
    }

    // Load posts from Firestore
    const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      posts.value.push({ id: doc.id, ...doc.data() });
    });
  }
});

const uploadProfileImage = async (event) => {
  const file = event.target.files[0];
  if (file && user) {
    try {
      const fileRef = storageRef(storage, `profileImages/${user.uid}`);
      await uploadBytes(fileRef, file);
      profileImageUrl.value = await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  }
};

const updateProfile = async () => {
  if (user) {
    try {
      await firebaseUpdateProfile(user, {
        displayName: userName.value,
        photoURL: profileImageUrl.value,
      });

      await setDoc(doc(db, 'users', user.uid), {
        displayName: userName.value,
        university: university.value,
        photoURL: profileImageUrl.value,
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
};

const uploadPostImage = (event) => {
  newPostImage.value = event.target.files[0];
};

const addNewPost = async () => {
  if (user && newPostContent.value) {
    try {
      let imageUrl = null;
      if (newPostImage.value) {
        const imageRef = storageRef(storage, `postImages/${user.uid}/${Date.now()}`);
        await uploadBytes(imageRef, newPostImage.value);
        imageUrl = await getDownloadURL(imageRef);
      }
      const post = {
        userId: user.uid,
        content: newPostContent.value,
        imageUrl,
        createdAt: new Date(),
      };
      await addDoc(collection(db, 'posts'), post);
      posts.value.push({ ...post, id: posts.value.length + 1 });
      newPostContent.value = '';
      newPostImage.value = null;
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

.user-profile {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.profile-image {
  position: relative;
  margin-right: 20px;
}

.profile-image img,
.profile-image-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile-image-placeholder {
  background-color: #ccc;
}

.upload-label {
  display: block;
  margin-top: 10px;
  cursor: pointer;
  color: #1877f2;
  text-align: center;
}

.upload-label input {
  display: none;
}

.profile-details {
  flex: 1;
}

.profile-details label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.profile-details input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-details button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.profile-details button:hover {
  background-color: #165dd3;
}

.new-post {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.new-post h2 {
  margin-bottom: 10px;
}

.new-post textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.new-post input[type="file"] {
  margin-bottom: 10px;
}

.new-post button {
  padding: 10px 20px;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.new-post button:hover {
  background-color: #165dd3;
}

.posts {
  padding: 20px;
}

.posts h2 {
  margin-bottom: 10px;
}

.posts .post {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.posts .post p {
  margin-bottom: 10px;
}

.posts .post img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
