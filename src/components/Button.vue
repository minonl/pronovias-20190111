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
  button {
    border: none;
    border-radius: 3px;
    padding: .5em 1em;
    color: white;
    background-color: #ae9a64;
    outline: none;
    cursor: pointer;
    @media screen and (min-width: 370px){
      font-size: 1rem;
    }
  }
</style>
