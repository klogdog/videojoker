<!-- Hand.vue -->
<template>
  <div class="hand-container">
    <div v-for="(card, index) in hand" :key="card.value + card.suit" class="card-container">
      <card :card="card" :held="heldCards[index]" @click.native="holdOrReplace(index)"></card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'Hand',
  components: {
    Card
  },
  props: {
    hand: {
      type: Array,
      required: true
    },
    replace: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      heldCards: Array(5).fill(false)
    }
  },
  methods: {
    holdOrReplace(index) {
      if (this.heldCards[index]) {
        this.heldCards[index] = false;
        this.replace(index);
      } else {
        this.heldCards[index] = true;
      }
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
