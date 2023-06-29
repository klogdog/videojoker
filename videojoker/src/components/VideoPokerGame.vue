<template>
  <div class="game-container">
    <card-hand :hand="hand" :heldStatus="heldCards" @toggleHold="toggleHold"></card-hand>
    <button class="control-button" @click="handleButtonClick">{{ buttonText }}</button>
    <card-deck ref="cardDeck"></card-deck>
    <div v-if="gameOver">
      <h1>{{ score }}</h1>
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
      hand: Array(5).fill({ suit: undefined, value: undefined }), // Initializing hand with placeholder cards,
      heldCards: Array(5).fill(false),
      gameState: 'start',  // can be 'start', 'draw', 'gameOver'
      gameOver: false,
      score: ''
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
      this.score = this.scoreHand();
      this.gameOver = true;
      this.gameState = 'gameOver';
    },
    scoreHand() {
  let suits = this.hand.map(card => card.suit);
  let values = this.hand.map(card => card.value);
  values.sort((a, b) => {
    if (['J', 'Q', 'K', 'A'].includes(a)) a = 11 + ['J', 'Q', 'K', 'A'].indexOf(a);
    if (['J', 'Q', 'K', 'A'].includes(b)) b = 11 + ['J', 'Q', 'K', 'A'].indexOf(b);
    return a - b;
  });
  
  let uniqueSuits = [...new Set(suits)];
  let uniqueValues = [...new Set(values)];
  
  // Count occurrences of each card value
  let counts = values.reduce((acc, val) => {
    if (val in acc) {
      acc[val]++;
    } else {
      acc[val] = 1;
    }
    return acc;
  }, {});

  // Check for Royal Flush
  if (uniqueSuits.length === 1 && values.join('') === '10JQKA') {
    return 'Royal Flush';
  }

  // Check for Straight Flush
  if (uniqueSuits.length === 1 && uniqueValues.length === 5 && values[4] - values[0] === 4) {
    return 'Straight Flush';
  }

  // Check for Four of a Kind
  if (Object.values(counts).includes(4)) {
    return 'Four of a Kind';
  }

  // Check for Full House
  if (Object.values(counts).includes(3) && Object.values(counts).includes(2)) {
    return 'Full House';
  }

  // Check for Flush
  if (uniqueSuits.length === 1) {
    return 'Flush';
  }

  // Check for Straight
  if (uniqueValues.length === 5 && values[4] - values[0] === 4) {
    return 'Straight';
  }

  // Check for Three of a Kind
  if (Object.values(counts).includes(3)) {
    return 'Three of a Kind';
  }

  // Check for Two Pair
  if (Object.values(counts).filter(val => val === 2).length === 2) {
    return 'Two Pair';
  }

  // Check for Jacks or Better
  if (Object.entries(counts).filter(([key, val]) => ['J', 'Q', 'K', 'A'].includes(key) && val >= 2).length > 0) {
    return 'Jacks or Better';
  }

  return 'No Match';
},
    restartGame() {
      this.$refs.cardDeck.prepareDeck();
      // this.hand = Array(5).fill({ suit: undefined, value: undefined }); // Initializing hand with placeholder cards
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
  },
  mounted() {
    this.restartGame();
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
