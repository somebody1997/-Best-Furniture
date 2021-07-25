<template>
  <section>
    <div class="container py-3">
      <div class="px-2">
        <h2 class="">產品分類</h2>
      </div>
      <div class="row">

      </div>
      </div>
  </section>
  <div class="row">
    <div class="col" >
      <p class="text-center">產品介紹 描述</p>
      <hr class="mt-2 mb-3"/>
    </div>
  </div>
  <div class="container mt-md-5 mt-3 mb-7"><!--產品列表-->
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4 position-relative position-relative">
          <img
            :src="product.imageUrl"
            class="card-img-top rounded-0"
            alt="..."
          />
          <a href="#" class="text-dark">
            <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
          </a>
          <div class="card-body p-0">
            <h4 class="mb-0 mt-3">
              <router-link :to="`/product/${product.id}`">{{ product.title }}</router-link>
            </h4>
            <p class="card-text text-muted mb-0">{{ product.content }}</p>
            <p class="text-muted mt-3">NT$ {{ $toCurrency(product.price) }}</p>
             <p class="text-muted mt-3">NT$ {{product.category}}</p>
          </div>
        </div>
      </div>
    </div>
    <nav class="d-flex justify-content-center"><!--分頁-->
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      categoryValue: 'total',
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=:page`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.products = res.data.products;
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
