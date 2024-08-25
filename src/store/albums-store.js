import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../services/api/consts";

export const useAlbumStore = defineStore("albums", () => {
	const db = ref(null);
	const albums = ref([]);
	const loading = ref(true);
	const errors = ref([]);

	const openDatabase = async () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open("albumsDB", 1);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;

				if (!db.objectStoreNames.contains("albums")) {
					db.createObjectStore("albums", { keyPath: "id" });
				}
			};

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};

			request.onerror = (event) => {
				errors.value.push("Erro ao abrir o banco de dados");
				reject(`Erro ao abrir o banco de dados: ${event.target.errorCode}`);
			};
		});
	};

	const fetchAlbumsFromAPI = async () => {
		try {
			const response = await axios.get(`${API_URL}/albums`);
			albums.value = response.data;
			saveToIndexedDB("albums", albums.value);
		} catch (error) {
			errors.value.push("Erro ao buscar albums da API");
		}
	};

	const saveToIndexedDB = (storeName, data) => {
		const transaction = db.value.transaction([storeName], "readwrite");
		const store = transaction.objectStore(storeName);
		for (const item of data) {
			store.put(item);
		}
	};

	const fetchFromIndexedDB = (storeName) => {
		return new Promise((resolve, reject) => {
			const transaction = db.value.transaction([storeName], "readonly");
			const store = transaction.objectStore(storeName);
			const request = store.getAll();

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};

			request.onerror = (event) => {
				errors.value.push(`Erro ao buscar ${storeName}`);
				reject(`Erro ao buscar ${storeName}: ${event.target.errorCode}`);
			};
		});
	};

	const init = async () => {
		loading.value = true;
		db.value = await openDatabase();

		const storedPosts = await fetchFromIndexedDB("albums");

		if (storedPosts.length) {
			albums.value = storedPosts;
		} else {
			await fetchAlbumsFromAPI();
		}

		loading.value = false;
	};

	return {
		albums,
		errors,
		loading,
		init,
	};
});
