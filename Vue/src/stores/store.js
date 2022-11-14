import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchBeers, addFeedback } from "../utils";

export const useUserStore = defineStore("userStore", () => {
  const user = ref("");
  function setEmail(email) {
    user.value = { email };
  }

  return { user, setEmail };
});

export const useBeerStore = defineStore("beerStore", () => {
  const beers = ref([]);
  const userStore = useUserStore();

  async function getBeers() {
    beers.value = await fetchBeers(userStore.user.email);
    return beers.value;
  }

  function getBeerbyId(id) {
    const beer = beers.value.find((b) => b.id == id);

    return beer;
  }

  async function sendFeedback(id, data) {
    const res = await addFeedback(userStore.user.email, id, data);

    return res;
  }

  return { beers, getBeers, getBeerbyId, sendFeedback };
});
