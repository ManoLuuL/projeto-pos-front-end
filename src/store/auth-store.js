import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
	const isLoggedIn = ref(false);
	const user = ref(null);

	const login = (userData) => {
		isLoggedIn.value = true;
		user.value = userData;
		localStorage.setItem("isLoggedIn", "true");
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = () => {
		isLoggedIn.value = false;
		user.value = null;
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("user");
	};

	const checkAuth = () => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			isLoggedIn.value = true;
			user.value = JSON.parse(storedUser);
		}
	};

	return { isLoggedIn, user, login, logout, checkAuth };
});
