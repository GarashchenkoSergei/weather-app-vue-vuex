import axios from 'axios'
// library to identify the country
const crg = require('country-reverse-geocoding').country_reverse_geocoding()

const weather = {
  namespaced: true,
  state: {
    city: '',
    country: '',
    current: {},
    daily: [],
    isLoading: false
  },
  actions: {
    async fetchData ({ commit }, cityName) {
      try {
        commit('SET_LOADING', true)
        // openweathermap API returns differently structured information for one day request and week request
        // we need to requests to receive all required information
        const apiId = 'aca185f1e6a42aac039fe91064bb49e8'
        const { data: currentData } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiId}&units=metric`)
        commit('SET_LOADING', false)
        const { lat, lon } = currentData.coord
        // country identifying method
        const country = crg.get_country(lat, lon)
        const excludeInfoForDaily = ['alerts', 'current', 'hourly', 'minutely']

        commit('SET_CURRENT_CITY', currentData.name)
        commit('SET_CURRENT_COUNTRY', country.name)
        commit('SET_CURRENT_WEATHER', currentData)

        const { data: dailyData } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludeInfoForDaily.join()}&appid=${apiId}&units=metric`)
        // return 7 next days of 8 provided
        dailyData.daily.shift()
        commit('SET_DAILY_WEATHER', dailyData.daily)

        return dailyData
      } catch (error) {
        commit('SET_LOADING', false)
        throw new Error(
          error.response.data.error || error.response.data.message
        )
      }
    }
  },
  getters: {},
  mutations: {
    SET_CURRENT_CITY (state, cityName) {
      state.city = cityName
    },
    SET_CURRENT_COUNTRY (state, countryName) {
      state.country = countryName
    },
    SET_CURRENT_WEATHER (state, currentWeather) {
      state.current = currentWeather
    },
    SET_DAILY_WEATHER (state, dailyWeather) {
      state.daily = dailyWeather
    },
    SET_LOADING (state, isLoading) {
      state.isLoading = isLoading
    }
  }
}

export default weather
