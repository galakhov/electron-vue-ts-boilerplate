import VNode, { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
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

@Component
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

    function renderList(
      tree: Folder | Tree | SubTree,
      data: Folder | Tree | SubTree | undefined
    ): any {
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

      // if (!isTree(tree) && !isFolders(tree)) {
      // && tree.children !== undefined
      // it should be a "Tree"
      // slots = tree.children;
      slots.map(function(
        node: Tree | SubTree | Folder | Bookmark | Folder[] | Bookmark[]
      ) {
        let subTree: Folder | Bookmark | Folder[] | Bookmark[];
        if (!isSubTree(node) && isFolder(node)) {
          subTree = node.children;
        } else if (!isSubTree(node)) {
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
      // return h('ol', context, slots);
      return (
        <slot slot="{ context }">
          {slots.map((value, index) => {
            return (
              <ol key={index}>
                {value}
                {console.log('WTF', value.name)}
              </ol>
            );
          })}
        </slot>
      );
    }
    return (
      <main id="appchen" class="container pt-5">
        <section id="render" class="my-5">
          <h3 class="mb-3">Sample rendering</h3>
          {renderList(this.tree, this.tree)}
        </section>
        <section>
          <h3 class="mb-3">Result</h3>
          {JSON.stringify(this.tree, null, '    ')}
        </section>
        <section>
          <h3 class="mb-3">Source data</h3>
          {this.tree}
        </section>
      </main>
    );

    // return h('main', { class: 'container pt-5', attrs: { id: 'app' } }, [
    //   h('section', { attrs: { id: 'render' }, class: 'my-5' }, [
    //     h('h3', { class: 'mb-3' }, 'Sample rendering'),
    //     renderList(this.tree[0], context),
    //   ]),
    //   h('section', { attrs: { id: 'array' }, class: 'my-5' }, [
    //     h('h3', { class: 'mb-3' }, 'Result'),
    //     h('pre', JSON.stringify(this.tree, null, '    ')),
    //   ]),
    //   h('section', { attrs: { id: 'source' }, class: 'my-5' }, [
    //     h('h3', { class: 'mb-3' }, 'Source data'),
    //     h('pre', this.tree),
    //   ]),
    // ]);
  }
}
