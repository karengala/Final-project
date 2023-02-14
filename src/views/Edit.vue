<template>
  EDIIIT INPUTS <br />
  <img
    :src="
      avatar_url
        ? avatar_url
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    "
    alt="Profile picture"
    class="profilePicture"
  />
  <br />
  <div class="containerEditProfile">
    <label for="name">name: </label>
    <input type="text" placeholder="Add a name" v-model="name" />
    <label for="userName">username: </label>
    <input type="text" placeholder="Add a username" v-model="userName" />
    <label for="website">website: </label>
    <input type="text" placeholder="Add a website" v-model="website" />
    <button>Save Changes</button>
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
  /* console.log(editProfileObject); */

  await userStore.editProfile(
    editProfileObject.username.value,
    editProfileObject.avatar_url.value,
    editProfileObject.website.value
  );
  console.log("HELLO");
};
</script>

<style>
.containerEditProfile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
