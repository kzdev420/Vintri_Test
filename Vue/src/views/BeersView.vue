<script>
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";

import { useBeerStore } from "../stores/store";

export default defineComponent({
  setup() {
    let beers = ref([]);
    return {
      beers,
    };
  },
  async mounted() {
    const beerStore = useBeerStore();
    this.beers = await beerStore.getBeers();
  },
});
</script>

<template>
  <div class="beers">
    <table border="1px solid">
      <thead align="center">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>First Brewed</th>
          <th>Food Pairing</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beer in beers" :key="beer.id">
          <td>{{ beer.id }}</td>
          <td>{{ beer.name }}</td>
          <td>{{ beer.description }}</td>
          <td>{{ beer.first_brewed }}</td>
          <td>{{ beer.food_pairing.join(", ") }}</td>
          <td>
            <RouterLink :to="{ name: 'beer', params: { id: beer.id } }">View</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .beers {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
