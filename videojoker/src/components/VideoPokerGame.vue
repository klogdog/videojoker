<template>
  <div>
    <button @click="startGame">Start Game</button>
    <card-hand :hand="hand" :heldStatus="heldCards" @toggleHold="toggleHold" @drawNewCards="drawNewCards"></card-hand>
    <card-deck ref="cardDeck"></card-deck>
  </div>
</template>

<script>
import CardDeck from './CardDeck.vue';
import CardHand from './CardHand.vue';

export default {
  name: 'VideoPokerGame',
  components: {
    CardDeck,
    CardHand
  },
  data() {
    return {
      hand: [],
      heldCards: Array(5).fill(false),
    }
  },
  methods: {
    startGame() {
      this.hand = this.$refs.cardDeck.draw(5);
    },
    toggleHold(index) {
      this.heldCards[index] = !this.heldCards[index];
    },
    drawNewCards() {
      for (let i = 0; i < this.hand.length; i++) {
        if (!this.heldCards[i]) {
          this.hand.splice(i, 1, this.$refs.cardDeck.draw(1)[0]);
        }
      }
      this.heldCards = Array(5).fill(false);
    },
  }
}
</script>
