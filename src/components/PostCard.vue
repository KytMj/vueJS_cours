<script setup>
import { TrashIcon, HandThumbUpIcon as ThumbUpOutline } from "@heroicons/vue/24/outline";
import { HandThumbUpIcon as ThumbUpSolid } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "like"]);

function deletePost() {
  emit("delete", props.post.id); //envoie l'event delete avec la valeur props.post.id => les posts sont dans props, donc dans l'App.vue, donc il faut transmettre l'information. Emets l'info à l'élément parent
}

function likePost() {
  emit("like", props.post.id);
}

function goToUserProfile() {
  router.push({ name: "user", params: { username: props.post.author.username } });
}
</script>

<template>
  <article class="card">
    <header>
      <img
        :src="props.post.author.avatarUrl"
        :alt="props.post.author.username"
        width="36"
        height="36"
        class="avatar"
      />
      <a @click="goToUserProfile" style="text-decoration: none; color: inherit">{{
        props.post.author.username
      }}</a>
    </header>
    <!--RENDU DECLARATIF-->
    <p>{{ props.post.content }}</p>
    <footer>
      <button @click="deletePost" class="btn-icon">
        <TrashIcon />
      </button>

      <button @click="likePost" class="btn-icon">
        <!--<ThumbUpOutline v-if="!post.liked"/>
        <ThumbUpSolid v-else class="active"/>  -->

        <component
          :is="props.post.liked ? ThumbUpSolid : ThumbUpOutline"
        /><!-- :class="{ active: post.liked }" -->
      </button>
    </footer>
  </article>
</template>
