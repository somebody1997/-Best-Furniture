<template>
  <Navbar></Navbar>
  <div id="main" class="py-4"></div>
  <router-view></router-view>
  <!--footer-->
  <footer>
     <div class="bg-dark">
    <div class="container">
      <div
        class="
          d-flex
          align-items-center
          justify-content-between
          text-white
          py-4
        "
      >
        <p class="mb-0">© 2020 LOGO All Rights Reserved.</p>
        <ul class="d-flex list-unstyled mb-0 h4">
          <li>
            <a href="#" class="text-white mx-3"
              ><i class="fab fa-facebook"></i
            ></a>
          </li>
          <li>
            <a href="#" class="text-white mx-3"
              ><i class="fab fa-instagram"></i
            ></a>
          </li>
          <li>
            <a href="#" class="text-white ms-3"><i class="fab fa-line"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </footer>
</template>

<script>
/* global $ */
import Navbar from '../../components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  mounted() {
    console.log($('.bg-dark'));
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/all";
</style>
