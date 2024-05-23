<template>
  <div class="new-post-container">
    <div v-if="expanded" class="new-post" @click.stop>
      <h2>Create New Post</h2>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <img :src="newPost.userImage || defaultImage" alt="User Image" class="profile-pic">
          <input type="text" v-model="newPost.userName" placeholder="What's on your mind?" required />
        </div>
        <div class="form-group">
          <label for="userImage">Image URL</label>
          <input type="text" v-model="newPost.userImage" id="userImage" required />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea v-model="newPost.content" id="content" required></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
    <div v-else class="new-post-summary" @click="toggleExpand">
      <h2>Create New Post</h2>
      <p>Click to add a new post</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      newPost: {
        userImage: '',
        userName: '',
        content: '',
        likes: 0,
        comments: [],
      },
      defaultImage: 'https://via.placeholder.com/50', // Default profile picture URL
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    submitPost() {
      this.$emit('create-post', { ...this.newPost });
      this.newPost = {
        userImage: '',
        userName: '',
        content: '',
        likes: 0,
        comments: [],
      };
      this.expanded = false;
    },
  },
};
</script>

<style scoped>
.new-post-container {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}

.new-post-container:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.new-post {
  display: block;
}

.new-post h2 {
  margin-top: 0;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.form-group label {
  display: block;
  margin-bottom: 3px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #1877f2;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #1558b3;
}

.new-post-summary {
  display: block;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.new-post-summary h2 {
  margin-top: 0;
  font-size: 18px;
}

.new-post-summary p {
  margin: 0;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
