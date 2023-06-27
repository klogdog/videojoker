<template>
  <div>
    <button @click="startGame">Start Game</button>
    <button v-if="gameStarted" @click="drawHand">Draw</button>
    <card-hand v-if="gameStarted" :hand="hand" @replace="replace"></card-hand>
    <card-deck ref="cardDeck" @deck-ready="handleDeckReady"></card-deck>
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
      gameStarted: false,
      deck: [],
      hand: []
    }
  },
  methods: {
    startGame() {
      this.gameStarted = true;
    },
    drawHand() {
      for (let i = 0; i < 5; i++) {
        this.hand.push(this.deck.pop());
      }
    },
    replace(index) {
      this.hand.splice(index, 1, this.deck.pop());
      // Check if game is over and score hand
    },
    handleDeckReady(deck) {
      this.deck = deck;
      this.drawHand();
    },
  },
  mounted() {
    // Commented this line out.
    // this.$refs.cardDeck.prepareDeck();
  }
}
</script>
