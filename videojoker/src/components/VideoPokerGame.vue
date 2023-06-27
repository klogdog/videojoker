<template>
  <div>
    <button @click="startGame">Start Game</button>
    <button v-if="gameState === 'started'" @click="replaceCards">Draw</button>
    <card-hand v-if="gameState === 'started'" :hand="hand" @toggleHold="toggleHold"></card-hand>
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
      gameState: 'idle',  // 'idle', 'started'
      hand: [],
      heldCards: Array(5).fill(false)
    }
  },
  methods: {
    startGame() {
      this.gameState = 'started';
      this.drawHand();
    },
    drawHand() {
      this.hand = this.$refs.cardDeck.draw(5);
    },
    replaceCards() {
      for (let i = 0; i < 5; i++) {
        if (!this.heldCards[i]) {
          this.hand[i] = this.$refs.cardDeck.draw(1)[0];
        }
      }
      this.heldCards = Array(5).fill(false);
      this.scoreHand();
    },
    toggleHold(index) {
      this.heldCards[index] = !this.heldCards[index];
    },
    scoreHand() {
      // Scoring logic here
    },
  }
}
</script>
