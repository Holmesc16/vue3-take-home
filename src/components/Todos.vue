<script setup>
import { onMounted } from 'vue';
import { useTodoStore } from '../store';

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.getTodos();
});
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4 text-left">Todos</h1>
    <transition-group 
      name="slide" 
      tag="ul"
      id="todos-list"
      class="flex flex-col space-y-2 list-disc pl-4">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        class="text-lg text-left"
      >
        {{ todo.todo }}
      </li>
    </transition-group>
  </div>
</template>

<style scoped>
/* Transition styles */
h1 {
  text-align: left;
  padding-left: 16px;
}
#todos-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content:first baseline;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
