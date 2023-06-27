<template>
  <div class="hand-container">
    <div v-for="(card, index) in hand" :key="card.value + card.suit" class="card-container">
      <poker-card :card="card" @cardClick="toggleHold(index)"></poker-card>
    </div>
  </div>
</template>

<script>
import PokerCard from './PokerCard.vue';

export default {
  name: 'CardHand',
  components: {
    PokerCard
  },
  props: {
    hand: {
      type: Array,
      required: true
    },
  },
  methods: {
    toggleHold(index) {
      this.$emit('toggleHold', index);
    }
  }
}
</script>

<style scoped>
.hand-container {
  display: flex;
  justify-content: space-between;
}

.card-container {
  flex: 1;
}
</style>
