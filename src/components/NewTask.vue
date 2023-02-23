<template>
  <button @click="showToggleNewTask" class="newTaskButton">+ Add Task</button>
  <section v-if="showToggleTask" class="newtTaskInput slide-bottom">
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>
    <div class="input-titulo">
      <label for="name">titulo</label>
      <div class="input-field">
        <input type="text" placeholder="Add a Task" v-model="name" />
      </div>
    </div>
    <div class="input-description">
      <label for="description">descrption</label>
      <div class="input-field">
        <textarea
          class="input-textarea"
          type="text"
          placeholder=""
          v-model="description"
        />
      </div>
    </div>
    <button @click="addTask" class="button">Add</button>
  </section>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");
/* const filas = ref(1); */

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
    showToggleTask.value = !showToggleTask.value;
  }
};

const emit = defineEmits(["showToggleValue"]);
/* const textarea = ref(""); */

const showToggleTask = ref(false);
/*
const showToggleNewTask = () => {
  showToggleTask.value = !showToggleTask.value;
  emit("showToggleValue", showToggleTask.value);
  setTimeout(() => {
    textarea.value = document.querySelector("#prueba");
    console.log(textarea.value);
    textarea.value.addEventListener(
      "keypress",
      (event) => {
        console.log("hola");
      },
      20
    );
  });
}; */

const showToggleNewTask = () => {
  showToggleTask.value = !showToggleTask.value;
};

onUpdated(() => {
  if (showToggleTask.value) {
    const textarea = document.querySelector("textarea");
    console.log(textarea);
    textarea.addEventListener("keyup", (e) => {
      textarea.style.height = "5px";
      console.log("TEXTAREA HEIGHT", e.target.scrollHeight);
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }
});
</script>
<style scoped>
.input-textarea {
  height: 20px;
}
</style>
