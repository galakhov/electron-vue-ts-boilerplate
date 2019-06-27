import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export class BookmarksOutput extends Vue {
  @Prop() treeRendered: any;
  @Prop({ type: String }) treeJSON!: string;

  render(h: any) {
    return (
      <main id="appchen" class="container pt-5">
        <section id="render" class="my-5">
          <h3 class="mb-3">Sample rendering</h3>
          {//renderList(props.treeJSON, props.treeJSON)
          console.log('Hi from BookmarksOutput COMPONENT!')}
          {console.log(this.treeRendered.children)}
        </section>
        <section>
          <h3 class="mb-3">Result</h3>
          {this.treeJSON.length < 3
            ? 'JSON is empty'
            : console.log(this.treeJSON)}
        </section>
        <section>
          <h3 class="mb-3">Source data</h3>
          {
            //this.treeJSON
          }
        </section>
      </main>
    );
  }
}
