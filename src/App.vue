<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function logout() {
  localStorage.removeItem("user");
  router.push("/register");
}

const showNavbar = computed(() => ["login", "register"].includes(route.path));
</script>

<template>
  <AppNavbar v-if="showNavbar" />

  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
