<template>
  <div class="sticky-top bg-white ps-2 py-3 mb-1">
    <h2 class="h3">Product List</h2>
    <div class="d-flex justify-content-xl-end">
      <button
        type="button"
        class="
          btn btn-sm btn-primary
          d-inline-flex
          align-items-center
          mb-5 mb-lg-6
        "
        @click="openProductModal('this.product')"
      >
        <span class="material-icons fs-4 me-2"> add </span>
        ADD COUPON
      </button>
    </div>
  </div>

  <table class="table my-3">
    <thead>
      <tr>
        <th width="120">Category</th>
        <th>Product Image</th>
        <th width="120">Title</th>
        <th width="120">Distribution</th>
        <th width="100">Price</th>
        <th width="120">Arrival</th>
        <th width="120">Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filterData"
        :key="item.id"
        :class="{ 'table-primary': item.is_enabled }"
      >
        <td>{{ item.category }}</td>
        <td>
          <img
            :src="item.imageUrl"
            :alt="item.title"
            style="width: 120px; height: 100px"
            class="img-thumbnail"
          />
        </td>
        <td>{{ item.title }}</td>
        <td>{{ item.description }}</td>
        <td>{{ $filters.currency(item.price) }}</td>
        <td>
          <!--ON/OFF-->
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="item.id"
              :checked="item.is_enabled"
              @change="putProduct(item, 'isEnabled')"
            />
            <label class="form-check-label" :for="item.id">
              {{ item.is_enabled ? "ON" : "OFF" }}
              <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
                v-if="isLoading.itemID === item.id"
              ></span>
            </label>
          </div>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            @click="openProductModal(item)"
            :class="{ disabled: item.is_enabled }"
          >
            EDIT
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger move deleteBtn"
            @click="openDeleteModal(item)"
            :class="{ disabled: item.is_enabled }"
          >
            DELETE
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="productModal"
    :product-data="tempProduct"
    @update="getProducts"
  ></ProductModal>
  <DelModal
    ref="deleteModal"
    :title="tempCoupon.code"
    @delete-data="deleteCouon"
    tab="product"
  >
  </DelModal>
</template>
