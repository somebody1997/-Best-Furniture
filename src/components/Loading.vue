<template>
  <div class="loading" :class="{ active: isLoading }">
    <div class="d-flex position-relative mb-1">
      <img class="loading__img--0" src="@/assets/images/logos/logo-small.png" />
    </div>
    <p class="loading__text fs-5 fw-bold">LOADING</p>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
    },
  },
};
</script>
