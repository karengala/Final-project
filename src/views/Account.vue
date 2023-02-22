<template>
  <Nav />
  <div class="info-profile">
    <h1>username: {{ username }}</h1>
    <h2>Name: {{ name }}</h2>
    <h2>website: {{ website }}</h2>
    <img
      :src="
        avatar_url
          ? avatar_url
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
      "
      alt="Profile picture"
      class="profilePicture"
    />
    <router-link to="/edit">edit</router-link>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
  website.value = userStore.profile.website;
  name.value = userStore.profile.name;
}

//funcion para editar infouser conectandose con supabase
const editProfile = async () => {
  console.log("click");

  await userStore.editProfile(username.value, avatar_url.value, website.value);
  console.log("HELLO");
};

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

//Redirect
/*
Accede al historial del usuario y vuelve a la posición -1.
*/
</script>

<style scooped>
.profilePicture {
  width: 200px;
  border-radius: 50%;
  padding: 67px;
}
#contenedor {
  display: flex;
  min-width: 100px;
  width: 100%;
}

#texto {
  background-color: red;
  width: 100%;
  padding: 9px;
}
.info-profile {
  padding: 0px 13px;
}

/* .backIcon {
  height: 23px;
  filter: invert(1);
} */
</style>
