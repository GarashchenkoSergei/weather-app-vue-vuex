<template>
  <div>
    <Search />
    <Results />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import Results from '@/components/Results.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Results
  }
}
</script>
