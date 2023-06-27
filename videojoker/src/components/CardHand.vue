<template>
  <div class="hand-container">
    <div v-for="(card, index) in hand" :key="card.value + card.suit" class="card-container">
      <poker-card :card="card" :held="heldCards[index]" @cardClick="toggleHold(index)"></poker-card>
    </div>
    <button @click="drawNewCards">Draw</button>
  </div>
</template>

<script>
import PokerCard from './PokerCard.vue';

export default {
  name: 'CardHand',
  components: {
    PokerCard
  },
  props: {
    hand: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      heldCards: Array(5).fill(false)
    }
  },
  methods: {
    toggleHold(index) {
      this.heldCards[index] = !this.heldCards[index];
    },
    drawNewCards() {
      this.$emit('replace', this.heldCards);
    }
  }
}
</script>

<style scoped>
.hand-container {
  display: flex;
  justify-content: space-between;
}

.card-container {
  flex: 1;
}
</style>
