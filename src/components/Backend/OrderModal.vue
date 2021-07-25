<template>
  <div
    class="modal fade"
    ref="orderModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title h5">修改訂單</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="orderForm">
          <div class="modal-body">
            <table class="table table-bordered border-secondary">
              <tbody>
                <tr>
                  <th>Order lead time </th>
                  <td>{{ new Date(order.create_at * 1000).toLocaleString() }}</td>
                </tr>
                <tr>
                  <th>Order ID</th>
                  <td>{{ order.id }}</td>
                </tr>
                <tr>
                  <th>Orderer</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>Product List</th>
                  <td>
                    <p class="d-flex mb-0" v-for="item in order.products" :key="item.product.id">
                      {{ item.product.title }} x {{ item.qty }} {{ item.product.unit }}=
                      <span class="ms-auto">${{ Math.floor(item.final_total) }}</span>
                    </p>
                    <p class="text-end mb-0 border-top pt-1">
                      Total : ${{ Math.floor(order.total) }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <th>Coupon</th>
                  <td>{{ percent }}折</td>
                </tr>
                <tr>
                  <th>Note</th>
                  <td>{{ order.message }}</td>
                </tr>
                <tr>
                  <th>Payment</th>
                  <td>{{ order.is_paid ? '已付款' : '未付款' }}</td>
                </tr>
              </tbody>
            </table>
            <div class="col">
              <label for="editTotal" class="form-label"
                >Change Price
                <span class="text-danger">*</span>
              </label>
              <Field
                id="editTotal"
                name="Change Price"
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors['Change Price'] }"
                rules="min_value:0"
                v-model="order.total"
              ></Field>
              <error-message name="Change Price" class="invalid-feedback"></error-message>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="editTotal">
              EDIT
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: {},
      order: {
        user: {},
      },
      percent: 0,
    };
  },
  emits: ['editToal'],
  props: ['data'],
  methods: {
    editTotal() {
      this.$emit('editToal', this.order);
      this.hideModal();
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    getPercent() {
      const FirstProduct = Object.keys(this.order.products)[0];
      this.percent = this.order.products[FirstProduct].coupon
        ? `${this.order.products[FirstProduct].coupon.percent}`
        : 'Not useing';
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal);
  },
  watch: {
    data(value) {
      this.order = value;
      this.getPercent();
    },
  },
};
</script>
