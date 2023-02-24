<template>
  <section id="containerForEachTask" :class="newClass">
    <!--  <div class="date"> -->
    <div class="idContainer">
      {{ task.id }}
    </div>
    <div class="linea"></div>
    <!-- </div> -->
    <div class="markAsComplete">
      <button
        :class="props.task.is_complete ? 'unCompleted' : 'completed'"
        @click="completeTask"
      ></button>
      <!-- :disabled="testProp ? true : false" -->
      <div class="taksTitle">
        <!-- <p v-if="testProp">{{ testProp }} testttt</p> -->
        <h3 :class="props.task.is_complete ? 'clase2' : 'clase1'">
          {{ task.title }}
        </h3>
        <h4 class="dateContainer">{{ task.inserted_at.slice(0, 10) }}</h4>
        <p :class="props.task.is_complete ? 'clase2' : 'clase1'">
          {{ task.description }}
        </p>
      </div>
    </div>
    <div class="buttonsInTasks">
      <img
        src="https://th.bing.com/th/id/R.0e8446f0392d95cc1415906097cf1691?rik=%2bw1%2b2rXL55p0RQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_237965.png&ehk=Nf0bz9QKT4MjP9ugbOEUC%2b9P3Fu4nZ2t1uasEjyaYLI%3d&risl=&pid=ImgRaw&r=0"
        alt="deleteIcon"
        @click="showModalToggle"
        class="deleteIcon"
      />
      <!-- :disabled="testProp ? true : false" -->
      <!--  <div id="popup1" class="overlay"> -->
      <div class="overlay" v-if="showModal">
        <div class="popup">
          <h2>Are you sure you want to delete?</h2>
          <a class="close" @click="showModalToggle" href="#">&times;</a>
          <button class="buttonYes" @click="deleteTask">Yes</button>
          <!-- <button @click="showModalToggle">Cancel</button> -->
        </div>
      </div>

      <!-- </div> -->
      <!--  <button @click="showInput">
         :disabled="testProp ? true : false" 
        edit
      </button> -->
      <!-- <div class="containerEditFlex"> -->
      <img
        src="https://th.bing.com/th/id/R.e3956e57360db26f1bfb076dc8c6b993?rik=nnqKo%2fU0PIULJQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_194863.png&ehk=rBnNrjucmayGnMHH13LzpLSRgf09IrhS3tDD49erb6U%3d&risl=&pid=ImgRaw&r=0"
        alt="editIcon"
        @click="showInput"
        :class="props.task.is_complete ? 'clase3' : 'editIcon'"
      />
      <!--  class="editIcon" -->
      <!-- :disabled="testProp ? true : false" -->

      <!-- INTENTARLO CON OTRO FLEX DENTRO DE ESTE -->
      <!-- <div v-if="inputContainer" class="editInfoContainer">
          <input type="text" v-model="currentTaskTitle" />
          <input type="text" v-model="currentTaskDescription" />
          <button @click="editTask">edit task</button>
        </div> -->
    </div>
    <!-- </div> -->
    <div
      v-if="inputContainer"
      class="editInfoContainer editInfoContainerMobile"
    >
      <div class="buttonsEditModile">
        <img
          @click="showInput"
          src="https://cdn.onlinewebfonts.com/svg/img_53616.png"
          alt="BackIcon"
        />
        <button @click="editTask">Ok</button>
      </div>
      <div class="titleContainer">
        <input type="text" v-model="currentTaskTitle" />
        <button @click="editTask">ok</button>
      </div>
      <div class="descriptionContainer">
        <textarea
          class="textareaEditMobile"
          type="text"
          v-model="currentTaskDescription"
        />
      </div>

      <!-- <button @click="editTask">edit task</button> -->
    </div>
  </section>
</template>

<script setup>
import { ref, onUpdated, onMounted, watch } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import Hammer from "hammerjs";

let mc;

//Definir emits para pasar logica y eventos hacia componentes padres
const emit = defineEmits(["childComplete", "editChild"]);
const newClass = "patata" + props.task.id;

// funcion para completar tarea que se encarga de enviar la info al padre
const completeTask = () => {
  /*console.log("click"); */
  /* console.log(props.task.is_complete); */
  emit("childComplete", props.task);
};

// variable para usar tienda de tarea facil
const taskStore = useTaskStore();

// variable para recibir informacion de la tarea mediante prop como .objeto
const props = defineProps({
  task: Object,
  /*  testProp: String, */
});

const completed = ref(false);

