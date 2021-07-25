<template>
  <div class="sticky-top bg-white ps-2 py-3 mb-1">
    <h2 class="h3">COUPONS</h2>
    <div class="d-flex justify-content-xl-end">
      <button
        type="button"
        class="
          btn btn-sm btn-primary
          d-inline-flex
          align-items-center
          mb-5 mb-lg-6
        "
        @click="openCopponModal('this.coupon')"
      >
        <span class="material-icons fs-4 me-2"> add </span>
        ADD COUPON
      </button>
    </div>
  </div>

  <table class="table my-3">
    <thead>
      <tr>
        <th width="120">Coupon</th>
        <th>Coupon code</th>
        <th width="120">Discount Rate</th>
        <th width="120">Deadline</th>
        <th width="100">ON/OFF</th>
        <th width="120">EDIT</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filterData"
        :key="item.id"
        :class="{ 'table-primary': item.is_enabled }"
      >
        <td>{{ item.title }}</td>
        <td>{{ item.code }}</td>
        <td>{{ item.percent }}</td>
        <td>{{ new Data(item.due_date).toLocaleString() }}</td>
        <td>
          <!--ON/OFF-->
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="item.id"
              :checked="item.is_enabled"
              @change="OnCoupon(item)"
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
            @click="openCouponModal(item)"
            :class="{ disabled: item.is_enabled }"
          >
            EDIT
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger move deleteBtn"
            @click="opendeleteModal(item)"
            :class="{ disabled: item.is_enabled }"
          >
            DELETE
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <CouponModal
    ref="couponModal"
    :coupon-data="tempCoupon"
    @update="getCoupons"
  ></CouponModal>
  <DelModal
    ref="deleteModal"
    :title="tempCoupon.code"
    @delete-data="deleteCouon"
  >
  </DelModal>
</template>

<script>
import CouponModal from '@/components/Backend/CouponModal.vue';

import DelModal from '@/components/Backend/DeleteModal.vue';

export default {
  data() {
    return {
      coupons: [],
      coupon: {
        title: '',
        percent: 0,
        code: '',
      },
      tempCoupon: {},
      currentPage: 1,
      totalPages: 0,
    };
  },
  components: {
    CouponModal,
    DelModal,
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading.status = true;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.coupons = res.data.coupons;
            this.totalPages = res.data.pagination.total_pages;
            this.currentPage = res.data.pagination.current_page;
            this.isLoading.status = false;
          } else {
            this.swal(res.data.message, 'error');
          }
        })
        .catch(() => {
          this.swal('Fail', 'error');
        });
    },
    // check coupon used or not
    putCoupon(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      const couponObj = { data: { ...item } };
      this.isLoading.itemID = item.id;
      if (couponObj.data.is_enabled === 0) {
        couponObj.data.is_enabled = 1;
      } else {
        couponObj.data.is_enabled = 0;
      }
      this.$http
        .put(url, couponObj)
        .then((res) => {
          if (res.data.success) {
            this.loading = false;
            this.getCoupons();
            this.swal(res.data.message);
            this.isLoading.itemID = '';
          } else {
            this.swal(res.data.message, 'error');
          }
        }).catch(() => {
          this.swal('Fail', 'error');
        });
    },
    deleteCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.loading.itemID = this.tempCoupon.id;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$refs.deleteModal.hideModal();
            this.getCoupons();
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
    openCouponModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.couponModal.showModal();
    },
    openDeleteModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.deleteModal.showModal();
    },
    created() {
      this.getCoupons();
    },
  },
};
</script>
