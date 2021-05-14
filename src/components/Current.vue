<template>
  <b-card
    tag="article"
    style="max-width: 20rem;"
    class="mt-5"
    border-variant="info"
  >
    <b-img :src="'http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png'" alt="weather icon"></b-img>
    <b-card-text>
      {{currentWeather.main.temp}} &deg;c
    </b-card-text>
    <b-card-text>
      {{currentWeather.weather[0].main}}
    </b-card-text>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('weather', {
      currentWeather: state => state.current
    })
  }
}
</script>

<style scoped lang="scss">

</style>
