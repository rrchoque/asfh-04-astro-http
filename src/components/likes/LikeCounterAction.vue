<template>
  <div v-if="isLoading">Loading...</div>
  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>
  <button v-else @click="likePost">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-thumbs-up"
    >
      <path d="M7 10v12"></path>
      <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
      ></path>
    </svg>
    Like
    <span>{{ likeCount }}</span>
  </button>
</template>

<script lang="ts" setup>
import { actions } from "astro:actions";

import { ref, watch } from "vue";
import confetti from "canvas-confetti";
import debounce from "lodash.debounce";

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce(async () => {
    if (likeClicks.value === 0) {
      return;
    }

    const { data, error } = await actions.updatePostLikes({
      postId: props.postId,
      increment: likeClicks.value,
    });

    if (error) {
      return alert("Algo salió mal");
    }

    console.log({ data });

    likeClicks.value = 0;
    likeCount.value = data.likes;
  }, 500)
);

const likePost = async () => {
  likeCount.value++;
  likeClicks.value++;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};

const getCurrentLikes = async () => {
  const { data, error } = await actions.getPostLikes(props.postId);

  if (error) {
    return alert(error);
  }

  likeCount.value = data.likes;
  isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 18px;
}

button:hover {
  background-color: #4a3f9a;
}
</style>
