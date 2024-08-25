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
        <h1 class="text-3xl font-bold mb-4">Álbuns</h1>
        <ul>
            <li v-for="album in albumsStore.albums" :key="album.id" class="mb-2 p-4 bg-white shadow rounded">
                {{ album.title }}
            </li>
        </ul>
    </div>
</template>
