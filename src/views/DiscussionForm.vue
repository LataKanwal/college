<template>
    <div class="discussion-page">
      <header>
        <h2>Discussion Forum</h2>
      </header>
      <main class="discussion-form">
        <div class="form-container">
          <h3>Create a New Post</h3>
          <textarea v-model="postContent" placeholder="Write your post here..."></textarea>
          <button class="post-btn" @click="submitPost">Post</button>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'discussionPage',
    data() {
      return {
        postContent: ''
      }
    },
    methods: {
      submitPost() {
        // Code to submit post to backend or handle post data
        console.log('Post submitted:', this.postContent);
        // Optionally, you can clear the post content after submission
        this.postContent = '';
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .discussion-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
    background-color: #f0f2f5; 
    padding: 20px;
    background-image:url('../assets/back.jpg');
    background-size: cover;
    background-position: center;
  }
  
  header {
    text-align: center;
    margin-bottom: 10px;
  }
  
  h2 {
    color: #440c0c; 
    font-size: 28px;
    font-weight: bold;
  }
  
  .discussion-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .form-container {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    width: 600px; 
  }
  
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #dcdcdc; 
    border-radius: 5px;
    resize: none;
    outline: none;
  }
  
  button.post-btn {
    width: 100%;
    height: 40px;
    background-color: #b6742a; 
    border: none;
    border-radius: 5px;
    color: #ffffff; 
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }
  </style>
  