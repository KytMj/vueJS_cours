<script setup>
import { ref } from "vue";

//let text = "Ca va bien";
const text = ref("hello");

// function updateText(event) {
//   text.value = event.target.value;
// }

const posts = ref([]);

function addPost() {
  posts.value.push(text.value);
  text.value = "";
}
</script>

<template>
  <!--<h1>£( ° [______] ° )£</h1>-->
  <main>
    <div class="container">
      <form class="card" @submit.prevent="addPost">
        <textarea name="post" id="post" placeholder="Quoi de neuf ?" v-model="text"></textarea>
        <!--DIRECTIVES avec leur équivalent en "sucre syntaxique"
          - v-bind:{paramHTML} = lie le paramètre à une variable ou constante Javascript    (ex : v-bind:value)   =>  :
          - v-on:{typeEvent} = écoute un événement sur une balise HTML    (ex : @input, @click)  =>  @
          - v-model = binding bi-latéral (v-bind et v-on en même temps)
          - v-for = permet de faire des foreach et des for
        -->
        <button type="submit">Publier</button>
      </form>

      <!--<p>{{ text }}</p>-->
      <!--RENDU DECLARATIF-->

      <p v-for="(post, index) in posts" :key="index">{{ post }}</p>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: 100vh;
  margin: 0 auto;
  max-width: 640px;
}
.card {
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  width: 100%;
}
textarea {
  background: none;
  border: none;
  color: var(--color-text-primary);
  flex: 1;
  margin-bottom: 1rem;
  outline: none;
  padding: 0.5rem 0;
  resize: none;
  field-sizing: content;
}
button {
  align-self: flex-end;
  background: none;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 1rem;
  height: 40px;
  padding: 0 1rem;
}
</style>
