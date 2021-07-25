<template>
  <div class="fixed-top pb-2" id="navbar-top"
    :class="classList.navbarTop">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light"
      :class="classList.navbarInner">
        <a
          class="navbar-brand position-absolute"
          href="./index.html"
          style="left: 50%; transform: translate(-50%, -50%); top: 50%;"
        >
         <img

                src="@/assets/images/logos/logo.png"

              />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse custom-header-md-open" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/">Home</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link text-dark" to="/products">All Product</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/productcategory">分類</router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex position-relative"><!---->
          <div class="position-relative d-none d-lg-block mx-3">
             <router-link class="nav-link text-dark" to="/Coupons">
             <i class="bi bi-person fs-4 fw-bold"></i>
            </router-link>
          </div>
           <router-link class="nav-link text-dark" to="/shippingcart">
            <span class="material-icons">
              shopping_cart
            </span>
            </router-link>
          <div
            class="rounded-pill bg-primary text-white position-absolute px-2"
            style="right: -12px;
            top: -4px;"
          >
            {{ cart?.carts?.length }}
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import emitter from '@/assets/javascript/emitter';

export default {
  data() {
    return {
      cart: {},
      classList: {
        navbarTop: '',
        navbarInner: '',
      },
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        console.log('購物車:', res);
        this.cart = res.data.data;
      });
    },
  },
  mounted() {
    this.getCart();
    emitter.on('update-cart', () => {
      this.getCart();
    });
    window.addEventListener('scroll', () => {
      const windowY = window.scrollY;

      const main = document.querySelector('#main');

      if (windowY > main.offsetTop) {
        this.classList = {
          navbarTop: 'bg-dark',
          navbarInner: 'navbar-dark',
        };
      } else {
        this.classList = {
          navbarTop: '',
          navbarInner: 'navbar-dark',
        };
      }
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/all";

#navbar-top {
  transition: .5s background-color;
}
.bi{
  text-decoration:none;
  color:black;
}
</style>
