<template>
  <div class="home">
    <LandingPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route, RawLocation, Next } from 'vue-router';
// @ is an alias to /src
import LandingPage from '@/components/LandingPage.vue';

@Component({
  components: {
    LandingPage,
  },
  props: {
    $route: String,
  },
})
export default class Home extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: Next<Home>) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    // tslint:disable-next-line:no-console
    console.log('going from: ', from.name);
    // tslint:disable-next-line:no-console
    console.log('going to: ', to.name);
    // tslint:disable-next-line:no-console
    console.log('path: ', to.path);
    next(vm => {
      // vm.providerMovies = []; /// <= Here you can define your properties.
      // https://github.com/vuejs/vue-router/issues/1863#issuecomment-391744471
    });
  }
  // beforeRouteUpdate (to: string, from: string, next: string) {
  // called when the route that renders this component has changed,
  // but this component is reused in the new route.
  // For example, for a route with dynamic params `/foo/:id`, when we
  // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
  // will be reused, and this hook will be called when that happens.
  // has access to `this` component instance.
  // },
  beforeRouteLeave(to: Route, from: Route, next: Next<Home>) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    // tslint:disable-next-line:no-console
    console.log('going from: ', from.name);
    // tslint:disable-next-line:no-console
    console.log('going to: ', to.name);
    // tslint:disable-next-line:no-console
    console.log('path: ', to.path);
    next(vm => {
      // vm.providerMovies = []; /// <= Here you can define your properties.
      // https://github.com/vuejs/vue-router/issues/1863#issuecomment-391744471
      // https://router.vuejs.org/guide/advanced/navigation-guards.html#global-resolve-guards
    });
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 0;
  width: 100vw;
}

main {
  display: flex;
  justify-content: space-between;

  & > div {
    flex-basis: 100%;
  }
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>