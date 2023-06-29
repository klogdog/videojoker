<template>
  <div class="game-container">
    <card-hand :hand="hand" :heldStatus="heldCards" @toggleHold="toggleHold"></card-hand>
    <button class="control-button" @click="handleButtonClick">{{ buttonText }}</button>
    <card-deck ref="cardDeck"></card-deck>
    <div v-if="gameOver">
      <h1>Game Over</h1>
    </div>
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
      gameState: 'start',  // can be 'start', 'draw', 'gameOver'
      gameOver: false
    }
  },
  computed: {
    buttonText() {
      return this.gameState.charAt(0).toUpperCase() + this.gameState.slice(1);
    }
  },
  methods: {
    startGame() {
      this.$refs.cardDeck.prepareDeck();
      this.hand = this.$refs.cardDeck.draw(5);
      this.gameState = 'draw';
    },
    toggleHold(index) {
      this.heldCards[index] = !this.heldCards[index];
    },
    drawNewCards() {
      for (let i = 0; i < this.hand.length; i++) {
        if (!this.heldCards[i]) {
          let newCard = this.$refs.cardDeck.draw(1);
          if(newCard.length === 0) {
            console.log("The deck is empty.");
            return;
          }
          this.hand.splice(i, 1, newCard[0]);
        }
      }
      this.heldCards = Array(5).fill(false);
      this.scoreHand();
      this.gameOver = true; // Mark the game as over after scoring the hand
      this.gameState = 'gameOver';
    },
    scoreHand() {
      console.log("Scoring hand: ", this.hand);
    },
    restartGame() {
      this.hand = [];
      this.heldCards = Array(5).fill(false);
      this.gameState = 'start';
      this.gameOver = false;
    },
    handleButtonClick() {
      if(this.gameState === 'start') {
        this.startGame();
      } else if(this.gameState === 'draw') {
        this.drawNewCards();
      } else if(this.gameState === 'gameOver') {
        this.restartGame();
      }
    }
  }
}
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control-button {
  margin-top: 20px;
}
</style>
