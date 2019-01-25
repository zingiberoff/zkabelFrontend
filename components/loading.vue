<template lang="html">
  <transition name="fade">
    <div class="loading-page" v-if="loading">
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">

        <g>
          <title>Layer 1</title>
          <path class="path" id="path1" fill="none" stroke="#dd2c00" stroke-width="40" d=" M 0 20 H 200 L 0 180 h 200"
                transform=""/>

        </g>
      </svg>
      <p>Loading...</p>
    </div>
  </transition>
</template>

<script>
  export default {
    data: () => ({}),
    methods: {
      start() {
        console.log(1);
        this.loading = this.$store.commit('loading', true)
      },
      finish() {
        console.log(0);
        this.loading = this.$store.commit('loading', false)
      }
    },
    computed: {
      loading: {
        set() {
        },
        get() {
          return this.$store.state.loading
        }
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s cubic-bezier(0.6,-0.44, 0.53, 0.99)
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }

  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 1000;

  }

  .path {
    stroke-dasharray: 800;
    stroke-dashoffset: 800;
    animation: dash 2s infinite;
    animation-fill-mode: forwards;
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 800;
    }
    50% {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -800;
    }
  }
</style>
