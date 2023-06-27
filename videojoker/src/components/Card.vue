<template>
    <div class="card">
      <div class="card-value">{{ card.value }}</div>
      <img v-if="isFaceCard" class="card-face" :src="faceCardImage" alt="Face Card">
      <div class="card-suit">{{ card.suit }}</div>
    </div>
</template>
  
<script>
  export default {
    name: 'Card',
    props: {
      card: {
        type: Object,
        required: true
      }
    },
    computed: {
      isFaceCard() {
        return ['J', 'Q', 'K', 'A'].includes(this.card.value);
      },
      faceCardImage() {
        if (this.isFaceCard) {
          return `/path/to/${this.card.value}-face-card.png`;
        }
        return '';
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    position: relative;
    width: 100px;
    height: 150px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }
  
  .card-value {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 20px;
  }
  
  .card-face {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
  }
  
  .card-suit {
    font-size: 15px;
  }
  </style>
  