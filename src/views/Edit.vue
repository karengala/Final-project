<template>
  <Nav />
  <div class="containerEditInfo">
    <img
      :src="avatar_url ? avatar_url : '../../public/11.png'"
      alt="Profile picture"
      class="profilePicture"
    />
    <br />
    <div class="containerEditProfile">
      <label for="name">name: </label>
      <input type="text" placeholder="Add a name" v-model="name" />
      <label for="username">username: </label>
      <input type="text" placeholder="Add a username" v-model="username" />
      <label for="website">website: </label>
      <input type="text" placeholder="Add a website" v-model="website" />
      <div>
        <label for="profile_pic">Choose file to upload</label>
        <input
          type="file"
          id="profile_pic"
          name="profile_pic"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <!--  <div>
        <button>Submit</button>
      </div> -->
    </div>

    <button @click="editProfile">Save Changes</button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);
const router = useRouter();

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

  await userStore.editProfile(
    username.value,
    website.value,
    name.value,
    avatar_url.value
  );
  console.log("HELLO");
  // redirect them to.....
  router.push({ path: "/account" });
};
</script>

<style>
.containerEditProfile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
