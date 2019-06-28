import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import component from 'vue-class-component';
import * as vuetsx from 'vue-tsx-support';

// const BookmarksFunctionalRender = vuetsx.createComponent<{
//   props: { nodes: VNode[] };
// }>({
//   render(h: CreateElement, context) {
//     return (
//       <main id="appchen" class="container pt-5">
//         <section id="render" class="my-5">
//           <h3 class="mb-3">Sample rendering</h3>
//           {context.props.nodes}
//         </section>
//       </main>
//     );
//   },
// });

interface BookmarksFunctionalProps {
  nodes: VNode[];
}

@component({
  // props: {
  //   // tslint:disable-next-line
  //   nodes: Vue,
  // },
})
class BookmarksFunctionalRender extends vuetsx.Component<
  BookmarksFunctionalProps
> {
  @Prop(Vue) nodes!: VNode[];

  render(h: CreateElement): VNode {
    return (
      <main id="appchen" class="container pt-5">
        <section id="render" class="my-5">
          <h3 class="mb-3">Sample rendering</h3>
          {this.nodes}
          {console.log('WHERE AM I #1', this.nodes)}
          {console.log('WHERE AM I #2', this.$props.nodes)}
        </section>
      </main>
    );
  }
}

export default BookmarksFunctionalRender;

// @Component({})
// export class BookmarksFunctionalRender extends Vue {
//   @Prop({ required: true }) nodes!: VNode[];

//   functional = true;

//   render(h: CreateElement) {
//     return (
//       <main id="appchen" class="container pt-5">
//         <section id="render" class="my-5">
//           <h3 class="mb-3">Sample rendering</h3>
//           {this.nodes}
//         </section>
//       </main>
//     );
//   }
// }
