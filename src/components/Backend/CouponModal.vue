<template>
  <div
    class="modal fade"
    ref="couponModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title h5 text-primary" v-if="!tempCoupon.id">
            Add Coupon
          </p>
          <p class="modal-title h5" v-else>Edit Coupon</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="reseted"
          ></button>
        </div>
        <Form action="" v-slot="{ errors }" ref="couponForm" @submit="selected">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <label for="couponName" class="form-label"
                  >Name
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="couponName"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Name'] }"
                  rules="required"
                  v-model="tempCoupon.title"
                >
                </Field>
                <error-message
                  name="Name"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="col">
                <label for="couponPercent" class="form-label"
                  >Discount Rate
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="couponPercent"
                  type="number"
                  class="form-control"
                  placeholder="80 為 8 折"
                  :class="{ 'is-invalid': errors['Discount Rate'] }"
                  rules="min_value:0|max_value:99|required"
                  v-model.number="tempCoupon.percent"
                >
                </Field>
                <error-message
                  name="Discount Rate"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="col">
                <label for="couponCode" class="form-label"
                  >Code
                  <span class="text-danger">*</span>
                </label>
                <Field
                  id="couponCode"
                  name="Code"
                  type="text"
                  class="form-control"
                  placeholder="code ex. SUG886"
                  :class="{ 'is-invalid': errors['Code'] }"
                  rules="min:6|required"
                  v-model="tempCoupon.code"
                >
                </Field>
                <error-message
                  name="Code"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="reseted"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="Object.keys(errors).length !== 0"
            >
              <template v-if="tempCoupon.id === undefined">
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  v-if="isLoading.itemID === 'add'"
                ></span
                >Add
              </template>
              <template v-else>
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  v-if="isLoading.itemID"
                ></span
                >EDIT
              </template>
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
      tempCoupon: {
        title: '',
        percent: 0,
        code: '',
      },
    };
  },
  emits: ['update'],
  props: ['couponData'],
  methods: {
    AddCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      const date = new Date();
      const couponObj = { data: { ...this.tempCoupon } };
      date.setDate(date.getDate() + 30);
      couponObj.data.due_date = date.getItem();
      couponObj.data.is_enabled = 0;
      this.isLoading.itemID = 'add';
      this.$http
        .post(url, couponObj)
        .then((res) => {
          if (res.data.success) {
            this.hideModal();
            this.$emit('update');
            this.swal(res.data.message);
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('error');
        });
    },
    putCoupon() {
      const couponObj = { data: { ...this.tempCoupon } };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading.itemID = this.tempCoupon.id;
      this.$http
        .put(url, couponObj)
        .then((res) => {
          if (res.data.success) {
            this.hideModal();
            this.$emit('update');
            this.swal(res.data.message);
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('error');
        });
    },
    selected() {
      if (!this.tempCoupon.id) {
        this.AddCoupon();
      } else {
        this.putCoupon();
      }
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    reseted() {
      this.$refs.couponForm.reseted();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.couponModal);
  },
  watch: {
    couponData(item) {
      this.tempCoupon = item;
    },
  },
};
</script>
