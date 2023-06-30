<template>
  <div class="poker-card" :class="{ held: held, placeholder: isPlaceholder }" @click="handleCardClick">
    <div class="card-content" v-if="!isPlaceholder">
      <span class="card-value" :class="{ 'red': isRed, 'black': !isRed }">{{ card.value }}</span>
      <div class="card-suit-top-left" :class="{ 'red': isRed, 'black': !isRed }">{{ suitSymbol }}</div>
      <img v-if="isFaceCard" :src="'./images/' + card.value + '-face-card.png'" alt="Face card image" class="face-card-image">
      <div class="card-suit-center" :class="{ 'red': isRed, 'black': !isRed }">{{ suitSymbol }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokerCard',
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    held: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isPlaceholder() {
      return !this.card.value && !this.card.suit;
    },
    isFaceCard() {
      return ['J', 'Q', 'K', 'A'].includes(this.card.value);
    },
    isRed() {
      return this.card.suit === 'hearts' || this.card.suit === 'diamonds';
    },
    suitSymbol() {
      switch (this.card.suit) {
        case 'clubs':
          return '♣';
        case 'diamonds':
          return '♦';
        case 'hearts':
          return '♥';
        case 'spades':
          return '♠';
        default:
          return '';
      }
    }
  },
  methods: {
    handleCardClick() {
      if (!this.isPlaceholder) {
        this.$emit('cardClick');
      }
    }
  }
}
</script>

<style scoped>
.poker-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  width: 100px;
  height: 150px;
  background-color: white;
  margin: 10px;
  border-radius: 10px;
  color: black;
  position: relative;
  transition: 0.3s;
}

.held {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.placeholder {
  background-color: #ddd;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}

.card-value {
  position: absolute;
  top: 5px;
  left: 5px;
}

.card-suit-top-left {
  position: absolute;
  top: 5px;
  right: 5px;
}

.card-suit-center {
  font-size: 2em;
}

.red {
  color: red;
}

.black {
  color: black;
}

.face-card-image {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
}
</style>
