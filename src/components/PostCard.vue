<script setup>
import { TrashIcon, HandThumbUpIcon as ThumbUpOutline} from "@heroicons/vue/24/outline";
import { HandThumbUpIcon as ThumbUpSolid } from "@heroicons/vue/24/solid";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "like"]);

function deletePost() {
  emit("delete", props.post.id); //envoie l'event delete avec la valeur props.post.id => les posts sont dans props, donc dans l'App.vue, donc il faut transmettre l'information
}

function likePost() {
  emit("like", props.post.id); //envoie l'event delete avec la valeur props.post.id => les posts sont dans props, donc dans l'App.vue, donc il faut transmettre l'information
}
</script>

<template>
  <article class="card">
    <header>
      <img
        :src="post.author.avatarURL"
        :alt="post.author.username"
        width="36"
        height="36"
        class="avatar"
      />
      <a>{{ post.author.username }}</a>
    </header>
    <!--RENDU DECLARATIF-->
    <p>{{ post.content }}</p>
    <footer>
      <button @click="deletePost" class="btn-icon">
        <TrashIcon />
      </button>

      <button @click="likePost" class="btn-icon">
        <ThumbUpOutline v-if="!post.liked"/>
        <ThumbUpSolid v-else/>
      </button>
    </footer>
  </article>
</template>
