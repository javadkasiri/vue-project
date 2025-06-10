import { reactive } from 'vue';

export const auth = reactive({
  isLoggedIn: !!localStorage.getItem('token')
});
