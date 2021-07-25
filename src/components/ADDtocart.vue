<template>
  <div class="group d-flex-center mt-1">
    <a
      href="#"
      class="fs-3 ms-4 mb-1"
      :class="[
        !products.joined ? 'text-gray' : ['text-primary', 'cursor-default'],
      ]"
      :disabled="products.joined"
      @click.prevent="addToCart(products.id, num[products.id])"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      :data-bs-original-title="title[products.title]"
      ref="tooltip"
    >
      <i
        class="bi me-1"
        :class="[!products.joined ? 'bi-cart-plus-fill' : 'bi-cart-check-fill']"
      ></i>
    </a>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      products: this.item,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
  },
  methods: {
    addTocart(id) {
      if (this.products.joined) return;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$store.dispatch('updateLoading', true);
      const cart = {
        product_id: id,
      };
      this.axios
        .post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('updateProduct', [id, 1]);
            this.$swall({
              title: `${res.data.data.titel}加入購物車`,
              icon: 'success',
            });
            this.$store.dispatch('getCart');
          } else {
            this.$swall({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$swall({ title: '出現錯誤，請嘗試重新整理頁面', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
  computed: {
    // ...mapGetters(['title', 'cart']),
  },
};
</script>
