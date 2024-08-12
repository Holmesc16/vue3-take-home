import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import axios from 'axios';
const todosUrl = "https://dummyjson.com/todos";

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref([]);

  const getTodos = async (limit = 10) => {
    try {
      let unfinishedTodos = []
      let skip = 0
      const initResponse = await axios.get(todosUrl);
      const total = initResponse.data.total;

      while (unfinishedTodos.length < limit) {
        // get random set of todos to keep things fresh
        const randomSkip = Math.floor(Math.random() * (total - limit))

        const response = await axios.get(`${todosUrl}/?limit=${limit}&skip=${randomSkip}`)
        const data = await response.data.todos;
        
        const newUnfinishedTodos = data.filter(todo => !todo.completed)
        unfinishedTodos = [...unfinishedTodos, ...newUnfinishedTodos];

        skip += limit;

        if (data.length < limit) break;
      }
      todos.value = unfinishedTodos.slice(0, limit);
    }
    catch (err) {
      console.log(`Error getting todos: ${err}`);
      todos.value = [];
    }
  }

  return {
    todos,
    getTodos,
  }
});