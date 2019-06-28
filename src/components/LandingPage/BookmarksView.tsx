import VNode, { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BookmarksOutput } from '@/components/BookmarksOutput/BookmarksOutput';
import BookmarksFunctionalRender from '@/components/BookmarksOutput/BookmarksFunctionalRender';
import {
  Tree,
  SubTree,
  Bookmark,
  Folder,
  isBookmark,
  isFolder,
  isTree,
  isSubTree,
} from '@/@types/interfaces';

// original code:
// https://github.com/kobezhu/netscape-bookmark-tree/blob/master/example/build.js

@Component({
  components: {
    BookmarksOutput,
  },
})
export default class BookmarksView extends Vue {
  // @Prop(String) fileContent: string | undefined;
  @Prop({ type: Array }) tree!: Tree | SubTree;
  functional = true;
  data: any;

  // A bunch of Vue lifecycle methods here and there...

  render(
    // h: any,
    h: CreateElement,
    data?: Folder | Tree | SubTree | undefined
  ) {
    // loaderItem: JSX.Element = <div class='data-loader' loading='' title='Data Loading..'></div>;
    // https://github.com/tejzpr/Vue.TSX/blob/master/src/App.tsx

    function renderList(tree: Folder | Tree | SubTree, data: any): any {
      // if (!isSubTree(tree) && tree !== undefined && tree.id !== undefined) {
      // console.log('where are we in the tree?', tree);
      // console.log('CONTEXT', context);
      // }

      let slots = new Array();
      if (
        !isBookmark(tree) &&
        !isSubTree(tree) &&
        !isFolder(tree) &&
        !isTree(tree)
      ) {
      } else if (
        isSubTree(tree) ||
        (!isFolder(tree) && !isBookmark(tree) && isTree(tree))
      ) {
        slots = tree;
      } else if (!isSubTree(tree) || !isFolder(tree)) {
        if (!isBookmark(tree)) slots = tree.children;
      } else {
        console.log('strange edge-case...');
      }

      slots.map(function(
        node: Tree | SubTree | Folder | Bookmark | Folder[] | Bookmark[]
      ) {
        let subTree: Folder | Bookmark | Folder[] | Bookmark[];
        if (!isSubTree(node) && isFolder(node)) {
          subTree = node.children;
        } else if (!isSubTree(node)) {
          // tslint:disable-next-line
          // subTree = node.children;
          subTree = node;
        } else {
          subTree = [];
        }
        let liSlots = [];
        if (isBookmark(node)) {
          liSlots.push(
            h('img', { class: 'mr-1', attrs: { src: node.icon, width: 16 } })
            // return (<img src="{{ node.icon}} " class='mr-1' width='16'>);
          );
        }

        if (!isSubTree(node) && isFolder(node) && subTree.length > 0) {
          liSlots.push(h('strong', node.name));
          liSlots.push(renderList(subTree, data));
        } else {
          if (isBookmark(node)) {
            liSlots.push(h('a', { attrs: { href: node.href } }, node.name));
          }
        }

        // return h('li', liSlots);
        return <li>{liSlots}</li>;
      });
      // }
      // return h('ol', data, slots);
      return (
        <slot slot={data}>
          {slots.map((value, index) => {
            return (
              <ol key={index} slot={data}>
                {value}
              </ol>
            );
          })}
        </slot>
      );
    }

    // return h('BookmarksOutput', {
    //   props: {
    //     treeRendered: renderList(this.tree, undefined),
    //     treeJSON: JSON.stringify(this.tree, null, '    '),
    //   },
    // });

    // https://github.com/vuejs/jsx#installation
    // const scopedSlots = {
    //   header: () => <header>header</header>,
    //   footer: () => <footer>footer</footer>
    // }
    // return (<BookmarksFunctionalRender>
    //   <div scopedSlots={scopedSlots}>
    //     <vnodes vnodes={vnodes}/>
    //   </div>
    // </BookmarksFunctionalRender>)

    // https://github.com/wonderful-panda/vue-tsx-support#using-custom-component  --> allow-unknown-props
    // const vnodes: VNode[] = renderList(this.tree, this.tree).children;
    // return <BookmarksFunctionalRender nodes={vnodes} />;

    // return (
    //   <main id="appchen" class="container pt-5">
    //     <section id="render" class="my-5">
    //       <h3 class="mb-3">Sample rendering</h3>
    //       {renderList(this.tree, this.tree)}
    //     </section>
    //     <section>
    //       <h3 class="mb-3">Result</h3>
    //       {console.log(JSON.stringify(this.tree, null, '    '))}
    //     </section>
    //     <section>
    //       <h3 class="mb-3">Source data</h3>
    //       {this.tree}
    //     </section>
    //   </main>
    // );

    return h(
      'main',
      { class: 'container pt-5', attrs: { id: 'app' } },
      [
        h('section', { attrs: { id: 'render' }, class: 'my-5' }, [
          h('h3', { class: 'mb-3' }, 'Sample rendering'),
          renderList(this.tree, undefined),
        ]),
        h('section', { attrs: { id: 'array' }, class: 'my-5' }, [
          h('h3', { class: 'mb-3' }, 'Result'),
          // h('pre', JSON.stringify(this.tree, null, '    ')),
        ]),
        h('section', { attrs: { id: 'source' }, class: 'my-5' }, [
          h('h3', { class: 'mb-3' }, 'Source data'),
          // h('pre', this.tree),
        ]),
      ],
      // tslint:disable-next-line:no-console
      console.log('123', JSON.stringify(this.tree, null, '    '))
    );
  }
}
