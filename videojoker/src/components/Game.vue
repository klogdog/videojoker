<!-- Game.vue -->
<template>
  <div>
    <button @click="startGame">Start Game</button>
    <button v-if="gameStarted" @click="drawHand">Draw</button>
    <hand v-if="gameStarted" :hand="hand" :replace="replace"></hand>
  </div>
</template>

<script>
import Deck from './Deck.vue';
import Hand from './Hand.vue';

export default {
  name: 'Game',
  components: {
    Deck,
    Hand
  },
  data() {
    return {
      gameStarted: false,
      deck: [],
      hand: []
    }
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.deck = this.$refs.deck.createDeck();
      this.$refs.deck.shuffleDeck();
      this.drawHand();
    },
    drawHand() {
      this.hand = this.$refs.deck.draw(5);
    },
    replace(index) {
      this.hand.splice(index, 1, ...this.$refs.deck.draw(1));
      // Check if game is over and score hand
    },
  },
  created() {
    this.startGame();
  }
}
</script>
