<template>
  <section>
    <div class="container py-3">
      <div class="px-2">
        <h2 class="">Product List </h2>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="card pt-3 border-0">
            <img
              src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80
          alt="
              class="img-fluid"
            />
            <a class="text-decoration-none text-dark d-block text-center pt-2" href=""
            ><h6>描述</h6></a>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card pt-3 border-0">
            <img
              src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80
          alt="
              class="img-fluid"
            />
            <a class="text-decoration-none text-dark d-block text-center pt-2" href="">
              <h6>描述</h6></a>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card pt-3 border-0">
            <img
              src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80
          alt="
              class="img-fluid"
            />
            <a class="text-decoration-none text-dark d-block text-center pt-2" href="">
              <h6>描述</h6></a>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card pt-3 border-0">
            <img
              src="https://images.unsplash.com/photo-1526038335545-4b96864eaee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80
          alt="
              class="img-fluid"
            />
            <a class="text-decoration-none text-dark d-block text-center pt-2" href="">
              <h6>描述</h6></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="row">
    <div class="col">
      <p class="text-center">產品介紹 描述</p>
      <hr class="mt-2 mb-3" />
    </div>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <!--產品列表-->
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4 position-relative ">
          <img
            :src="product.imageUrl"
            class="card-img-top rounded-0"
            alt="..."
          />
          <a href="#" class="text-dark">
            <i
              class="far fa-heart position-absolute"
              style="right: 16px; top: 16px"
            ></i>
          </a>
          <div class="card-body px-3">
            <h4 class="mb-0 mt-2">
              <!--產品名稱-->
              <router-link
              :to="`/product/${product.id}`"
              class="text-decoration-none text-dark d-block text-truncate stretched-link">{{
                product.title
              }}</router-link>
            </h4>
            <div class="h6 text-muted mt-3" v-if="!product.price">
              NT$ {{ $toCurrency(product.origin_price ) }}
            </div>
            <del class="h6" v-if="product.price">NT$ {{ $toCurrency(product.origin_price ) }}</del>
            <div class="h5" v-if="product.price">NT$ {{ $toCurrency(product.price) }}</div>
            <template v-else>
                <!-- 購物車按鈕 -->
                <button
                  type="button"
                  class="product__list__functionBtn btn btn-link p-2 me-1"
                  :class="{ disabled: isLoading.itemID }"
                  @click="addCart(item)"
                  v-if="!checkCartsData(item.id)"
                >
                  <i class="bi bi-bag-plus"></i>
                </button>
                <!-- 已加入購物車 -->
                <button type="button" class="btn btn-link link-dark p-2 me-1" v-else>
                  <i class="bi bi-bag-plus"></i>
                </button>
              </template>
          </div>
        </div>
      </div>
    </div>
    <nav class="d-flex justify-content-center">
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
    <Toast ref="toast"/>
  </div>
</template>

<script>
// import ProductsImg from '../../components/productsImg.vue';

// import AddToCart from '../../components/ADDtocart.vue';

// import Pagination from '../../components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.products = res.data.products;
      })
        .catch(() => {
          this.$refs.toast.showToast('無法取得商品全部資料', 'error');
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/stylesheets/all";

.card{
    border-radius: 4px;
    background: #fff;
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),
    .3s box-shadow,
    .3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
    cursor: pointer;
}

.card:hover{
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>
