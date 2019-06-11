import Vue from "vue";

declare module "vue-router" {
  interface Next<T extends Vue = Vue> {
    (to?: (vm: T) => any): void;
  }
}

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
