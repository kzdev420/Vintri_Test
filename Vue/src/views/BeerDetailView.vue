<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import { useBeerStore } from "../stores/store";

export default defineComponent({
  setup() {
    const route = useRoute();
    const beerStore = useBeerStore();

    const id = ref(route.params.id);
    const beer = ref({});
    const rating = ref(1);
    const comments = ref("");

    async function sendFeedback() {
      const res = await beerStore.sendFeedback(id.value, {
        rating: rating.value,
        comments: comments.value,
      });
      if (res) alert("Success");
      else alert("Failed");
    }

    return {
      id,
      beer,
      beerStore,
      sendFeedback,
      rating,
      comments,
    };
  },

  mounted() {
    this.beer = this.beerStore.getBeerbyId(this.id);
  },
});
</script>

<template>
  <div class="beer-detail">
    <table>
      <tbody>
        <tr>
          <td style="width: 100px">ID:</td>
          <td>{{ beer.id }}</td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>{{ beer.name }}</td>
        </tr>
        <tr>
          <td>Description:</td>
          <td>{{ beer.description }}</td>
        </tr>
        <tr>
          <td>First Brewed:</td>
          <td>{{ beer.first_brewed }}</td>
        </tr>
        <tr>
          <td>Food Pairing:</td>
          <td>{{ beer.food_pairing?.join(", ") }}</td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="sendFeedback">
      <input type="number" v-model="rating" />
      <input type="text" v-model="comments" />
      <button>Send</button>
    </form>
  </div>
</template>
