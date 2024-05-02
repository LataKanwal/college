<template>
    <div class="news-feed-page">
      <header>
        <h2>News Feed</h2>
      </header>
      <main class="news-feed">
        <div v-for="(post, index) in posts" :key="index" class="post">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <small>{{ post.author }} - {{ post.date }}</small>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'newsFeedPage',
    data() {
      return {
        posts: [
          { title: 'Exciting Event Coming Up!', content: 'Join us for our annual college festival on May 15th.', author: 'Admin', date: 'April 28, 2024' },
          { title: 'New Academic Year Begins', content: 'Welcome back students! Get ready for another year of learning and growth.', author: 'Prof. Smith', date: 'April 20, 2024' }
        
        ]
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .news-feed-page {
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
  
  .news-feed {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .post {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 600px;
  }
  
  .post h3 {
    color: #440c0c;
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .post p {
    color: #555;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  
  .post small {
    color: #888;
    font-size: 12px;
  }
  </style>
  