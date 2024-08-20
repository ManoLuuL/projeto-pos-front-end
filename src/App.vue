<script setup>
import { useAuthStore } from './store/auth-store';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <router-link to="/" class="text-2xl font-bold hover:text-gray-300">Posts App</router-link>
        </div>
        <div class="space-x-4">
          <router-link v-if="!authStore.isLoggedIn" to="/"
            class="hover:text-gray-300 transition-colors duration-300">Login</router-link>
          <router-link v-if="!authStore.isLoggedIn" to="/register"
            class="hover:text-gray-300 transition-colors duration-300">Cadastro</router-link>
          <router-link v-if="authStore.isLoggedIn" to="/posts"
            class="hover:text-gray-300 transition-colors duration-300">Posts</router-link>
          <button v-if="authStore.isLoggedIn" @click="handleLogout"
            class="hover:text-gray-300 transition-colors duration-300">Logoff</button>
        </div>
      </div>
    </nav>


    <main class="container mx-auto p-6 flex-grow">
      <router-view />
    </main>


  </div>
</template>
