interface Bookmark extends Array<any> {
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
  children: Folder[] | Bookmark[];
  last_modified: string;
}

interface SubTree extends Array<any> {
  [key: number]: Folder[] | Bookmark[];
  length: number;
}

interface FolderArray extends Array<Folder> {
  [key: number]: Folder | Bookmark;
  length: number;
}

interface Tree extends Array<any> {
  id: string;
  add_date: string;
  children: Folder[] | Bookmark[] | SubTree;
  last_modified: string;
  name: string;
  personal_toolbar_folder: boolean;
}

function isFolder(f: Folder | Bookmark | Bookmark[] | Folder[]): f is Folder {
  return (<Folder>f).children.length > 0;
}

function isFolders(f: Folder | Tree | SubTree | Folder[]): f is Folder {
  return (<Folder[]>f).length > 0;
}

function isBookmark(
  b: Folder | Bookmark | Folder[] | Bookmark[] | SubTree | Tree
): b is Bookmark {
  return (<Bookmark>b).icon !== undefined;
}

function isTree(t: Tree | Folder[]): t is Tree {
  return (<Tree>t).personal_toolbar_folder !== undefined;
}

// Tree | Folder | Bookmark | Folder[] | Bookmark[]
function isSubTree(t: Tree | Folder[] | SubTree): t is SubTree {
  return (
    (<Bookmark>t).icon === undefined &&
    (<Folder>t).children === undefined &&
    (<Tree>t).personal_toolbar_folder === undefined &&
    (<SubTree>t).length > 0
  );
}

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
