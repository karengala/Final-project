<template>
  <div class="container">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Register to <span> MONK</span> App</h3>
        <br />
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <h4 class="input-field-label">E-mail</h4>
          <input
            type="email"
            class="input-field"
            placeholder=""
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <h4 class="input-field-label">Password</h4>
          <div class="form-input-password">
            <input
              :type="userPassword ? 'text' : 'password'"
              class="input-field"
              placeholder=""
              id="password"
              v-model="password"
              required
            />
            <img
              class="mostrar"
              @click.prevent="showPassword"
              src="https://cdn-icons-png.flaticon.com/512/14/14777.png"
              alt=""
            />
          </div>
        </div>
        <div class="form-input">
          <h4 class="input-field-label">Confirm password</h4>
          <input
            type="password"
            class="input-field"
            placeholder=""
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button class="signUpButton" type="submit">Sign Up</button>
        <p></p>
      </div>
    </form>
    <p>
      Have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>

    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};

const userPassword = ref(false);

const showPassword = () => {
  userPassword.value = !userPassword.value;
};
</script>

<style></style>
