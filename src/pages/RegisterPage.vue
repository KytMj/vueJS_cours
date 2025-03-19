<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");

const email = ref("");

const password = ref("");

const boolean = computed(() => {
  return !!username.value.trim() && !!email.value.trim() && !!password.value.trim();
});

const isLoading = ref(false);

function createAccount() {
  isLoading.value = true;
  //   const newAccount = {
  //     username: username.value,
  //     email: email.value,
  //     password: password.value,
  //   };
  //   console.log(
  //     'json\n{\n username: "' +
  //       newAccount.username +
  //       '",\n email: "' +
  //       newAccount.email +
  //       '",\n password: "' +
  //       newAccount.password +
  //       '"\n } ',
  //   );
  //   setTimeout(() => {
  //     router.push({ name: "home" });
  //   }, 1000);

  fetch("https://posts-crud-api.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      router.push("home");
    });
}
</script>

<template>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="createAccount">
        <h1 style="margin-bottom: 1rem">Créer un compte</h1>
        <!--<textarea name="post" id="post" placeholder="Quoi de neuf ?" v-model="text"></textarea>-->
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nom d'utilisateur"
          required
          v-model="username"
        />
        <input
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          placeholder="Adresse email"
          required
          v-model="email"
        />
        <input
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          placeholder="Mot de passe"
          required
          v-model="password"
        />
        <button type="submit" :disabled="!boolean || isLoading">Créer un compte</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
input {
  background: var(--color-bg-tertiary);
  border: none;
  border-radius: 10px;
  color: var(--color-text-primary);
  outline: none;
  padding: 1rem;
  margin-bottom: 1rem;
}
button {
  width: 100%;
}
</style>
