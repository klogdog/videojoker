<template>
  <div>
    <button @click="shuffleDeck">Shuffle</button>
    <hand :draw="draw"></hand>
  </div>
</template>

<script>
import Hand from './Hand.vue';

export default {
  name: 'Deck',
  components: {
    Hand
  },
  data() {
    return {
      deck: [],
      suits: ['hearts', 'diamonds', 'clubs', 'spades'],
      values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    }
  },
  methods: {
    createDeck() {
      this.deck = [];
      for (let suit of this.suits) {
        for (let value of this.values) {
          this.deck.push({ suit, value });
        }
      }
    },
    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    },
    draw(number) {
      return this.deck.splice(0, number);
    }
  },
  created() {
    this.createDeck();
    this.shuffleDeck();
  }
}
</script>
