import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API
  const tasksArr = ref(null);
  // conesguir tareas de supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };
  // añadir tareas de supabase
  const addTask = async (title, description) => {
    console.log(`User id is: ${useUserStore().user.id}`);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
  };

  //Completar tarea de Supabase - apuntando al valor booleano is_complete
  const completeTask = async (valorDeBooleano, id) => {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .update({ is_complete: valorDeBooleano })
      .match({ id: id });
  };

  // Editar tarea en Supabase
  const editTaskSupabase = async (title, description, id) => {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .update({ title: title, description: description })
      .match({ id: id });
  };

  // borrar tareas de supabase
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  return {
    tasksArr,
    fetchTasks,
    addTask,
    deleteTask,
    completeTask,
    editTaskSupabase,
  };
});
