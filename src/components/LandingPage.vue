<template>
  <div id="wrapper">
    <main>
      <v-app id="inspire">
        <v-toolbar color="orange" dark tabs>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Bookmarks Analyser</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>fa fa-search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>fa fa-ellipsis-h</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="tab" color="orange" grow>
              <v-tabs-slider color="black"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat>
              <v-card-text>
                {{ text }}
                <system-information></system-information>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-app>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SystemInformation from "./LandingPage/SystemInformation.vue";

// const AppProps = Vue.extend({
//   props: {
//     $electron: NodeJS, // .ProcessVersions.string,
//   }
// })

@Component({
  components: {
    SystemInformation
  }
})
export default class LandingPage extends Vue {
  // @Prop(NodeJS.Process.Versions) electron;
  // $electron = "";

  tab = null;
  items = ["web", "shopping", "videos", "images", "news"];
  text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // open(link: string) {
  //   this.$electron.shell.openExternal(link);
  // }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
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
}

main > div {
  flex-basis: 100%;
}
</style>
