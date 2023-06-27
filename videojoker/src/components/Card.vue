<template>
    <div class="card">
      <div class="card-value">{{ card.value }}</div>
      <div class="card-suit">{{ card.suit }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      card: Object
    }
  }
  </script>