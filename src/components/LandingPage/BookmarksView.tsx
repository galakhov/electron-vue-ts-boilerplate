import { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { BookmarksOutput } from '@/components/BookmarksOutput/BookmarksOutput';
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

const renderList = (
  tree: Folder | Tree | SubTree,
  data: any,
  h: CreateElement
): any => {
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
    console.log('Nothing was passed...');
  } else if (
    isSubTree(tree) ||
    (!isFolder(tree) && !isBookmark(tree) && isTree(tree))
  ) {
    slots = tree;
  } else if (!isSubTree(tree) || !isFolder(tree)) {
    if (!isBookmark(tree)) {
      slots = tree.children;
    }
  } else {
    console.log('strange edge-case...');
  }

  let parents: any = [];
  let html: any = [];

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
    const liSlots = [];
    if (isBookmark(node)) {
      liSlots.push(
        h('img', {
          class: 'mr-2 mt-1 bookmarks__icon',
          attrs: { src: node.icon, width: 16 },
        })
      );
    }

    if (!isSubTree(node) && isFolder(node) && subTree.length > 0) {
      liSlots.push(h('strong', { class: 'bookmarks__folder' }, node.name));
      liSlots.push(renderList(subTree, data, h));
    } else {
      if (isBookmark(node)) {
        liSlots.push(
          h(
            'a',
            { attrs: { href: node.href, class: 'bookmarks__bookmark' } },
            node.name
          )
        );
      }
    }

    html.push(h('li', { class: 'bookmarks__line' }, liSlots));
  });

  if (slots.length > 0 && html.length > 0) {
    parents.push(
      h(
        'ul',
        {
          on: {
            click(event: any) {
              event.preventDefault();
              const nextEl = event.target.nextSibling;
              if (nextEl) {
                const nextElStatus = nextEl.dataset.toggle;
                if (nextElStatus === 'closed') {
                  nextEl.removeAttribute('data-toggle');
                  nextEl.setAttribute('data-toggle', 'opened');
                } else {
                  nextEl.removeAttribute('data-toggle');
                  nextEl.setAttribute('data-toggle', 'closed');
                }
              }
              event.stopPropagation(); // to touch only current element
            },
          },
          attrs: { 'data-toggle': 'closed' },
          class: 'bookmarks__list',
        },
        html
      )
    );
  }

  return parents;

  // return (
  //   <slot slot={data}>
  //     {slots.map((value, index) => {
  //       return (
  //         <ol key={index} slot={data}>
  //           {value}
  //         </ol>
  //       );
  //     })}
  //   </slot>
  // );
};

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

  private created() {
    console.log('The app is created!');
  }

  // get routedComponent() {
  // return this.$routes[this.current];
  // }

  private mounted() {
    console.log('The component is mounted!');
    if (this.tree.length > 0) {
      console.log('Tree?', this.tree);
    }
  }

  private beforeRouteEnter(to: Route, from: Route, next: any) {
    console.log('Hello: beforeRouteEnter');
    next();
  }

  private beforeRouteUpdate(to: Route, from: Route, next: any) {
    console.log('Hello: beforeRouteUpdate');
    next();
  }

  private beforeRouteLeave(to: Route, from: Route, next: any) {
    console.log('Hello: beforeRouteLeave');
    next();
  }

  private render(
    // h: any,
    h: CreateElement,
    data?: Folder | Tree | SubTree | undefined
  ) {
    // loaderItem: JSX.Element = <div class='data-loader' loading='' title='Data Loading..'></div>;
    // https://github.com/tejzpr/Vue.TSX/blob/master/src/App.tsx

    return h('main', { class: 'bookmarks container pt-5' }, [
      h('section', { attrs: { id: 'render' }, class: 'my-5' }, [
        h('h3', { class: 'mb-3' }, 'Bookmarks Tree'),
        renderList(this.tree, {}, this.$createElement),
      ]),
      // h('section', { attrs: { id: 'array' }, class: 'my-5' }, [
      //   h('h3', { class: 'mb-3' }, 'Result'),
      //   // h('pre', JSON.stringify(this.tree, null, '    ')),
      // ]),
      // h('section', { attrs: { id: 'source' }, class: 'my-5' }, [
      //   h('h3', { class: 'mb-3' }, 'Source data'),
      //   // h('pre', this.tree),
      // ]),
    ]);

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
    //       {renderList(this.tree, {}, this.$createElement)}
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

    // tslint:disable-next-line:no-console
  }
}
