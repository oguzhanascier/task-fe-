<template>
    <nav class="nav-bar bg-gray-800">
        <div class="router">
            <span class="text-neutral-300 mx-3">{{ userData.firstName }} {{ userData.lastName }}</span>
            <router-link to="/" class="bg-red-800 text-neutral-100 px-4 py-1 rounded-sm"
                @click="logout">Logout</router-link>
        </div>
    </nav>
</template>

<script lang="ts">
import { watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const store = useStore()

export default {
    name: 'LayoutVue',
    setup() {
        const store = useStore()

        const userData = computed(() => store.getters.getUserData)

        onMounted(() => {
            const userData = localStorage.getItem("userInfo");
            if (userData) {
                store.commit('setUserInformation', userData)
            }
        })

        const logout = async () => {
            localStorage.removeItem("user");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("storeInfo");
            router.push('/login')

        }


        return {
            userData, logout
        }
    },


}
</script>

<style lang="scss" scoped>
.nav-bar {
    padding: 30px;
    display: flex;
    justify-content: flex-end;

    .router {}
}
</style>
