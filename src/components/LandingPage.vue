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

              <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat>
              <v-card-text>
                <v-card-text v-html="text"></v-card-text>
                <v-spacer></v-spacer>

                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="getFilesInFolders()"
                >
                  Upload
                  <v-icon right dark>fas fa-cloud-upload-alt</v-icon>
                </v-btn>

                <v-btn @click="open('http://google.com')">Open URL</v-btn>

                <system-information></system-information>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-app>
    </main>
  </div>
</template>

<script lang="ts">
import * as fs from 'fs';
import path from 'path';
import { app, remote } from 'electron';
// import path from 'path';
import util, { log } from 'util';

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SystemInformation from './LandingPage/SystemInformation.vue';

const readFilePromisified = util.promisify(fs.readFile);

@Component({
  components: {
    SystemInformation,
  },
})
export default class LandingPage extends Vue {
  loading3: boolean = false;
  tab = null;
  loader: string = '';
  items: string[] = ['web', 'shopping', 'videos', 'images', 'news'];
  text: string = 'Click the upload button and choose a html file to parse.';
  filePath: string = '';
  originalContent: string = '';

  @Watch('loader')
  loaderHandler() {
    this.loading3 = !this.loading3;

    setTimeout(() => (this.loading3 = false), 3000);

    this.loader = '';
  }

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

    // this.readSimpleFile(file);
    this.readFileAsync(file);
  }

  updateUserInterface(/* isEdited */) {
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

  // reads a simple (text or html) file asynchronously, to not to block the Event Loop
  // readSimpleFile(file: string) {
  //   fs.readFile(file, { encoding: 'utf8' }, (err, fileContent) => {
  //     if (err) {
  //       return console.error(err); // If an error occurred, output it and return
  //     } else {
  //       this.filePath = file;
  //       this.processFile(fileContent); // No error occurred, content is a string
  //     }
  //   });
  // }

  async readFileAsync(file: string) {
    try {
      console.log('getting file name: ', console);
      const content = await readFilePromisified(file, 'utf8');
      this.processFile(content);
    } catch (e) {
      console.error(e);
    }
  }

  processFile(content: string) {
    // app.addRecentDocument(file); // to add file to the app’s ‘history‘
    console.log('content: ', content);

    const currentWindow = remote.getCurrentWindow();
    // const cleanText = this.prepareText(content.toString());
    let text2html = '';
    // convert text special chars to html
    if (this.filePath.split('.')[1] === 'txt') {
      text2html = this.text2HTML(content.toString());
    } else {
      text2html = content.toString();
    }
    if (content) {
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 0;
  width: 100vw;
}

main {
  display: flex;
  justify-content: space-between;

  & > div {
    flex-basis: 100%;
  }
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
