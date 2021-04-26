<template>
  <div class="spinner">
    <div class="bounce"></div>
    <div class="bounce"></div>
    <div class="bounce"></div>
    <div class="bounce"></div>
    <div class="bounce"></div>
  </div>
</template>

<style lang="scss" scoped>
$db: 5;
$meret: 3rem;
.spinner {
  margin: 100px auto 0;
  width: ($meret + 0.4rem) * $db;
  text-align: center;
}

.spinner > div {
  width: $meret;
  height: $meret;
  margin: 0.2rem;
  background-color: $dark;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

@for $i from 1 to $db + 1 {
  .spinner .bounce:nth-child(#{$i}) {
    animation-delay: 0.16s * $i;
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
