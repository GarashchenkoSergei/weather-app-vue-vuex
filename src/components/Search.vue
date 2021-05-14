<template>
  <div>
    <h1 class="text-center mt-5">Search for the weather in your city:</h1>
    <b-input-group size="lg" class="mt-5">
      <b-form-input
        placeholder="Start typing your city name here..."
        v-model.trim="cityName"
        @keyup.enter="fetchWeatherInfo"
        :class="{invalid: ($v.cityName.$dirty && !$v.cityName.required) || ($v.cityName.$dirty && !$v.cityName.minLength)}"
      ></b-form-input>
      <b-input-group-append>
        <b-button size="sm" text="Button" variant="info"><b-icon icon="search" @click="fetchWeatherInfo"></b-icon></b-button>
      </b-input-group-append>
    </b-input-group>
    <div class="error mt-2" v-if="!$v.cityName.required">City name is required</div>
    <div class="error mt-2" v-if="!$v.cityName.minLength">City name must have at least {{$v.cityName.$params.minLength.min}} letters.</div>
    <div class="error mt-2" v-if="errorMessage">{{errorMessage}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    cityName: '',
    errorMessage: ''
  }),
  validations: {
    cityName: {
      required,
      minLength: minLength(2)
    }
  },
  methods: {
    ...mapActions('weather', ['fetchData']),
    async fetchWeatherInfo () {
      this.errorMessage = ''

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.fetchData(this.cityName)
      } catch (error) {
        this.errorMessage = error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .form-control:focus.invalid,
  .invalid {
    border-color: #DD3444;
    box-shadow: 0 0 0 0.2rem rgba(221, 52, 68, 0.3);
  }
</style>
