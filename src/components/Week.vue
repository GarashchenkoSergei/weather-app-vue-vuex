<template>
  <b-card-group deck class="mt-5">
    <b-card
      v-for="day in dailyWeather"
      :key="day.dt"
      tag="article"
      style="max-width: 15rem; min-width: 8rem;"
      class="mb-2"
      border-variant="info"
    >
      <b-img :src="'http://openweathermap.org/img/w/' + day.weather[0].icon + '.png'" alt="weather icon"></b-img>
      <b-card-text>
        Average temp:<br/>
        {{day.temp.eve}} &deg;c
      </b-card-text>
      <b-card-text class="desc">
        {{day.weather[0].description}}
      </b-card-text>
      <b-card-text>
        {{new Date(day.sunrise * 1000).toLocaleString()}}
      </b-card-text>
    </b-card>
  </b-card-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('weather', {
      dailyWeather: state => state.daily
    })
  }
}
</script>

<style scoped lang="scss">
  .desc {
    text-transform: capitalize;
  }
</style>