//funcion para mostrar y ocultar inputs
const inputContainer = ref(false);
const currentTaskTitle = ref("");
const currentTaskDescription = ref("");
const router = useRouter();

const showInput = () => {
  console.log("click edit");
  if (!props.task.is_complete) {
    inputContainer.value = !inputContainer.value;
    if (inputContainer.value === false && window.innerWidth <= 766) {
      mc.on("swipeleft", (ev) => {
        console.log("swipe left detected");
        swipeDetected.value = true;
        deleteTask();
      });
    } else mc.off("swipeleft");
  }
  currentTaskTitle.value = props.task.title;
  currentTaskDescription.value = props.task.description;
};
//funcion con validacion + envio de datos y eventos mediante emit

const editTask = () => {
  if (
    currentTaskTitle.value.length === 0 ||
    currentTaskDescription.value.length === 0
  ) {
    alert("Title or Description can not be empty");
  } else {
    const newTaskEdited = {
      title: currentTaskTitle.value,
      description: currentTaskDescription.value,
      id: props.task.id,
    };
    emit("editChild", newTaskEdited);
    showInput();
  }
};

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const showModal = ref(false);
const showModalToggle = () => {
  console.log("click borrar");
  showModal.value = !showModal.value;
};
console.log(props.task);

// textarea

/* onUpdated(() => {
  resizeTextarea();
  console.log("hello resize otuside");
}); */

const resizeTextarea = () => {
  if (inputContainer.value) {
    const textarea = document.querySelectorAll(".textareaEditMobile");
    textarea.forEach((area) => {
      area.style.height = "5px";
      /* console.log("TEXTAREA HEIGHT", e.target.scrollHeight); */
      let scHeight = area.scrollHeight;
      area.style.height = `${scHeight}px`;
      /* console.log("hello resize otuside"); */
      /*  area.addEventListener("keyup", (e) => {
        area.style.height = "5px";
        console.log("TEXTAREA HEIGHT", e.target);
        let scHeight = e.target.scrollHeight;
        area.style.height = `${scHeight}px`;

      }); */
    });
  }
};

//touch events para borrar tarea PRUEBA

const swipeDetected = ref(false);

onMounted(() => {
  const swipeElement = document.querySelector("." + newClass);
  console.log("mounted");
  mc = new Hammer(swipeElement);
  if (window.innerWidth <= 766) {
    mc.on("swipeleft", (ev) => {
      console.log("swipe left detected");
      swipeDetected.value = true;
      deleteTask();
    });
  }
});

window.addEventListener("resize", () => {
  console.log("evento", window.innerWidth);
  if (window.innerWidth <= 766) {
    mc.on("swipeleft", (ev) => {
      console.log("swipe left detected");
      swipeDetected.value = true;
      deleteTask();
    });
  } else {
    mc.off("swipeleft");
  }
});
</script>

<style>
.containerEditFlex {
  display: flex;
}
</style>

/* **Hints** 1. ref() or reactive() can be used here to store the following,
think if you want to store them either individually or like an object, up to
you. 2. Data properties need here are the following: a boolean to store a
false**Important variable, a string to store an error, a string to store the
value of the task that the user can edit, an initial false boolean to hide the
inputFIeld used to edit the new task detail or details[this is in reference of
the task title and the task description]. 3. Store the custom emit events that
will be used to call the functions of the homeView for editing, deleting and
toggling the status[completed, not complted] of the taskItem. 4. Function to
handle the error with the data properties used to control the error and the the
boolean controlling the boolean empty variable. 5. Function to handle the edit
dialogue where the inputField is displayed and the string used to store the
value of the inputField will be used here to save the value as a prop on this
function. 6. Function to emmit a custom event emit() that takes 2 parameters a
name for the custom event and the value that will be send via the prop to the
parent component. This function can control the toggle completion of the task on
the homeview. 7. Function to edit the task information that you decided that the
user can edit. This function's body takes in a conditional that first checks if
the value of the task [either title and description or just title] is empty
which if true it runs the function used to handle the error on hint4. Else, the
conditional sets the first mentioned boolean data property on hint2 back to its
inital boolean value to hide the error message and repeat the same for the data
property mentioned 4th on hint2; a constant that stores an object that holds the
oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a
name for the custom event and the value from the object used on this part of the
conditional and lastly this part of the conditional sets the value of input
field to an empty string to clear it from the ui. 8. Function to emmit a custom
event emit() that takes 2 parameters a name for the custom event and the value
that will be send via the prop to the parent component. This function can
control the removal of the task on the homeview. */
