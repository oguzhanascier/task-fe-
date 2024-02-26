<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Mail
                        </label>
                        <input
                            class=" border rounded w-full py-2 px-3 text-gray-700 tw-input focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username" v-model="getUser.email" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            class=" border w-full py-2 px-3 text-gray-700 mb-3 tw-input focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************" v-model="getUser.password" />
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button" @click="login">
                            Sign In
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const getUser = computed(() => {
    return store.state.auth.loginUser;
});

const login = async () => {
    await store.dispatch("authenticate");
    await router.push("/");
};
</script>

<style lang="scss" scoped>
input {}
</style>
