<template>
  <div class="game-container">
    <div class="score-container">
      Score: {{ totalScore }}
    </div>
    <card-hand :hand="hand" :heldStatus="heldCards" @toggleHold="toggleHold"></card-hand>
    <button class="control-button" @click="handleButtonClick">{{ buttonText }}</button>
    <card-deck ref="cardDeck"></card-deck>
    <div v-if="gameOver">
      <h1>{{ message }}</h1>
    </div>
  </div>
</template>

<script>
import CardDeck from './CardDeck.vue';
import CardHand from './CardHand.vue';
import { scoreHand } from '../utils/scoring';

export default {
  name: 'VideoPokerGame',
  components: {
    CardDeck,
    CardHand
  },
  data() {
    return {
      hand: Array(5).fill({ suit: undefined, value: undefined }),
      heldCards: Array(5).fill(false),
      gameState: 'start',
      gameOver: false,
      score: 0,
      totalScore: 0,
      message: '',
      isKeydownFired: false
    }
  },
  computed: {
    buttonText() {
      return this.gameState.charAt(0).toUpperCase() + this.gameState.slice(1);
    }
  },
  methods: {
    startGame() {
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
      let result = scoreHand(this.hand);
      this.score = result.score;
      this.message = result.message;
      this.totalScore += this.score;
      this.gameOver = true;
      this.gameState = 'gameOver';
    },
    restartGame() {
      this.$refs.cardDeck.prepareDeck();
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
    },
    handleKeydown(event) {
      if (event.repeat || this.isKeydownFired) return;
      
      const keyMappings = {
        'a': 0,
        's': 1,
        'd': 2,
        'f': 3,
        'g': 4,
      };

      if (Object.prototype.hasOwnProperty.call(keyMappings, event.key) && this.gameState !== 'gameOver') {
        this.toggleHold(keyMappings[event.key]);
      } else if (event.key === ' ') {
        this.handleButtonClick();
      }
      
      this.isKeydownFired = true;
      setTimeout(() => this.isKeydownFired = false, 100);
    },
  },
  mounted() {
    this.restartGame();
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.score-container {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
}

.control-button {
  margin-top: 20px;
}
</style>
