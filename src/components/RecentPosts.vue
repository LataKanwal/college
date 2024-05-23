<template>
  <div class="recent-posts">
    <div class="post" v-for="post in posts" :key="post.title">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array,
  },
};
</script>

<style scoped>
.recent-posts {
  width: 100%;
}

.post {
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post h3 {
  margin-top: 0;
  font-size: 18px;
}

.post p {
  margin-bottom: 0;
}
</style>
