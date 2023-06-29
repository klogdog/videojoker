<template>
  <div class="poker-card" :class="{ held: held, placeholder: isPlaceholder }" @click="handleCardClick">
    <div class="card-content" v-if="!isPlaceholder">
      <span class="card-value">{{ card.value }}</span>
      <img v-if="isFaceCard" :src="'./images/' + card.value + '-face-card.png'" alt="Face card image" class="face-card-image">
      <div class="card-suit">{{ card.suit }}</div>
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

.face-card-image {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
}
</style>
