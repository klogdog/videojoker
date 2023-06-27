<!-- CardHand.vue -->
<template>
  <div class="hand-container">
    <div v-for="(card, index) in hand" :key="card.value + card.suit" class="card-container">
      <poker-card :card="card" :held="heldCards[index]" @click="holdOrReplace(index)"></poker-card>
    </div>
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
    holdOrReplace(index) {
      this.heldCards[index] = !this.heldCards[index];
      if (!this.heldCards[index]) {
        this.$emit('replace', index);
      }
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
