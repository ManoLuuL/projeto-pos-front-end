<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const user = ref(null);

onMounted(async () => {
    const userId = route.params.id;
    const response = await api.get(`/users/${userId}`);
    user.value = response.data;
});
</script>

<template>
    <div class="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div v-if="user">
            <h1 class="text-3xl font-bold mb-4 text-gray-800">{{ user.name }}</h1>
            <p class="text-lg text-gray-700"><strong>E-mail:</strong> {{ user.email }}</p>
            <p class="text-lg text-gray-700"><strong>Endereço:</strong> {{ user.address.street }}, {{ user.address.city
                }}</p>
            <p class="text-lg text-gray-700"><strong>Telefone:</strong> {{ user.phone }}</p>
            <router-link to="/posts"
                class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300">Voltar
                para Posts</router-link>
        </div>
        <div v-else>
            <p class="text-center text-gray-600">Carregando...</p>
        </div>
    </div>
</template>