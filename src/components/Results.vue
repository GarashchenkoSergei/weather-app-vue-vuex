<template>
  <div>
    <div align="center" v-if="isLoading">
      <b-spinner variant="info" label="Spinning" class="mt-5"></b-spinner>
    </div>
    <div align="center" v-if="city">
      <b-button-group class="mt-5">
        <b-button
          v-for="time in timePeriods"
          :key="time.title"
          :to="'/home/' + time.template"
          class="text-uppercase"
          variant="info"
        >
          {{time.title}}
        </b-button>
      </b-button-group>
      <h3 class="mt-4">{{city}}</h3>
      <h4 class="mt-4">{{country}}</h4>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    timePeriods: [
      {
        title: 'current',
        template: 'current'
      },
      {
        title: '7 day forecast',
        template: 'week'
      }
    ]
  }),
  computed: {
    ...mapState('weather', {
      city: state => state.city,
      country: state => state.country,
      isLoading: state => state.isLoading
    })
  },
  watch: {
    city (val) {
      if (val) {
        this.$router.push('/home/current')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .router-link-active {
    background-color: darken(#17a2b8, 10%);
    border-color: darken(#17a2b8, 10%);
  }
</style>
