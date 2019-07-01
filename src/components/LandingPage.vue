<template>
  <div id="wrapper">
    <main>
      <v-app id="inspire">
        <v-toolbar color="orange" dark tabs>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Bookmarks Analyser</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>fa fa-search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>fa fa-ellipsis-h</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="tab" color="orange" grow>
              <v-tabs-slider color="black"></v-tabs-slider>

              <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-card-text v-html="text" :key="keyComp"></v-card-text>
                <v-spacer></v-spacer>

                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="getFilesInFolders()"
                >
                  Open File
                  <v-icon right dark>fas fa-file-alt</v-icon>
                </v-btn>

                <v-btn @click="open('http://google.com')">
                  Open URL
                  <v-icon right dark>fas fa-external-link-square-alt</v-icon>
                </v-btn>

                <system-information></system-information>

                <bookmarks-view :tree="parsedBookmarks"></bookmarks-view>

                <!--<v-c-uploader v-model="text" upload-preset="tm4w6luq" cloud-name="rootless"></v-c-uploader>-->
                <uppy-cloudinary-uploader
                  @uploaded="uploadCompleted"
                  preset="tm4w6luq"
                  cloudName="rootless"
                ></uppy-cloudinary-uploader>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>Contents of the 2nd Tab</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>Contents of the 3rd Tab</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>Contents of the 4th Tab</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>Contents of the 5th Tab</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-app>
    </main>
  </div>
</template>


<script lang="ts">
import path from 'path';
import { remote } from 'electron';
import { log } from 'util';

import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator';
import SystemInformation from '@/components/LandingPage/SystemInformation.vue';
import UppyCloudinaryUploader from '@/components/Uppy/UppyCloudinaryUploader.vue';
import { requestsService } from '@/services/AsyncRequests/RequestsService';
// import vCUploader from './vCloudinaryUploader/vCUploader.vue';
import BookmarksView from './LandingPage/BookmarksView';
const bookmark = require('netscape-bookmark-tree/dist/bookmark.ast.cjs');
import { Bookmark, Folder, Tree } from '@/@types/interfaces';

@Component({
  components: {
    SystemInformation,
    UppyCloudinaryUploader,
    BookmarksView,
  },
})
export default class LandingPage extends Vue {
  loading3: boolean = false;
  tab = null;
  loader: string = '';
  tabs: string[] = ['web', 'shopping', 'videos', 'images', 'news'];
  text: string | undefined =
    'Click the upload button and choose a html file to parse.';
  filePath: string = '';
  originalContent: string | undefined = '';
  originals: string | undefined = '';
  parsedBookmarks: Array<Folder | Bookmark> = [];
  keyComp: number = 0;

  @Watch('loader')
  loaderHandler() {
    this.loading3 = !this.loading3;

    setTimeout(() => (this.loading3 = false), 3000);

    this.loader = '';
  }

  created() {
    // requestsService.initialize();
  }

  // @Watch('originalContent')
  getFilesInFolders() {
    const files = remote.dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      buttonLabel: 'Select bookmarks',
      title: 'Selecting bookmarks',
      filters: [
        { name: 'HTML Files', extensions: ['html', 'htm', 'txt'] },
        // { name: 'Archive Files', extensions: ['zip', 'rar'] },
      ],
    });

    if (!files) {
      return;
    }

    const file = files[0];

    this.filePath = file;

    console.log('File name', file);
    console.log("The file wasn't processed.", this.text);

    try {
      // filehandle = await this.fsPromises.open(filePath, 'r');
      requestsService.readFileInAsyncWay(file).then(content => {
        if (content !== undefined) {
          this.originalContent = content;
          // console.log('this.originalContent', this.originalContent);
        } else {
          this.originalContent = 'No content could be read.';
        }
        // console.log('The file was processed.', content);
        // let content = fs.readFileSync('bookmarks.html', 'utf8');
        const tree = bookmark(this.originalContent);
        console.log('Parsed bookmarks: ', tree);
        this.parsedBookmarks = tree;

        let text2html;
        if (this.filePath.split('.')[1] === 'txt') {
          text2html = this.text2HTML(content);
        } else {
          text2html = content;
        }

        this.text = text2html; // this.originalContent;
      });
    } catch (err) {
      console.error(err.message);
    }

    this.updateUserInterface();
  }

  /* args: isEdited */
  updateUserInterface() {
    let title = 'Bookmarks Analyser';

    if (this.filePath) {
      title = `${path.basename(this.filePath || '')} - ${title}`;
    }
    // if (isEdited) {
    //   title = `${title} (Edited)`;
    // }

    const currentWindow = remote.getCurrentWindow();
    currentWindow.setTitle(title);
    // currentWindow.setDocumentEdited(isEdited); // MacOSX specific dot on unsaved doc
    // currentWindow.setRepresentedFilename(this.filePath);

    // disable some buttons if needed
    // saveMarkdownButton.disabled = !isEdited;
    // revertButton.disabled = !isEdited;
  }

  uploadCompleted(data: string) {
    console.log(data);
  }

  prepareText(s: string): string {
    // preserve newlines, etc - use valid JSON
    s = s
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
    // remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g, '');
    return s;
  }

  // https://github.com/gbourne1/text2HTML
  text2HTML(textSequence: string) {
    // 1: Plain Text Search
    let text = textSequence
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // 2: Line Breaks
    text = text.replace(/\r\n?|\n/g, '<br>');
    // 3: Paragraphs
    text = text.replace(/<br>\s*<br>/g, '</p><p>');
    // 4: Wrap in Paragraph Tags
    text = '<p>' + text + '</p>';
    return text;
  }

  // writeFile(path: string, data: string, opts = 'utf8') {
  //   new Promise((resolve, reject) => {
  //     fs.writeFile(path, data, opts, err => {
  //       if (err) reject(err);
  //       else resolve();
  //     });
  //   });
  // }

  // async readFileAsync(filePath: string) {
  //   try {
  //     // let textFileContent = await readFilePromise("input-file.csv");
  //     // let deserialiedData = parseCsv(textFileContent);
  //     // let transformedData = transform(deserialiedData);
  //     // let serializedCsvData = serializeCsv(transformedData);
  //     // await writeFilePromise("output-file.csv", serializedCsvData);
  //     const textFileContent = await this.readFile(filePath);
  //     console.log('returned textFileContent result: ', textFileContent);
  //     // this.processFile(textFileContent);
  //     throw new Error('Something bad happened');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  processFile(content: Buffer | undefined) {
    // app.addRecentDocument(file); // to add file to the app’s ‘history‘
    let text2html = 'No content loaded.';
    if (content) {
      console.log('content: ', content);

      const currentWindow = remote.getCurrentWindow();
      // const cleanText = this.prepareText(content.toString());
      // convert text special chars to html
      if (this.filePath.split('.')[1] === 'txt') {
        text2html = this.text2HTML(content.toString());
      } else {
        text2html = content.toString();
      }

      this.originalContent = content.toString();
    }
    this.updateUserInterface();
    this.text = text2html;
  }

  saveAsJSON(content: string) {
    // To save parsed content as a JSON file
    // JSON.stringify(cleanText);
  }

  /* Event Listener */
  // const { remote, ipcRenderer } = require('electron');
  // ipcRenderer.on('file-opened', (event, file, content) => {
  //   someField.value = content;
  //   someFunction(content);
  // });

  open(link: string) {
    remote.shell.openExternal(link); // to open something in a browser
  }
}
</script>