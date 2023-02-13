<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <h3 class="header-title">Log In to <span> MONK</span></h3>
    <!--   <p class="header-subtitle">
      Estamos en la ruta de login. Aquí deberíais crear un form con la lógica
      correspondiente para que este permita al usuario loguearse con su email y
      su contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)
    </p> -->

    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <h4>Username/Email</h4>
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
          <h4>Password</h4>
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
              alt="eyeIcon"
            />
          </div>
        </div>
        <button class="logInButton" type="submit">Sign In</button>
      </div>
    </form>

    <p>
      Dont have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Declarar una variable boolean que cambie su valor de false a true segun le damos al boton de "mostrar contraseña"
const userPassword = ref(false);

const showPassword = () => {
  userPassword.value = !userPassword.value;
};

// Arrow function to Signin user to supaBase
/* const singIn = async () => {
 try {} catch (error) {}
}; */

// Input Fields
const email = ref("");
const password = ref("");
const redirect = useRouter();

const signIn = async () => {
  if (email.value) {
    try {
      await useUserStore().signIn(email.value, password.value);

      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    /*  return; */
  }
  errorMsg.value = "error";
};
</script>

<style scooped></style>
