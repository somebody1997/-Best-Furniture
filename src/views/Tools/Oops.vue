<template>
  <div
    class="
      d-flex
      flex-column
      justify-content-center
      align-items-center
      vh-100
      vw-100
    "
  >
    <img src="@/assets/images/svg/404.svg" class="rounded">
    <div class="mb-2 d-flex">
      <p class="display-5 text-secondary fw-bold lh-xs mb-5">Oops !</p>
    </div>

    <p class="text-secondary fs-5 fs-md-4">
      We can't seem to find the page you're looking for.
    </p>
    <p class="text-secondary fs-5 fs-md-4 mb-4">
     Here are some helpful links Instead.
    </p>
    <router-link class="btn btn-primary" to="/">HOME</router-link>
  </div>
</template>
