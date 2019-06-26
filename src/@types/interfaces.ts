interface Tree extends Array<any> {
  id: string;
  add_date: string;
  children: Folder[] | Bookmark[] | SubTree;
  last_modified: string;
  name: string;
  personal_toolbar_folder: boolean;
}

interface SubTree extends Array<any> {
  [key: number]: Folder[] | Bookmark[];
  length: number;
}

interface Folder extends Array<any> {
  id: string;
  name: string;
  add_date: string;
  children: Folder[] | Bookmark[];
  last_modified: string;
}

interface Bookmark extends Array<any> {
  id: string;
  name: string;
  add_date: string;
  href: string;
  icon: string;
}

// interface FolderArray extends Array<Folder> {
//   [key: number]: Folder | Bookmark;
//   length: number;
// }

const isFolder = (
  f: Folder | Bookmark | Bookmark[] | Folder[]
): f is Folder => {
  return (
    <Folder>f !== undefined &&
    (<Folder>f).children !== undefined &&
    (<Folder>f).children.length > 0
  );
};

const isFolders = (f: Folder | Tree | SubTree | Folder[]): f is Folder => {
  return (<Folder>f).length > 0;
};

const isBookmark = (
  b: Folder | Bookmark | Folder[] | Bookmark[] | SubTree | Tree
): b is Bookmark => {
  return <Bookmark>b !== undefined && (<Bookmark>b).icon !== undefined;
};

const isTree = (t: Tree): t is Tree => {
  return (
    <Tree>t !== undefined && (<Tree>t).personal_toolbar_folder !== undefined
  );
};

const isSubTree = (t: Tree | SubTree): t is SubTree => {
  return <SubTree>t !== undefined && (<SubTree>t).length > 0;
};

export {
  Tree,
  SubTree,
  Folder,
  Bookmark,
  isFolder,
  isFolders,
  isBookmark,
  isTree,
  isSubTree,
};
