<template>
  <!--  <div class="container-fluid" id="app"> -->
  <nav class="navbar">
    <!--  <img
      @click="editTaskBack"
      src="https://cdn.onlinewebfonts.com/svg/img_53616.png"
      alt="BackIcon"
      class="backIcon"
    /> -->
    <!-- <div class="hamburger-wrap"> -->
    <button class="hamburger" type="button" @click="showMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <!-- </div> -->
  </nav>

  <div class="row dropdown" :class="{ 'dropdown-after': menuOpen }">
    <ul class="navlist">
      <li class="navlistitem">
        <router-link to="/"> Home </router-link>
      </li>
      <li class="navlistitem">
        <router-link to="/account">Your Account</router-link>
      </li>
      <li class="navlistitem">
        <button @click="signOut" class="logOutButton">Log out</button>
      </li>
    </ul>
  </div>
  <!-- </div> -->

  <!--  <nav>
    <router-link to="/"> Home </router-link>
    <ul>
      <li>
        <router-link to="/account">Your Account</router-link>
      </li>
    </ul>
    <div>
      <ul>
        <li>
          <button @click="signOut" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </nav> -->
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
    await useUserStore().signOut();

    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};

const back = () => {};

/* ---------------- HAMBURGER MENU ------------------ */

const menuOpen = ref(false);

const showMenu = () => {
  menuOpen.value = !menuOpen.value;
};

/* const hamburguer = document.querySelector(".hamburguer")
const navMenu = document.querySelector(".nav-menu")

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    navMenu.classList.toggle("active");

}) */
</script>

<style>
.navbar-img {
  width: 90px;
}
</style>
