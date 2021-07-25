<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <!--Breadcrumb-->
      <ol class="breadcrumb pt-5">
        <li class="breadcrumb-item">
          <a href="#" class="link-primary text-decoration-none">Home</a>
        </li>
        <li class="breadcrumb-item">
          <router-link
            to="/products"
            class="link-primary d-inline text-decoration-none"
            >Posters</router-link
          >
        </li>
        <li class="breadcrumb-item">
          <router-link
            to="/productcategory"
            class="link-primary d-inline text-decoration-none"
            >Posters</router-link
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ this.product.category }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-between mt-2 mb-7">
      <div class="col-md-8">
        <div class="my-4">
          <img
            src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
            alt=""
            class="img-fluid mt-4"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="container pt-5">
          <h2 class="mb-0">{{ product.title }}</h2>
          <p class="fw-bold">NT$1,200</p>
        </div>

        <div class='d-flex justify-content-between border-bottom pb-lg-2 mb-3'>
          <h2 class="mb-2 mb-lg-3">{{ this.product.title }}</h2>
          <a
            href="#"
            class="material-icons link-primary opacity-70"
            @click.prevent="addFavorite(this.productData)"
            v-if="favoritesData.includes(this.productData.id)"
          >
            favorite
          </a>
          <a
            href="#"
            class="material-icons link-primary opacity-70"
            @click.prevent="addFavorite(this.productData)"
            v-else
          >
            favorite_border
          </a>
        </div>
        <ul class="border-bottom mb-4 mb-lg-5">
          <h4 class="fs-3 text-primary fw-bold">
            NT$ {{ $filters.thousands(this.product.origin_price) }}
            <del class="opacity-50 text-light fw-normal ms-3">
              NT$ {{ $filters.thousands(this.product.price) }}</del
            >
          </h4>
        </ul>
        <div class="input-group input-group-sm w-lg-50 pe-lg-2 mb-4">
          <button
            class="btn border link opacity-80"
            type="button"
            @click="removeQty"
            :class="{ disabled: this.qty <= 1 }"
          >
            <span
              class="material-icons"
              data-cursor="cursor"
              :class="{ 'opacity-50': this.qty <= 1 }"
            >
              remove
            </span>
          </button>
          <input
            type="number"
            class="form-control text-center"
            v-model.number="qty"
            :class="{ 'text-secondary': !this.productData.inStock }"
          />
          <button
            class="btn border link opacity-80"
            type="button"
            @click="addQty"
            :class="{ disabled: !this.productData.inStock }"
          >
            <span
              class="material-icons"
              data-cursor="cursor"
              :class="{ 'opacity-50': !this.productData.inStock }"
            >
              add
            </span>
          </button>
        </div>
        <div class="d-flex justify-content-between">
          <button
            type="button"
            class="
              btn btn-sm btn-primary
              d-flex
              align-items-center
              justify-content-center
              fs-5
              w-100
            "
            :class="{ disabled: !this.product.inStock }"
            @click="addCart(this.product.id, this.qty)"
          >
            <Spinner class="spinner my-2" v-if="isSpinner" />
            <span class="material-icons me-2" v-else data-cursor="cursor">
              shopping_cart
            </span>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-7">
    <div class="col">
      <ul class="nav nav-tabs py-0" id="myTab" role="tablist">
        <li class="nav-item w-50 w-md-auto" role="presentation">
          <button
            class="nav-link link w-100 active py-3"
            id="introduction-tab"
            data-bs-toggle="tab"
            data-bs-target="#introduction"
            type="button"
            role="tab"
            aria-controls="introduction"
            aria-selected="true"
            data-cursor="cursor"
          >
            INTRODUCTION
          </button>
        </li>
        <li class="nav-item w-50 w-md-auto" role="presentation">
          <button
            class="nav-link link w-100 py-3"
            id="shopping_guide-tab"
            data-bs-toggle="tab"
            data-bs-target="#shopping_guide"
            type="button"
            role="tab"
            aria-controls="shopping_guide"
            aria-selected="false"
            data-cursor="cursor"
          >
            SHOPPING GUIDE
          </button>
        </li>
      </ul>
      <div class="tab-content bg-black-opacity-50 p-5 p-lg-7" id="myTabContent">
        <div
          class="tab-pane fade show text-secondary active"
          id="introduction"
          role="tabpanel"
          aria-labelledby="introduction-tab"
        ></div>
        <div
          class="tab-pane fade text-secondary"
          id="shopping_guide"
          role="tabpanel"
          aria-labelledby="shopping_guide-tab"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/assets/javascript/emitter';

import Spinner from '../../components/Spinner.vue';

export default {
  data() {
    return {
      product: {},
      id: '',
      isSpinner: false,
      qty: 1,
    };
  },
  components: {
    Spinner,
  },
  props: {
    favoritesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  inject: ['emitter', '$alertState'],
  emits: ['sidebarShow', 'sidebarHide'],
  methods: {
    getProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
          this.$emit('sidebarHide');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addToCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isSpinner = true;
      const cart = {
        data: {
          product_id: this.product.id,
          // qty,
        },
      };
      this.$http
        .post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$emit('sidebarShow');
            emitter.emit('update-cart');
          } else {
            this.$alertState(res.data.success, 'Add to cart');
          }
          this.isSpinner = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Qtyadd() {
      this.qty += 1;
    },
    Qtyreduce() {
      if (this.qty > 1) {
        this.qty -= 1;
      }
    },
  },
  watch: {
    qty() {
      if (this.qty <= 1) {
        this.qty = 1;
      }
    },
  },
  mounted() {
    console.log(this.$route);
    this.id = this.$route.params.id;
    this.getProduct();
  },
};
</script>
