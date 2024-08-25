<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { API_URL } from '../services/api/consts';

const comments = ref([]);
const newComment = ref({
    name: '',
    email: '',
    body: '',
});

const fetchComments = async () => {
    const response = await axios.get(`${API_URL}/comments`);
    comments.value = response.data.slice(0, 10);
};

const addComment = () => {
    comments.value.push({ ...newComment.value, id: comments.value.length + 1 });
    newComment.value = { name: '', email: '', body: '' };
};

onMounted(fetchComments);
</script>

<template>
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-semibold mb-4">Comentários</h1>
        <div v-if="comments.length">
            <div v-for="comment in comments" :key="comment.id" class="mb-4 p-4 bg-gray-100 rounded-md">
                <h2 class="font-bold">{{ comment.name }}</h2>
                <p>{{ comment.body }}</p>
                <p class="text-sm text-gray-600">Por: {{ comment.email }}</p>
            </div>
        </div>
        <div v-else>
            <p class="text-gray-600">Nenhum comentário encontrado.</p>
        </div>
        <div class="mt-6">
            <h3 class="text-xl font-semibold">Adicionar Comentário</h3>
            <form @submit.prevent="addComment" class="mt-4">
                <input v-model="newComment.name" type="text" placeholder="Nome"
                    class="border p-2 mb-2 w-full rounded-md" />
                <input v-model="newComment.email" type="email" placeholder="Email"
                    class="border p-2 mb-2 w-full rounded-md" />
                <textarea v-model="newComment.body" placeholder="Comentário"
                    class="border p-2 mb-2 w-full rounded-md"></textarea>
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md">Enviar</button>
            </form>
        </div>
    </div>
</template>