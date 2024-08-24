import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePostsStore = defineStore("posts", () => {
	const db = ref(null);
	const posts = ref([]);
	const loading = ref(true);
	const errors = ref([]);

	const openDatabase = async () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open("appDB", 1);

			request.onupgradeneeded = (event) => {
				const db = event.target.result;

				if (!db.objectStoreNames.contains("posts")) {
					db.createObjectStore("posts", { keyPath: "id" });
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

	const fetchPostsFromAPI = async () => {
		try {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/posts",
			);
			posts.value = response.data;
			saveToIndexedDB("posts", posts.value);
		} catch (error) {
			errors.value.push("Erro ao buscar posts da API");
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

		const storedPosts = await fetchFromIndexedDB("posts");

		if (storedPosts.length) {
			posts.value = storedPosts;
		} else {
			await fetchPostsFromAPI();
		}

		loading.value = false;
	};

	return {
		posts,
		errors,
		loading,
		init,
	};
});
