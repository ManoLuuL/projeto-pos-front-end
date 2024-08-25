<script setup>
import { onMounted } from 'vue';
import { useAlbumStore } from '../store/albums-store';

const albumsStore = useAlbumStore();

onMounted(async () => {
    await albumsStore.init();
});
</script>

<template>
    <div>
        <h1 class="text-3xl font-bold mb-6 text-center text-indigo-600">Álbuns</h1>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <li v-for="album in albumsStore.albums" :key="album.id"
                class="relative group p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <h2 class="text-xl font-semibold mb-2 truncate text-gray-800 group-hover:text-indigo-600">
                    {{ album.title }}
                </h2>
                <p class="text-gray-600">
                    Álbum ID: {{ album.id }}
                </p>
                <div
                    class="absolute inset-0 bg-gradient-to-t from-indigo-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                </div>
            </li>
        </ul>
    </div>
</template>
