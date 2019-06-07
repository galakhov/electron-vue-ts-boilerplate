<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <LandingPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// @ is an alias to /src
import LandingPage from "@/components/LandingPage.vue";

@Component({
  components: {
    LandingPage,
  },
})
export default class Home extends Vue {}
</script>