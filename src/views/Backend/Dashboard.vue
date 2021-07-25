<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
      <a class="sidebar-toggler text-gray-500 me-4 me-lg-5 lead" href="#">
        <i class="fas fa-align-left"></i>
      </a>
      <a class="navbar-brand fw-bold text-uppercase text-base" href="#">
        <img src="@/assets/images/logos/logo.png" />
        <span class="d-none d-sm-inline">Dashboard</span>
        <span class="d-none d-sm-inline">System</span>
      </a>
    </nav>
  </header>
  <!-- Dashboard -->
  <div class="container-fluid">
    <div class="row g-0">
      <div class="height--vh col-2 sticky-top">
        <div class="px-2 py-3 bg-light h-100 position-relative">
          <p class="h3">功能列</p>
          <div class="list-group list-group-flush">
            <!-- 路由加上 linkActiveClass: 'active'，點擊路由時會自動加上 active -->
            <router-link
              to="/manage/products"
              class="list-group-item list-group-item-action"
            >
              PRODUCT
            </router-link>
            <router-link
              to="/manage/orders"
              class="list-group-item list-group-item-action"
            >
              ORDERS
            </router-link>
            <router-link
              to="/manage/coupons"
              class="list-group-item list-group-item-action"
            >
              COUPONS
            </router-link>
          </div>
          <input
            type="button"
            value="Sign out"
            class="
              btn btn-primary
              position-absolute
              start-50
              bottom-10
              translate-middle
              w-50
            "
            @click="signOut"
          />
        </div>
      </div>
      <div class="col-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          document.cookie = 'hexToken=; expires=; path=/';
          if (res.data.success) {
            this.swal(res.data.message);
            this.$router.replace({ name: 'Login' });
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('Fail to Signout', 'error');
        });
    },
    check() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.replace({ name: 'Login' });
          }
        });
    },
  },
  created() {
    this.check();
  },
};
</script>
