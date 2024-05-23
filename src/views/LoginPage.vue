<template>
    <div class="login-page">
      <header>
        <h3>COLLEGE<span> NETWORK ..</span></h3>
        <h6>"Welcome to our vibrant college community,<br>
             where connections flourish and friendships ignite!</h6>
      </header>
      <main class="form-group">
        <div class="form-container">
          <h2>Login</h2>
          <input type="text" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Password" />
          <button class="login-btn">Log in</button>
          <p>
            Don't have an account? <router-link class="link" to="/registerPage">Sign up</router-link>.
          </p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'loginPage',
    data() {
      return {
        email: '',
        password: ''
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image:url('../assets/back.jpg');
    background-size: cover;
    background-position: center;
  }
  
  header {
    text-align: center;
    margin-bottom: 200px;
    color: #701919;
    font-size: 32px;
    font-weight: 900;
  
    span {
      font-weight: 300;
    }
  }
  
  .form-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  
  .form-container {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  button {
    width: 100%;
    height: 40px;
    background-color: #b6742a;
    border: none;
    border-radius: 5px;
    color: #171717;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
  
  p {
    color: #888;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .link {
    color: #E35205;
    text-decoration: none;
    font-weight: 700;
  }
  
  </style>
  