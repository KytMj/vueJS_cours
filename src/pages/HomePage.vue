<script setup>
import { ref, computed } from "vue";
import PostCard from "@/components/PostCard.vue";

const text = ref("");
const trimmedText = computed(() => text.value.trim()); // à chaque fois que "text" est modifiée, la fonction fléchée ()=>text.value.trim() va être utilisée

// function updateText(event) {
//   text.value = event.target.value;
// }

//const posts = ref([]);
//const invertedPosts = computed(()=> posts.slice().sort((post2, post1) => post1.createdAt - post2.createdAt))
// const sortedRecentPosts = computed(() =>
//   [...posts.value].sort((a, b) => b.createdAt - a.createdAt),
// );

// function addPost() {
//   const newPost = {
//     id: Math.random().toString(36).substring(2), //UUID
//     content: trimmedText.value,
//     createdAt: new Date(),
//     author: {
//       username: "anonymous",
//       avatarUrl:
//         "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGgwa2N0ZWpqdnpxcGNjZmlzOHl0M2h0eG5jOGM4cmJpM3FtN295dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ub8XEam5vXbMY/giphy.gif",
//     },
//     liked: false,
//   };
//   posts.value.push(newPost);
//   text.value = "";
// }

// Nouvelle fonction addPost qui ajoute dans la bdd
function addPost() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData.token;
  fetch("https://posts-crud-api.vercel.app/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: trimmedText.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      apiPosts.value.unshift({
        id: data.id,
        content: data.content,
        createdAt: data.createdAt,
        author: {
          id: userData.user.id,
          username: userData.user.username,
          avatarUrl: userData.user.avatarUrl,
        },
      });
      text.value = "";
    });
}

function deletePost(id) {
  apiPosts.value = apiPosts.value.filter((post) => post.id !== id); //remplace la liste de posts avec une liste de posts filtrée sans les posts avec l'id en paramètre
}

function likePost(id) {
  apiPosts.value.find((post) => post.id === id).liked ^= true;
}

const apiPosts = ref([]);
const loading = ref(false);
function fetchPosts() {
  loading.value = true;
  const result = fetch("https://posts-crud-api.vercel.app/posts");
  result
    .then((response) => response.json())
    .then((data) => {
      apiPosts.value = data;
      loading.value = false;
    });
}

/*Loading State (chargement de l'API)
  Empty State (pas de posts)
  Error State
*/

fetchPosts();
</script>

<!---------------------------------PAGE--------------------------------->

<template>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="addPost">
        <!-- .prevent empêche que le bouton submit recharge la page -->
        <textarea name="post" id="post" placeholder="Quoi de neuf ?" v-model="text"></textarea>
        <!--DIRECTIVES avec leur équivalent en "sucre syntaxique"
          - v-bind:{paramHTML} = lie le paramètre à une variable ou constante Javascript    (ex : v-bind:value)   =>  :
          - v-on:{typeEvent} = écoute un événement sur une balise HTML    (ex : @input, @click)  =>  @
          - v-model = binding bi-latéral (v-bind et v-on en même temps)
          - v-for = permet de faire des foreach et des for
        -->
        <button type="submit" :disabled="!trimmedText">Poster</button>
      </form>

      <p v-if="loading">Chargement...</p>
      <p v-else-if="/*!posts.length*/ !apiPosts.length">Il n'y a rien par ici...</p>

      <PostCard
        v-for="(post, index) in /*sortedRecentPosts*/ apiPosts"
        :key="index"
        :post="post"
        @delete="deletePost"
        @like="likePost"
      />
    </div>
  </main>
</template>
