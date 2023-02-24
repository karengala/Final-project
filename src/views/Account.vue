<template>
  <Nav />
  <hr />
  <div class="info-profile">
    <div class="infoUser">
      <h2>{{ name }}</h2>
      <p>{{ username }}</p>
    </div>
    <!-- </div> -->
    <!--  <hr /> -->
    <div class="profilePicture">
      <div class="profile-Edit">
        <div class="profileDescription">
          <p>About me:</p>
          <p>
            {{ website }}
            rgegrdc fecedndoxno doiwnndxoiw dnxoiednoneu fhiuchjoijfncfncorfn
            y7hiooinppjgpo j3opgjp3jgo p3jgoj34p gj3p4gj34g j3p4ojg34 h5pojh
            3o5jhp o5j3hp o5jhpo 35jho5jhop 5jpojg3ojreerin fvneoingewor
          </p>
        </div>
        <router-link class="profileDescriptionButton" to="/edit"
          >Edit Information</router-link
        >
      </div>
      <img
        :src="avatar_url ? avatar_url : '../../public/11.png'"
        alt="Profile picture"
      />
    </div>
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

<style scooped></style>
