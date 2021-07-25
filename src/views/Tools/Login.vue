<template>
  <section>
    <div class="container px-0">
      <div class="row justify-content-center align-items-center vh-100">
        <div class="col-md-6 col-lg-5">
          <div class="text-cent">
            <h2>LOGIN</h2>
          </div>
          <Form v-slot="{ errors }" @submit="signIN" class="nb-3" ref="form">
            <h3>Welcome to Best furniture</h3>
            <div>
              <div class="mb-7">
                <label for="username" class="form-label visually-hidden"
                  >Email</label
                >
                <Field
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="Email"
                  :class="{ 'is-invalid': errors['Email'] }"
                  rules="email|required"
                  v-model="login.username"
                />
                <error-message
                  name="Email"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-7">
                <label for="password" class="form-label visually-hidden">
                  Password</label
                >
                <div class="input-group">
                  <Field
                    :type="isViewPassword"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    :class="{ 'is-invalid': errors['Password'] }"
                    rules="required"
                    v-model="login.password"
                  />
                  <a
                    href="#"
                    class="link d-flex align-items-center"
                    v-if="!errors['Password']"
                    @click.prevent="passwordState"
                  >
                    <span
                      class="
                        position-absolute
                        top-50
                        end-0
                        translate-middle
                        material-icons
                        poacity-50
                      "
                      v-if="isViewPassword === 'password'"
                    >
                      vision-off</span
                    >
                    <span
                      class="
                        position-absolute
                        top-50
                        end-0
                        translate-middle
                        material-icons
                        poacity-80
                      "
                      v-else
                      >vision-on</span
                    >
                  </a>
                  <erroe-message
                    name="Password"
                    class="invalid-feedback"
                  ></erroe-message>
                </div>
              </div>
              <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                id="loginBtn"
              >
                LOGIN
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/assets/javascript/emitter';

export default {
  data() {
    return {
      isViewPassword: 'password',
      login: {
        email: '',
        password: '',
      },
      cookieData: {
        token: '',
        expired: '',
      },
    };
  },
  inject: ['emitter', '$alertState'],
  methods: {
    passwordState() {
      if (this.isViewPassword === 'password') {
        this.isViewPassword = 'current-password';
      } else {
        this.isViewPassword = 'password';
      }
    },
    singIN() {
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(url, this.login)
        .then((res) => {
          if (res.data.success) {
            this.cookieData.token = res.data.token;
            this.cookieData.expired = res.data.expired;

            document.cookie = `hexToken=${
              this.cookieData.token
            }; expires=${new Date(this.cookieData.expired)}`;
          } else {
            this.$alertState(res.data.success, 'Login');
          }
          this.$refs.form.resetForm();
          emitter.emit('isLoading', (this.isLoading = false));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    emitter.emit('isLoading', (this.isLoading = true));
  },
};
</script>
