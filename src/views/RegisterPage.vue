<template>
    <div class="register-page">
      <header>
        <h2>Create an Account</h2>
      </header>
      <main class="form-group">
        <div class="form-container">
          <div class="input-group">
            <input type="text" v-model="firstname" placeholder="First Name" />
            <input type="text" v-model="lastname" placeholder="Last Name" />
          </div>
          <input type="numbtexter" v-model="phonenumber" placeholder="Phone Number" />
          <input type="text" v-model="email" placeholder="Email" />
          <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" />
          <input type="password" v-model="confirmpassword" placeholder="Confirm Password" />
        </div>
        <p>Date of Birth</p>
<div class="input-group dob">
  <select v-model="day">
    <option value="" disabled selected>Day</option>
    <option v-for="day in days" :key="day">{{ day }}</option>
  </select>
  <select v-model="month">
    <option value="" disabled selected>Month</option>
    <option v-for="(month, index) in months" :key="index">{{ month }}</option>
  </select>
  <select v-model="year">
    <option value="" disabled selected>Year</option>
    <option v-for="year in years" :key="year">{{ year }}</option>
  </select>
</div>
<p>Gender</p>
<div class="input-group gender">
  <label for="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" v-model="gender">
            <label for="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" v-model="gender">
            <label for="other">Custom</label>
            <input type="radio" id="other" name="gender" value="other" v-model="gender">
          </div>
          <p> <button class="register-btn"  @click="register" > Sign Up</button></p>
          <p>
            Already registered? <router-link class="link" to="/sign-in">Sign in</router-link>.
          </p>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  
  import {ref} from "vue";
  import {
    getAuth, 
    createUserWithEmailAndPassword,} from "firebase/auth";
  import {useRouter} from 'vue-router'

  const email = ref("");
  const password =ref("");
  const router = useRouter()

const day = ref("");
const month = ref("");
const year = ref("");
const days = [...Array(31).keys()].map(day => day + 1);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [...Array(100).keys()].map(year => year + 1930);

  const  register = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
        console.log("Successfully Registered !");

        console.log(auth.currentUser)
        router.push('/feed')

    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    });
    

  };
  </script>
  <style  scoped>
  .register-page {
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
  
  .form-group {
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
    width: 400px; 
  }
  
  .input-group {
    margin-bottom: 20px;
    display: flex; 
  }
  
  .input-group.gender {
    display: flex;
    align-items: center;
  }
  
  .input-group.gender label {
    margin-right: 10px;
  }
  
  .input-group.gender input[type="radio"] {
    margin-right: 60px;
  }
  
  .input-group.dob select {
    width: calc(33.33% - 10px);
    margin-right: 10px;
  }
  
  input, select {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #dcdcdc; 
    border-radius: 5px;
    outline: none;
  }
  
  button.register-btn {
    width: 100%;
    height: 40px;
    background-color: #b6742a; 
    border: none;
    border-radius: 5px;
    color: #ffffff; 
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  
  p {
    color: #808080;
    font-size: 14px;
    margin-top: 20px;
  }
  
  .link {
    color: #E35205; 
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  