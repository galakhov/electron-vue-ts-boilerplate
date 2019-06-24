<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// original code:
// https://github.com/kobezhu/netscape-bookmark-tree/blob/master/example/build.js

interface Bookmark {
  id: string;
  name: string;
  add_date: string;
  href: string;
  icon: string;
}

interface Folder extends Array<any> {
  id: string;
  name: string;
  add_date: string;
  last_modified: string;
  children: Array<Folder | Bookmark>;
}

interface Tree extends Array<any> {
  id: string;
  add_date: string;
  children: Array<Folder | Bookmark>;
  last_modified: string;
  name: string;
}

function isFolder(f: Folder | Bookmark): f is Folder {
  return (<Folder>f).children.length > 0;
}

function isBookmark(b: Folder | Bookmark): b is Bookmark {
  return (<Bookmark>b).icon !== undefined;
}

@Component({})
export default class BookmarksView extends Vue {
  // @Prop(String) fileContent: string | undefined;
  @Prop(String) tree: Array<Folder | Bookmark> | any;
  functional = true;

  // A bunch of Vue lifecycle methods here and there...
  render(h: any, context?: Array<Folder | Bookmark> | undefined) {
    function renderList(
      tree: Array<Folder | Bookmark>,
      context: Array<Folder | Bookmark> | undefined
    ): any {
      let slots = tree.map(function(node: Folder | Bookmark) {
        let children: Array<Folder | Bookmark> | undefined;
        if (isFolder(node)) {
          children = node.children;
        }
        let liSlots = [];
        if (isBookmark(node)) {
          liSlots.push(
            h('img', { class: 'mr-1', attrs: { src: node.icon, width: 16 } })
          );
        }

        if (children !== undefined) {
          liSlots.push(h('strong', node.name));
          liSlots.push(renderList(children, context));
        } else {
          if (isBookmark(node)) {
            liSlots.push(h('a', { attrs: { href: node.href } }, node.name));
          }
        }

        return h('li', liSlots);
      });
      return h('ol', context, slots);
    }

    return h('main', { class: 'container pt-5', attrs: { id: 'app' } }, [
      h('section', { attrs: { id: 'render' }, class: 'my-5' }, [
        h('h3', { class: 'mb-3' }, 'Sample rendering'),
        renderList(this.tree, context),
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