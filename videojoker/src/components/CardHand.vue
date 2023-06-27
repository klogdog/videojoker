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
    },
    drawNewCards() {
      const newHand = [];
      for (let i = 0; i < this.hand.length; i++) {
        if (!this.heldCards[i]) {
          newHand.push(this.$parent.deck.pop());
        } else {
          newHand.push(this.hand[i]);
        }
      }
      this.$emit('replace', newHand);
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
