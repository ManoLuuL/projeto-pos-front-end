<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleRegister = () => {
    const newUser = {
        email: email.value,
        password: password.value,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/");
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">Registrar-se</h1>
            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input v-model="email" id="email" type="email"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input v-model="password" id="password" type="password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>
                <div class="text-center">
                    <button type="submit"
                        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Register
                    </button>
                </div>
            </form>
            <p class="mt-6 text-center text-sm text-gray-600">
                Já possui uma conta?
                <router-link to="/" class="text-indigo-600 hover:text-indigo-500">Faça login</router-link>
            </p>
        </div>
    </div>
</template>