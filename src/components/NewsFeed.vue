<template>
  <div class="newsfeed">
    <Post v-for="(post, index) in posts" :key="index" :post="post" @update-post="updatePost(index, $event)" />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  components: {
  },
  setup() {
    const posts = ref([
      {
        userImage: 'path/to/image.jpg',
        userName: 'User One',
        content: 'This is the first post content.',
        likes: 10,
        comments: ['Great post!', 'Interesting...'],
      },
      {
        userImage: 'path/to/image2.jpg',
        userName: 'User Two',
        content: 'This is the second post content.',
        likes: 5,
        comments: ['Nice!', 'Thanks for sharing!'],
      },
    ]);

    const updatePost = (index, updatedPost) => {
      posts.value[index] = updatedPost;
    };

    return { posts, updatePost };
  },
};
</script>

<style scoped>
.post {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.post-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-header h3 {
  margin: 0;
  font-size: 16px;
}

.post-content {
  font-size: 14px;
}

.interaction {
  margin-top: 10px;
}

.like-button,
.comment-button {
  border: none;
  background-color: #3b5998;
  color: #fff;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.like-button:hover,
.comment-button:hover {
  background-color: #293e6a;
}

.comment-input {
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.comments {
  list-style-type: none;
  padding: 0;
}

.comment {
  margin-top: 10px;
}

.comment span {
  font-size: 14px;
}
</style>
