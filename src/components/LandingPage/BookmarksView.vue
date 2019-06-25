<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Tree,
  SubTree,
  Bookmark,
  Folder,
  isBookmark,
  isFolder,
  isFolders,
  isTree,
  isSubTree,
} from '@/@types/interfaces';

// original code:
// https://github.com/kobezhu/netscape-bookmark-tree/blob/master/example/build.js

@Component({})
export default class BookmarksView extends Vue {
  // @Prop(String) fileContent: string | undefined;
  @Prop({ type: Array }) tree!: Tree;
  functional = true;

  // A bunch of Vue lifecycle methods here and there...
  render(
    h: any,
    context?: Folder | Folder[] | Bookmark | Bookmark[] | undefined
  ) {
    function renderList(
      tree: Folder[] | Tree | SubTree,
      context: Folder | Folder[] | Bookmark | Bookmark[] | undefined
    ): any {
      console.log('tree is an array? ', typeof tree);
      console.log('what is in tree?', tree);

      let slots;
      if (!isSubTree(tree) && !isTree(tree) && !isFolders(tree)) {
        // && tree.children !== undefined
        // it should be a "Tree"
        // slots = tree.children;
        slots = tree.children.map(function(
          node: Folder | Bookmark | Folder[] | Bookmark[]
        ) {
          let subTree: Folder | Bookmark | Folder[] | Bookmark[];
          if (isFolder(node)) {
            subTree = node.children;
          } else {
            subTree = [];
          }
          let liSlots = [];
          if (isBookmark(node)) {
            liSlots.push(
              h('img', { class: 'mr-1', attrs: { src: node.icon, width: 16 } })
            );
          }

          if (isFolder(node) && subTree.length > 0) {
            liSlots.push(h('strong', node.name));
            liSlots.push(renderList(subTree, context));
          } else {
            if (isBookmark(node)) {
              liSlots.push(h('a', { attrs: { href: node.href } }, node.name));
            }
          }

          return h('li', liSlots);
        });
      }
      return h('ol', context, slots);
    }

    return h('main', { class: 'container pt-5', attrs: { id: 'app' } }, [
      h('section', { attrs: { id: 'render' }, class: 'my-5' }, [
        h('h3', { class: 'mb-3' }, 'Sample rendering'),
        renderList(this.tree[0], context),
      ]),
      h('section', { attrs: { id: 'array' }, class: 'my-5' }, [
        h('h3', { class: 'mb-3' }, 'Result'),
        h('pre', JSON.stringify(this.tree, null, '    ')),
      ]),
      h('section', { attrs: { id: 'source' }, class: 'my-5' }, [
        h('h3', { class: 'mb-3' }, 'Source data'),
        h('pre', this.tree),
      ]),
    ]);
  }
}
</script>