<template>
  <div class="sticky-top bg-white ps-2 py-3 mb-1">
    <h2 class="h3">ORDERS</h2>
    <div class="d-flex justify-content-xl-end">
      <Page
        :pages="totalPages"
        :currentPage="currentPage"
        @display-page="getOrders"
        class="me-2"
      ></Page>
    </div>
  </div>

  <table class="table my-3">
    <thead>
      <tr>
        <th width="120">Orderer</th>
        <th>Email</th>
        <th width="120">Phone</th>
        <th width="120">Address</th>
        <th width="100">Products</th>
        <th width="120">Total</th>
        <th width="120">Payment</th>
        <th width="120">EDIT</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filterData"
        :key="item.id"
        :class="{ 'table-primary': item.is_paid }"
      >
        <td>{{ item.user.name }}</td>
        <td>{{ item.user.email }}</td>
        <td>{{ item.user.tel }}</td>
        <td>{{ item.user.address }}</td>
        <td>
          <p
            v-for="productItem in item.products"
            :key="productItem.product.id"
            class="mb-0"
          >
            {{ productItem.product.title }}
          </p>
        </td>
        <td>{{ item.total }}</td>
        <td>
          <!--ON/OFF-->
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="item.id"
              :checked="item.is_paid"
              @change="putOrder(item, 'isPaid')"
            />
            <label class="form-check-label" :for="item.id">
              {{ item.is_paid ? "ON" : "OFF" }}
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
            @click="openEditModal(item)"
            :class="{ disabled: item.is_paid }"
          >
            EDIT
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger move deleteBtn"
            @click="opendeleteModal(item)"
            :class="{ disabled: !item.is_paid }"
          >
            DELETE
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <OrderModal
    ref="orderModal"
    :data="tempOrder"
    @edit-total="putOrder"
  ></OrderModal>
  <DelModal
    ref="deleteModal"
    :title="tempOrder.user.name"
    @delete-data="deleteOrder"
  >
  </DelModal>
</template>

<script>
import OrderModal from '@/components/Backend/OrderModal.vue';

import DelModal from '@/components/Backend/DeleteModal.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
        user: {},
      },
      currentPage: 1,
      totalPages: 0,
    };
  },
  components: {
    OrderModal,
    DelModal,
  },
  methods: {
    getOrders(page = this.currentPage) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading.status = true;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.totalPages = res.data.pagination.total_Pages;
            this.isLoading.status = false;
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('Fail', 'error');
        });
    },
    putOrder(item, action) {
      const orderObj = { data: { ...item } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${orderObj.data.id}`;
      this.isLoading.itemID = item.id;
      if (action === 'isPaid') {
        orderObj.data.is_paid = !orderObj.data.is_paid;
      }
      this.$http
        .put(url, orderObj)
        .then((res) => {
          if (res.data.success) {
            this.swal(res.data.message);
            this.getOrders();
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('Fail', 'error');
        });
    },
    deleteOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading.itemID = this.tempOrder.id;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$refs.deleteModal.hideModal();
            this.getOrders();
            this.swal(res.data.message);
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('Fail', 'error');
        });
    },
    openDeleteModal(item) {
      this.tempOrder = { ...item };
      this.$refs.deleteModal.showModal();
    },
    openEditModal(item) {
      this.tempOrder = JSON.parse(JSON.stringify(item));
      this.$refs.orderModal.showModal();
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
