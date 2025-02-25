<script setup>
import { ref, computed } from "vue";

const text = ref("");
const trimmedText = computed(()=> text.value.trim());// à chaque fois que "text" est modifiée, la fonction fléchée ()=>text.value.trim() va être utilisée

// function updateText(event) {
//   text.value = event.target.value;
// }

const posts = ref([]);
const invertedPosts = computed(()=> posts.slice().sort((post2, post1) => post1.createdAt - post2.createdAt))

function addPost() {
  const newPost = {
    id: Math.random().toString(36).substring(2), //UUID
    content: trimmedText.value,
    createdAt: new Date(),
    author: {
      username: "anonymous",
      avatarURL: "https://avatars.githubusercontent.com/u/130103824?v=4"
    }
  }
  posts.value.push(newPost);
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
        <button type="submit" :disabled="!trimmedText">Poster</button>
      </form>


      <p v-show="!posts.length"> Il n'y a rien par ici...</p>

      <article v-for="(post, index) in /*invertedPosts*/posts" :key="index" class="card">
        <header>
          <img :src="post.author.avatarURL" :alt="post.author.username" width="36" height="36"/>
          <!--RENDU DECLARATIF-->
          <a>{{ post.author.username }}</a>
          <a>{{ post.createdAt }}</a>
        </header>
        <!--RENDU DECLARATIF-->
        <p>{{ post.content }}</p>
      </article>
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
button:disabled{
  opacity: 0.4;
  cursor: not-allowed;
}
article {
  padding: 1rem;
  overflow: hidden;
}

article p{
  white-space: pre-wrap;
}

article header{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

article img{
  border-radius: 50%;
}
</style>
