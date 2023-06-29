<template>
  <div class="hand-container">
    <div v-for="(card, index) in hand" :key="index" class="card-container">
      <poker-card :card="card" :held="heldStatus[index]" @cardClick="toggleHold(index)"></poker-card>
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
    heldStatus: {
      type: Array,
      required: true
    },
  },
  methods: {
    toggleHold(index) {
      this.$emit('toggleHold', index);
    },
  }
}
</script>

<style scoped>
.hand-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.card-container {
  flex: 1;
}
</style>
