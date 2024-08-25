<script setup>
import { onMounted } from 'vue';
import { usePostsStore } from '../store/posts-stores';


const postsStore = usePostsStore();

onMounted(async () => {
    await postsStore.init();
});

</script>

<template>
    <div class="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-3xl font-extrabold text-gray-800 mb-6">Posts para acompanhar</h1>
        <ul class="space-y-4">
            <li v-for="post in postsStore.posts" :key="post.id"
                class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                <h2 class="text-xl font-semibold text-gray-800">{{ post.title }}</h2>
                <p class="text-gray-700 mt-2">{{ post.body }}</p>
                <router-link :to="`/user/${post.userId}`" class="text-blue-500 mt-4 inline-block hover:underline">Ver
                    Autor</router-link>
            </li>
        </ul>
    </div>
</template>