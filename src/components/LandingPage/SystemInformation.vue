<template>
  <div>
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">Path:</div>
        <div class="value">{{ getPath() }}</div>
      </div>
      <div class="item">
        <div class="name">Route Name:</div>
        <div class="value">{{ getName() }}</div>
      </div>
      <div class="item">
        <div class="name">Vue.js:</div>
        <div class="value">{{ getVueVersion() }}</div>
      </div>
      <div class="item">
        <div class="name">Electron:</div>
        <div class="value">{{ getElectronVersion() }}</div>
      </div>
      <div class="item">
        <div class="name">Node:</div>
        <div class="value">{{ getNodeVersion() }}</div>
      </div>
      <div class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ getPlatform() }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator';

// Reactive
// const AppProps = Vue.extend({
//   props: {
//     electron: String
//   }
// });

@Component({
  props: {
    electron: String,
    // this.$route: String,
    name: String,
    path: String,
    vue: String,
    platform: String,
    node: String,
  },
})
export default class SystemInformation extends Vue {
  // @Inject() readonly electron!: string;
  getNodeVersion(): string {
    return process.versions.node;
  }
  getPlatform(): string {
    return require('os').platform() as string;
  }
  getVueVersion(): string {
    return require('vue/package.json').version as string;
  }
  getElectronVersion(): string {
    return process.versions.electron;
  }
  getName(): string {
    return this.$route ? (this.$route.name as string) : 'name';
  }
  getPath(): string {
    return this.$route ? this.$route.path : 'path';
  }
}
// export default {
//   data() {
//     return {
//       electron: process.versions.electron,
//       name: this.$route.name,
//       node: process.versions.node,
//       path: this.$route.path,
//       platform: require('os').platform(),
//       vue: require('vue/package.json').version,
//     };
//   },
// };
</script>

<style lang="scss" scoped>
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
