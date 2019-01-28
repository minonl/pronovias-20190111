<template>
  <button>
    <slot/>
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/stylesheets/color.scss';

  button {
    border: solid 1px $gold;
    text-indent: .5em;
    border-radius: 3px;
    padding: .5em 4em;
    color: $gold;
    background-color: transparent;
    outline: none;
    letter-spacing: .5em;
    cursor: pointer;
    @media screen and (min-width: 370px){
      font-size: 1rem;
    }
  }
</style>
