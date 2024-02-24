<template>
    <nav class="nav-bar bg-gray-800">
        <div class="router">
            <span class="text-neutral-300 mx-3">{{ getUser.firstName }} {{ getUser.lastName }}</span>
            <router-link to="/" class="bg-red-800 text-neutral-100 px-4 py-1 rounded-sm">Logout</router-link>
        </div>

    </nav>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const getUser = computed(() => {
    const { firstName, lastName } = store.state.auth.userInformation
    console.log('neden', firstName, lastName)
    return { firstName, lastName }
});

</script>

<style lang="scss" scoped>
.nav-bar {
    padding: 30px;
    display: flex;
    justify-content: flex-end;

    .router {}
}
</style>
