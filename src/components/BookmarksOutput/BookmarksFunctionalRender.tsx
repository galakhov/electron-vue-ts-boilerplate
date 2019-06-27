import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

@Component({})
export class BookmarksFunctionalRender extends Vue {
  @Prop() nodes!: VNode[];

  functional = true;

  render(h, context) {
    return (
      <main id="appchen" class="container pt-5">
        <section id="render" class="my-5">
          <h3 class="mb-3">Sample rendering</h3>
          {this.nodes}
        </section>
      </main>
    );
  }
}
