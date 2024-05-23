<template>
  <div class="login-page">
    <header>
      <h3>COLLEGE<span> NETWORK ..</span></h3>
      <h6>"Welcome to our vibrant college community,<br>where connections flourish and friendships ignite!</h6>
    </header>
    <main class="form-group">
      <div class="form-container">
        <h2>Login</h2>
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <p v-if="errMsg">{{ errMsg }}</p>
        <button class="login-btn" @click="register" :disabled="loading">
          <template v-if="loading">
            <span>Loading...</span>
          </template>
          <template v-else>
            Sign In
          </template>
        </button>
        <p>
          <button class=" google-btn" @click="signInWithGoogle" :disabled="loading">
  <template v-if="loading">
    <span>Loading...</span>
  </template>
  <template v-else>
    <span class="google-icon"></span>
   Sign In 
  </template>
</button>
</p>
        <p>
          Don't have an account? <router-link class="link" to="/register">Sign up</router-link>.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const errMsg = ref();
const loading = ref(false);
const router = useRouter();

const register = () => {
  loading.value = true;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully Signed in !");
      console.log(auth.currentUser);
      router.push('/home');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found ";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const signInWithGoogle = () => {
  loading.value = true;
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/home");
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>
  
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
.login-btn {

  position: relative;
}

.login-btn span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}

button.login-btn {
    width: 100%;
    height: 40px;
    background-color: hsl(31, 37%, 42%); 
    border: none;
    border-radius: 5px;
    color: #ffffff; 
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  button.google-btn {
    width: 100%;
    height: 40px;
    background-color: hsl(30, 33%, 99%); 
    border: none;
    border-radius: 5px;
    color: #0b0000; 
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;

  }
 

.google-icon {
  background-image: url('../assets/google-icon.png');
  width: 30px;
  height: 30px;
  background-size: contain;
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
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