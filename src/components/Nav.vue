<template>
  <div class="container-fluid" id="app">
    <nav class="row navbar">
      <div class="col-xs-6">
        <div class="hamburger-wrap">
          <button class="hamburger" type="button" @click="menuOpen = !menuOpen">
            <span class="hamburger__line"></span>
            <span class="hamburger__line"></span>
            <span class="hamburger__line"></span>
          </button>
        </div>
      </div>
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
          <button @click="signOut" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </div>

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

<!-- <div class="hamburguer">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div> -->

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

/* ---------------- HAMBURGER MENU ------------------ */

/* new Vue({
  el: "#app",
  data: {
    menuOpen: false,
  },
}); */

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

nav {
  display: flex;
  /* width: 179%; */
  flex-direction: column;
  align-items: flex-end;
}

/* nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
 */
/*  ------------ HAMBURGUER ------------- */
/* .hamburguer {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #5ccd1a;
} */

.hamburger-wrap {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
}

.hamburger-wrap {
  float: right;
  justify-content: flex-end;
}

.hamburger {
  width: 45px;
  height: 45px;
  background-color: black;
  border-radius: 4px;
}

.hamburger:focus {
  outline: none;
}

.hamburger__line {
  display: block;
  width: 30px;
  height: 2px;
  border-radius: 2px;
  background-color: #ffffff;
  margin-top: 7px;
  margin-bottom: 7px;
}

/* .hamburger__middle {
  width: 20px;
  margin-left: 10px;
} */

.dropdown {
  margin-top: -20px;
  height: 0px;
  background-color: lightgreen;
  transition: height 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dropdown-after {
  height: calc(100vh - 50px);
  transition: height 0.2s ease;
}

.navlist {
  list-style: none;
}

.navlistitem {
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
}

.navlistitem li {
  color: #ffffff;
}
</style>
