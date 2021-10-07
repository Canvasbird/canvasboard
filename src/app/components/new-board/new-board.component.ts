import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Data, NavigationExtras,
  Params, Router
} from '@angular/router';
import { fabric } from 'fabric';
import Fuse from 'fuse.js';
import * as Mousetrap from 'mousetrap';
import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { AddTwitterComponent } from 'src/app/plugins/twitter';
import { AddBlockEditorParameters } from 'src/interfaces/add-block-parameters';
import { BasePluginComponent } from 'src/interfaces/base-plugin-component';
import { NewBoard } from 'src/interfaces/new-board';
import { PluginComponent } from 'src/interfaces/plugin-component';
import { PluginType } from 'src/interfaces/plugin-type';
import { v4 as uuidv4 } from 'uuid';
import { AddBottomComponent } from '../../plugins/bottom';
// Importing Plugins
import { AddH1Component } from '../../plugins/cb-h1';
import { AddH2Component } from '../../plugins/cb-h2';
import { AddH3Component } from '../../plugins/cb-h3';
import { AddParaComponent } from '../../plugins/cb-p';
import { AddCanvasBoard } from '../../plugins/cb-whiteboard';
import { AddCenterAlignComponent } from '../../plugins/center-align';
import { AddClearFontComponent } from '../../plugins/clear-font';
import { AddBlueBackgroundComponent } from '../../plugins/color-background/cb-bluebackground';
import { AddClearBackgroundComponent } from '../../plugins/color-background/cb-clearbackground';
import { AddGreenBackgroundComponent } from '../../plugins/color-background/cb-greenbackground';
import { AddRedBackgroundComponent } from '../../plugins/color-background/cb-redbackground';
import { AddYellowBackgroundComponent } from '../../plugins/color-background/cb-yellowbackground';
import { AddDeleteComponent } from '../../plugins/delete';
import { AddEmbedComponent } from '../../plugins/embed';
import { AddFontKalamComponent } from '../../plugins/kalam';
import { AddLeftAlignComponent } from '../../plugins/left-align';
import { AddMarkDownComponent } from '../../plugins/markdown';
import { AddFontMonospaceComponent } from '../../plugins/monospace';
import { AddOrderedListComponent } from '../../plugins/ordered-list';
import { AddPdfRenderComponent } from '../../plugins/pdf-render';
import { AddFontPlayfairComponent } from '../../plugins/playfair';
import { AddRightAlignComponent } from '../../plugins/right-align';
import { AddTopComponent } from '../../plugins/top';
import { AddUnOrderedListComponent } from '../../plugins/unordered-list';
import { RestService } from '../../services/rest.service';
import { menu } from './menu';
import { NewBoardCard } from './new-board-card';



declare var $: any;
declare var document: any;

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: RestService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.folderID = params.folderId;
      this.fileID = params.fileId;
    });
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.state !== undefined) {
        this.fileData =
          this.router.getCurrentNavigation().extras.state.fileData;
        this.folderID =
          this.router.getCurrentNavigation().extras.state.folderId;
      }
    }
    // Storing blocks in Map
    this.userBlocks = new Map();

    // ----------------------- Components -----------------------
    this.AddH1Component = new AddH1Component();
    this.AddH2Component = new AddH2Component();
    this.AddH3Component = new AddH3Component();
    this.AddParaComponent = new AddParaComponent();
    this.AddRedBackgroundComponent = new AddRedBackgroundComponent();
    this.AddBlueBackgroundComponent = new AddBlueBackgroundComponent();
    this.AddYellowBackgroundComponent = new AddYellowBackgroundComponent();
    this.AddGreenBackgroundComponent = new AddGreenBackgroundComponent();
    this.AddClearBackgroundComponent = new AddClearBackgroundComponent();
    this.AddCanvasBoard = new AddCanvasBoard();
    this.AddFontMonospaceComponent = new AddFontMonospaceComponent();
    this.AddFontPlayfairComponent = new AddFontPlayfairComponent();
    this.AddFontKalamComponent = new AddFontKalamComponent();
    this.AddClearFontComponent = new AddClearFontComponent();
    this.AddLeftAlignComponent = new AddLeftAlignComponent();
    this.AddCenterAlignComponent = new AddCenterAlignComponent();
    this.AddRightAlignComponent = new AddRightAlignComponent();
    this.AddOrderedListComponent = new AddOrderedListComponent();
    this.AddUnOrderedListComponent = new AddUnOrderedListComponent();
    this.AddTopComponent = new AddTopComponent();
    this.AddBottomComponent = new AddBottomComponent();
    this.AddDeleteComponent = new AddDeleteComponent();
    this.AddEmbedComponent = new AddEmbedComponent();
    this.AddPdfRenderComponent = new AddPdfRenderComponent();
    this.AddTwitterComponent = new AddTwitterComponent();
    this.AddMarkDownComponent = new AddMarkDownComponent();
    this.reader = new FileReader();
    // tslint:disable-next-line: no-unused-expression
    this.deck;

  }

  fileName: string;
  fileID: Data;
  folderID: Data;
  fileData: NavigationExtras;
  fileTag: Array<string>;
  fileToUpload: File = null;
  focusElement: any;

  // ----------------------- Fuse search Variables -----------------------

  listFuseSearch: any;
  fuse: any;

  reader: FileReader;
  currentChartID: string;
  userBlocks: Map<string, NewBoardCard>;

  // Initializing plugins
  AddH1Component: PluginComponent;
  AddH2Component: PluginComponent;
  AddH3Component: PluginComponent;
  AddParaComponent: PluginComponent;
  AddRedBackgroundComponent: PluginComponent;
  AddBlueBackgroundComponent: PluginComponent;
  AddYellowBackgroundComponent: PluginComponent;
  AddGreenBackgroundComponent: PluginComponent;
  AddClearBackgroundComponent: PluginComponent;
  AddCanvasBoard: any;
  AddFontMonospaceComponent: BasePluginComponent;
  AddFontPlayfairComponent: BasePluginComponent;
  AddFontKalamComponent: BasePluginComponent;
  AddClearFontComponent: BasePluginComponent;
  AddLeftAlignComponent: PluginComponent;
  AddCenterAlignComponent: PluginComponent;
  AddRightAlignComponent: PluginComponent;
  AddOrderedListComponent: PluginComponent;
  AddUnOrderedListComponent: PluginComponent;
  AddTopComponent: PluginComponent;
  AddBottomComponent: PluginComponent;
  AddDeleteComponent: any;
  AddEmbedComponent: PluginComponent;
  AddPdfRenderComponent: PluginComponent;
  AddTwitterComponent: PluginComponent;
  AddMarkDownComponent: any;
  deck: Reveal;

  uniqueChartID = (() => {
    let id = 0;
    return () => {
      return id++;
    };
  })();

public activeIndex = 0;

  ngOnInit() {
    // ----------------------- SORTABLE JS -----------------------
    const mainEl = document.getElementById('main-box');

    const sortable = new Sortable(mainEl, {
      handle: '.dragHandle',
      animation: 150,
      easing: 'cubic-bezier(1, 0, 0, 1)',
    });

    // disable enter on title
    this.disableTitleEnter();

    // Enabling ToolTips for everything
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });

    // ----------------------- Defaults-----------------------
    $('#original[contenteditable]').keypress((evt) => {
      const keycode = evt.charCode || evt.keyCode;
      if (keycode === 13) {
        // Enter key's keycode
        return false;
      }
    });

    if (this.fileData !== null && this.fileData !== undefined) {
      this.populateData(this.fileData.queryParams);
    } else if (this.fileID !== undefined) {
      this.retrieveData(this.fileID);
    } else {
      this.addBlockEditor({ id: 'sub-title', pluginComponent: null });
    }

    // ----------------------- Paste fix for contenteditable ------------
    // this.pasteFix();

    // ----------------------- Enabling Shortcuts -----------------------
    this.shortcuts();

    // ----------------------- Enabing fuse for fuzzy search --------------
    this.fuseSearch();
  }
  // ----------------------- Reveal JS Config -------------------------------
  ngAfterViewInit() {

    this.deck = new Reveal($('#revealDiv'));
    this.deck.initialize(
      {
        plugins: [
          Markdown,
          Highlight,
        ],
        // hash: true,
        embedded: true,
        minScale: 1.0,
        controls: true,
        controlsTutorial: true,
        keyboardCondition: 'focused'
      }
    );
    this.deck.configure({
      keyboard: {
        27: () => {
          $('presentModal').hide();
        }, // do Nothing when ESC is pressed
      },
    });
  }

  // ---------------------- Activating fusy search ------------------------------------
  activateFuseList() {
    const html = document.getElementById('fuseSearch');
    if (html.style.display === 'none') {
      html.style.display = 'block';
    }
    const inp: any = document.getElementById('fuseInput');
    inp.value = '';
    $(`#fuseInput`).focus();
    this.listFuseSearch = [];

    // Esc events
    $(`#fuseInput`).keydown((e) => {
      if (e.which === 27) {
        // tslint:disable-next-line: no-shadowed-variable
        const html = document.getElementById('fuseSearch');
        html.style.display = 'none';
      }
    });

    // Arrow functions

  }


  public nextActiveMatch() {
    this.activeIndex = this.activeIndex < $('#search_results li').length - 1 ? ++this.activeIndex : this.activeIndex;
  }
  public prevActiveMatch() {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 0;
  }
  public enterFuseSearch(){
    const storeTarget = $('#search_results').find('li.active');
    this.searchListClicked(storeTarget.prop('id').substring(5));
  }
  // ----------------------- fuse config ----------------------------------------------
  fuseSearch = async () => {
    const options = {
      keys: ['name', 'alternative'],
    };
    this.fuse = await new Fuse(menu, options);
  }

  // ----------------------- On change in input field ---------------------------
  textInputChange = (parameter: any) => {
    this.listFuseSearch = this.fuse.search(parameter.value);
  }

  // ----------------------- On clicking the list in Fuse -----------------------
  searchListClicked = (id: any) => {
    const idFilter = parseInt(id, 10);
    const exit = document.getElementById('fuseSearch');
    exit.style.display = 'none';

    switch (idFilter) {
      case 1: {
        this.cbToolbox(this.AddH1Component);
        break;
      }
      case 2: {
        this.cbToolbox(this.AddH2Component);
        break;
      }
      case 3: {
        this.cbToolbox(this.AddH3Component);
        break;
      }
      case 4: {
        this.cbToolbox(this.AddParaComponent);
        break;
      }
      case 5: {
        $('#embedModal').modal();
        break;
      }
      case 6: {
        this.cbToolbox(this.AddCanvasBoard, 'board');
        break;
      }
      case 7: {
        $('#youtubeModal').modal();
        break;
      }
      case 8: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://codesandbox.io/s/angular');
        break;
      }
      case 9: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://codesandbox.io/s/new');
        break;
      }
      case 10: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://codesandbox.io/s/vue');
        break;
      }
      case 11: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://codesandbox.io/s/vanilla');
        break;
      }
      case 12: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://codesandbox.io/s/github/codesandbox-app/static-template/tree/master/');
        break;
      }
      case 13: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://witeboard.com/');
        break;
      }
      case 14: {
        $('#embedModal').modal();
        break;
      }
      case 15: {
        $('#embedModal').modal();
        break;
      }
      case 16: {
        this.cbToolbox(this.AddEmbedComponent, 'embed', 'https://node-event-loop.herokuapp.com/');
        break;
      }
      case 17: {
        $('#embedModal').modal();
        break;
      }
    }
  }

  // ----------------------- BLOCK BUILDING FUNCITON -----------------------
  blockFunction = (uid) => {
    const data = `
    <div id="cb-box-1-${uid}" class="cb-box-1">
    <div class="row mx-0">
      <!-- plug for dragging -->
      <div class="dragHandle svgHandler col-1 col-cb-1-custom" style="padding: 0px; padding-top: 10px; max-width: 4%; flex: 0 0 4%;" title="Drag">
        <svg class="svgClass" width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-grip-horizontal"
        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7
          5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2
          0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0
          1 2 0z"/>
        </svg>
      </div>
      <div id="real-content-box-${uid}" class="col-10 px-0" style="max-width: 90%; flex: 0 0 90%;">
        <!-- content box -->
        <div id="cb-box-2-${uid}" class="cb-box-2 mt-2 mb-2" style="margin-left: 3px; border-radius: 5px;">
          <div class="cb-box-3">
            <div id="original-${uid}" class="edit" contenteditable="true" style="padding-left: 3px;">

            </div>
          </div>
        </div>
      </div>
      <!-- menu icon -->
      <div id="show-more-toolbox-${uid}" class="col-1 px-0" style="max-width: 5%; flex: 0 0 5%;  display: flex;justify-content:center;">
        <!-- menu button -->
        <div class="cb-toolbox" title="Toolbar">
         <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd"
          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          />
         </svg>
        </div>

        <!-- expand toolbox -->
        <div id="cb-expand-more-toolbox-${uid}" class="cb-more-toolbox">
          <div id="cb-buttons-${uid}" class="toolbox-main shadow">
          </div>
        </div>
      </div>
    </div>
  </div>

    `;
    return data;
  }

  // ----------------------- ADDING BLOCK BEFORE/AFTER THE DIV FUNCTION -----------------------
  addBlockEditor = ({
    id,
    pluginComponent = null,
    pType = 'editor',
    addBefore = false,
    embedUrl = null,
  }: AddBlockEditorParameters) => {
    try {
      // getting uid and appending after specified ID
      const uid: any = uuidv4();

      const newBoardCard: NewBoardCard = new NewBoardCard(
        uid,
        -1,
        this.userBlocks.size
      );
      let pluginType: PluginType = pType;

      if (pluginComponent !== null) {
        if (
          pluginComponent === this.AddTopComponent ||
          pluginComponent === this.AddBottomComponent
        ) {
          addBefore
            ? $(`#${id}`).before(this.blockFunction(uid))
            : $(`#${id}`).after(this.blockFunction(uid));
        } else if (pluginComponent === this.AddPdfRenderComponent) {
          $('#pdfFile').change((event) => {
            $(`#${id}`).append(this.blockFunction(uid));
            this.AddPdfRenderComponent.addToolBox(
              uid,
              event.target.files[0],
              this.reader
            );
          });
          pluginType = 'fileUpload';
        } else if (pluginComponent === this.AddEmbedComponent) {
          $(`#${id}`).append(this.blockFunction(uid));
          this.AddEmbedComponent.addToolBox(uid, embedUrl);
          pluginType = 'embed';
          newBoardCard.setContent(embedUrl);
        } else if (pluginComponent === this.AddTwitterComponent) {
          $(`#${id}`).append(this.blockFunction(uid));
          this.AddTwitterComponent.addToolBox(uid, embedUrl);
          pluginType = 'tweet';
          newBoardCard.setContent(embedUrl);
        } else {
          $(`#${id}`).append(this.blockFunction(uid));
          pluginComponent.addToolBox(uid);
        }
      } else {
        addBefore
          ? $(`#${id}`).before(this.blockFunction(uid))
          : $(`#${id}`).after(this.blockFunction(uid));
      }

      // Adding listener to current card
      $(`#original-${uid}`).click(() => {
        this.currentChartID = uid;
      });
      $(`#original-${uid}`).bind('paste', (e) => {

        this.onPaste(e, uid);
      });

      // Changing focus to Current Card
      $(`#original-${uid}`).focus();

      if (pluginType === 'embed'){
        $(`#cb-box-2-${uid}`).focus();
      }
      // Setting current card id
      this.currentChartID = uid;

      // Setting Plugin Type to card
      newBoardCard.setpluginType(pluginType);

      // Adding to UserBlocks Map
      this.userBlocks.set(uid, newBoardCard);
      // this.userBlocks.push(newBoardCard);

      this.addToolBar(uid, pluginType);

      // keydown events
      this.keyPressEvents(uid);

      // // Add Canvasboard Tag
      // this.AddCanvasBoard.addCanvasBoardHTMLCode(uid);
      // this.AddCanvasBoard.addCanvasBoardClickFunction(uid);

      // Calling Add Canvas board function when addBefore is True
      if (addBefore) {
        // Adding Canvas board
        $(`#add-canvas-cb-${uid}`).click(() => {
          const parentWidth = $(`#original-${uid}`).width();
          $(`#original-${uid}`).append(`
          <div id="canvas-menu-box" class="canvas-menu-box">
             <input id="canvas-menu-box-${uid}" type="color" style="margin-left: 50%; margin-bottom: 5px;">
          </div>
          <canvas id="canvas-${uid}" class="shadow"></canvas>
        `);
          // This code(styles) should not be added it will cause problems in fabric

          const canvas = new fabric.Canvas(`canvas-${uid}`);
          canvas.isDrawingMode = true;
          canvas.setHeight('400');
          canvas.setWidth(parentWidth);

          // changing pen color
          // canvas.freeDrawingBrush.color
          $(`#canvas-menu-box-${uid}`).on('change', () => {
            const color: any = document.getElementById(
              `canvas-menu-box-${uid}`
            );
            const data = color.value;
            canvas.freeDrawingBrush.color = data;
          });
        });
      }
    } catch (err) {
      console.log('Error', err);
    }
  }
  // ----------------------- RIGHT TOOLBAR IN THE BLOCKS ----------------------------------------
  addToolBar(uid, pluginType: PluginType) {
    // hiding and showing the TOOLBAR
    $(`#show-more-toolbox-${uid}`).hover(
      // display block
      () => {
        $(`#cb-expand-more-toolbox-${uid}`).css('display', 'block');
      },
      //  display none
      () => {
        $(`#cb-expand-more-toolbox-${uid}`).css('display', 'none');
      }
    );

    // Plugin Type specific plugins

    const components = [];
    switch (pluginType) {
      case 'editor': {
        components.push(this.AddRedBackgroundComponent);
        components.push(this.AddGreenBackgroundComponent);
        components.push(this.AddYellowBackgroundComponent);
        components.push(this.AddBlueBackgroundComponent);
        components.push(this.AddClearBackgroundComponent);
        components.push(this.AddOrderedListComponent);
        components.push(this.AddUnOrderedListComponent);
        components.push(this.AddH1Component);
        components.push(this.AddH2Component);
        components.push(this.AddH3Component);
        components.push(this.AddParaComponent);
        components.push(this.AddLeftAlignComponent);
        components.push(this.AddCenterAlignComponent);
        components.push(this.AddRightAlignComponent);
        break;
      }
      case 'board': {
        break;
      }
      case 'embed': {
        break;
      }
      case 'fileUpload': {
        break;
      }
      case 'markdown': {
        break;
      }
      case 'tweet': {
        break;
      }
      default: {
        break;
      }
    }

    // Add Delete HTML and click Function
    this.AddDeleteComponent.addHTMLCode(uid);
    this.AddDeleteComponent.addClickFunction(uid);
    $(`#remove-cb-box1-${uid}`).click(() => {
      this.currentChartID = this.AddDeleteComponent.prevCardID;
    });

    // Add Top HTML and click Function
    this.AddTopComponent.addHTMLCode(uid);
    this.AddTopComponent.addClickFunction(uid, this.addBlockEditor);

    // Add Bottom HTML and click Function
    this.AddBottomComponent.addHTMLCode(uid);
    this.AddBottomComponent.addClickFunction(uid, this.addBlockEditor);

    components.forEach((ele) => {
      ele.addHTMLCode(uid);
      ele.addClickFunction(uid);
    });
  }

  // ----------------------- Disable Enter Keyword in Title -----------------------
  disableTitleEnter() {
    $('#title[contenteditable]').keypress((evt) => {
      const keycode = evt.charCode || evt.keyCode;
      if (keycode === 13) {
        // Enter key's keycode
        return false;
      }
    });
  }

  // ----------------------- Check URL validity -----------------------
  validURL(str) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
  // ----------------------- BACK BUTTON ----------------------------------
  async backButton() {
    this.router.navigateByUrl(`/folder/${this.folderID}`);
    this.saveData();
  }

  // ----------------------- Save, Retrieve Functions and Population -----------------------
  async saveData() {
    const boardTitle = document.getElementById('title').innerText.trim();
    this.fileName = boardTitle; // Board Title

    const data = []; // Array of card Data

    const ids = []; // ID's Array for Order

    // Retrieve Order of IDs of cards
    $('#main-box>div').each(function(i) {
      if ($(this).prop('id').substring(0, 9) === 'cb-box-1-') {
        ids.push($(this).prop('id').substring(9));
      }
    });

    // Push Data of Each Card into data Array
    ids.forEach((key) => {
      const ele: NewBoardCard = this.userBlocks.get(key);

      // For Editor Save Html Data which is Text
      if (
        ele.getpluginType() === 'editor' ||
        ele.getpluginType() === undefined
      ) {
        ele.setContent($(`#original-${key}`).html());
      } else if (ele.getpluginType() === 'board') {
        // For Board Save FabricJS object data
        ele.setContent(this.AddCanvasBoard.getContent(ele.cardID));
      } else if (ele.getpluginType() === 'markdown') {
        ele.setContent(this.AddMarkDownComponent.getContent(ele.cardID));
      }
      // Save Class List of each Card
      ele.setClassList($(`#cb-box-2-${key}`).attr('class'));
      data.push(ele);
    });

    // Data Save

    if (
      (this.fileData !== null && this.fileData !== undefined) ||
      this.fileID !== undefined
    ) {
      const saveDataJson = {
        file_name: boardTitle === '' ? 'Untitled' : boardTitle,
        file_id: this.fileID,
        data: [],
        is_modified: true,
      };
      saveDataJson.data = data;
      this.apiService.saveBoardData(saveDataJson);
    } else {
      const createDataJson = {
        file_name: boardTitle === '' ? 'Untitled' : boardTitle,
        folder_id: this.folderID,
        file_tag: 'testing',
        data: [],
      };
      createDataJson.data = data;
      this.fileID = (await this.apiService.createBoardData(createDataJson))._id;
    }

    // Save Notification
    $('#saveToast').toast('show');
  }
  async retrieveData(fileID) {
    const response = await this.apiService.getBoardData(fileID);
    const boardData = await response.content;
    this.populateData(boardData);
  }

  // Populate data from files component from Navigation Extras
  populateData(data: NewBoard | Params) {
    this.fileTag = data.file_tag;
    this.fileName = data.file_name;
    document.getElementById('title').innerText = this.fileName; // Set Title
    let prevId = ''; // Previous Card ID
    data.data.forEach((element, index) => {
      // Add Cards to CardsMap
      this.userBlocks.set(element.cardID, NewBoardCard.fromData(element));

      // First Card add below sub-title Element else after Previous Card
      if (index === 0) {
        $(`#sub-title`).after(this.blockFunction(element.cardID));
      } else {
        $(`#cb-box-1-${prevId}`).after(this.blockFunction(element.cardID));
      }

      // Add ToolBar
      this.addToolBar(element.cardID, element.pluginType);

      // keydown events
      this.keyPressEvents(element.cardID);

      // Add Cards according to Plugin Type
      switch (element.pluginType) {
        case 'editor' || undefined: {
          $(`#original-${element.cardID}`).html(element.content);
          break;
        }
        case 'board': {
          this.AddCanvasBoard.setContent(element.cardID, element.content);
          break;
        }
        case 'embed': {
          this.AddEmbedComponent.addToolBox(element.cardID, element.content);
          break;
        }
        case 'tweet': {
          this.AddTwitterComponent.addToolBox(element.cardID, element.content);
          break;
        }
        case 'markdown': {
          this.AddMarkDownComponent.setContent(element.cardID, element.content);
          break;
        }
        default: {
          $(`#original-${element.cardID}`).html(element.content);
        }
      }
      $(`#original-${element.cardID}`).bind('paste', (e) => {

        this.onPaste(e, element.cardID);
      });
      // Add Class list to the card
      $(`#cb-box-2-${element.cardID}`).addClass(element.classList);

      // Change CardID to previous CardID
      prevId = element.cardID;

      // Adding listener to current card
      $(`#original-${element.cardID}`).click(() => {
        this.currentChartID = element.cardID;
      });
    });

    // Adding Last card as current Card
    this.currentChartID = prevId;
  }

  // ----------------------- Save Toast Notification -----------------------
  addToast = (body) => {
    $('#toasts').append(`
    <!-- Toast tag -->
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="../../../assets/home/logo_bw.png" width="38" height="40" class="d-inline-block align-top mr-1" alt="CB" loading="lazy">
        <strong class="me-auto">Canvasboard Beta</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${body}
      </div>
    </div>
    `);
  }

  // ----------------------- Paste fix for contenteditable -----------------------
  // pasteFix = () => {
  //   $(document).on('copy', '[contenteditable]', (e) => {
  //     e = e.originalEvent;
  //     const selectedText = window.getSelection();
  //     const range = selectedText.getRangeAt(0);
  //     const selectedTextReplacement = range.toString();
  //     e.clipboardData.setData('text/plain', selectedTextReplacement);
  //     e.preventDefault(); // default behaviour is to copy any selected text
  //   });

  //   $(document).on('paste', '[contenteditable]', (e) => {
  //     e.preventDefault();

  //     if ((window as any).clipboardData) {
  //       const content = (window as any).clipboardData.getData('Text');
  //       if (window.getSelection) {
  //         const selObj = window.getSelection();
  //         const selRange = selObj.getRangeAt(0);
  //         selRange.deleteContents();
  //         selRange.insertNode(document.createTextNode(content));
  //       }
  //     } else if (e.originalEvent.clipboardData) {
  //       const content = (e.originalEvent || e).clipboardData.getData(
  //         'text/plain'
  //       );
  //       document.execCommand('insertText', false, content);
  //     }
  //   });
  // }

  // ----------------------- Reveal JS ------------------------------------------
  openSlideMenu = () => {
    document.getElementById('menu').style.width = '250px';
    const divsToHide = document.getElementsByClassName('slider'); // divsToHide is an array

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < divsToHide.length; i++) {
      // divsToHide[i].style.visibility = "hidden";
      const div = divsToHide[i] as HTMLElement;
      div.style.display = 'none';
    }
    document.getElementById('content').style.marginLeft = '250px';
  }

  // ----------------------- Key board Shortcuts ---------------------------------
  keyPressEvents(uid) {
    const KEYS = new Set();

    // On keydown Events
    $(`#original-${uid}`).keydown((e) => {
      KEYS.add(e.which);

      // Key conditions
      // ctrl + s
      if (KEYS.has(17) && KEYS.has(83)) {
        e.preventDefault();
        this.saveData();
      }

      // cmd + s
      if (KEYS.has(91) && KEYS.has(83)) {
        e.preventDefault();
        this.saveData();
      }

      // shift+ ctrl + z
      if (KEYS.has(16) && KEYS.has(17) && KEYS.has(90)) {
        e.preventDefault();
        this.activateFuseList();
      }

      // shift+ cmd + z
      if (KEYS.has(16) && KEYS.has(91) && KEYS.has(90)) {
        e.preventDefault();
        this.activateFuseList();
      }

      // // H1 -> shift +ctrl + 1
      // if (KEYS.has(16) && KEYS.has(17) && KEYS.has(49)) {
      //   e.preventDefault();
      //   this.cbToolbox(this.AddH1Component);
      // }
      // // H1 -> shift + cmd + 1
      // if (KEYS.has(16) && KEYS.has(91) && KEYS.has(49)) {
      //   e.preventDefault();
      //   this.cbToolbox(this.AddH1Component);
      // }

      // // H2 -> shift +ctrl + 2
      // if (KEYS.has(16) && KEYS.has(17) && KEYS.has(50)) {
      //   e.preventDefault();
      //   this.cbToolbox(this.AddH2Component);
      // }
      // // H2 -> shift + cmd + 2
      // if (KEYS.has(16) && KEYS.has(91) && KEYS.has(50)) {
      //   e.preventDefault();
      //   this.cbToolbox(this.AddH2Component);
      // }

      // // H3 -> shift +ctrl + 3
      // if (KEYS.has(16) && KEYS.has(17) && KEYS.has(51)) {
      //   e.preventDefault();
      //   this.cbToolbox(this.AddH3Component);
      // }
      // // H3 -> shift + cmd + 3
      // if (KEYS.has(16) && KEYS.has(91) && KEYS.has(51)) {
      //   e.preventDefault();
      //   this.cbToolbox(this.AddH3Component);
      // }
      // P on Enter
      if (KEYS.size === 1 && KEYS.has(13)) {
        e.preventDefault();
        this.cbToolboxBottomTag();
      }
    });

    // Remove the keys from the set.
    $(`#original-${uid}`).keyup((e) => {
      KEYS.delete(e.which);
    });
  }

  onPaste(event: any, uid: any) {
    event.preventDefault();
    const pastedData = event.originalEvent.clipboardData.getData('text');
    if ($(`#original-${uid}`).html() === '<br>'){
      $(`#original-${uid}`).html(pastedData);
    }
    else{
      $(`#original-${uid}`).append(pastedData);
    }
    this.placeCaretAtEnd(document.getElementById(`original-${uid}`));
  }

  placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection !== 'undefined'
    && typeof document.createRange !== 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange !== 'undefined') {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

  shortcuts = () => {
    // ESC
    Mousetrap.bind(['Esc', 'Esc'], (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }
      const div = document.getElementById('revealDiv');
      div.style.display = 'none';
    });

    // Save
    Mousetrap.bind(['command+s', 'ctrl+s'], (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }
      this.saveData();
    });

    // H1 tag
    Mousetrap.bind(['command+shift+1', 'ctrl+shift+1'], (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }
      this.cbToolbox(this.AddH1Component);
    });

    // H2 tag
    Mousetrap.bind(['command+shift+2', 'ctrl+shift+2'], (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }
      this.cbToolbox(this.AddH2Component);
    });

    // H3 tag
    Mousetrap.bind(['command+shift+3', 'ctrl+shift+3'], (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }
      this.cbToolbox(this.AddH3Component);
    });

    // Fuse search
    Mousetrap.bind(['command+shift+z', 'ctrl+shift+z'], (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // internet explorer
        e.returnValue = false;
      }
      this.activateFuseList();
    });
  }

  cbToolboxPresent = () => {
    this.saveData();
    const slides = $('#revealDiv .slides');
    slides.empty();

    $('#main-box>div').each(function(i) {
      if ($(this).prop('id').substring(0, 9) === 'cb-box-1-') {
        const id = $(this).prop('id').substring(9);
        const section =
          `<section data-background-color="white">` +
          $(`#real-content-box-${id}`).html() +
          `</section>`;
        slides.append(section);
      }
    });
    this.deck.sync();
    this.deck.slide(0);
    this.deck.toggleHelp(true);
  }
  closeSlideMenu = () => {
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
    const divsToHide = document.getElementsByClassName('slider'); // divsToHide is an array
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < divsToHide.length; i++) {
      // divsToHide[i].style.visibility = "hidden";
      const div = divsToHide[i] as HTMLElement;
      div.style.display = '';
    }
  }

  // ----------------------- TOOLBOX CLICK FUNCTIONALITY -------------------------
  cbToolbox(
    pluginComponent: BasePluginComponent,
    pType?: PluginType,
    embedUrl?: string
  ) {
    this.addBlockEditor({ id: 'main-box', pluginComponent, pType, embedUrl });
  }

  cbToolboxDeleteTag = () => {
    this.AddDeleteComponent.addToolBox(this.currentChartID);
    this.currentChartID = this.AddDeleteComponent.prevCardID;
  }

  cbToolboxTopTag = () => {
    this.AddTopComponent.addToolBox(this.currentChartID, this.addBlockEditor);
  }

  cbToolboxBottomTag = () => {
    this.AddBottomComponent.addToolBox(
      this.currentChartID,
      this.addBlockEditor
    );
  }

  cbToolboxClearFont = () => {
    this.AddClearFontComponent.addToolBox(this.currentChartID);
  }

  cbToolboxPdfRender = () => {
    $('#pdfFile').click();
    this.addBlockEditor({
      id: 'main-box',
      pluginComponent: this.AddPdfRenderComponent,
    });
  }

  cbToolboxYoutube = () => {
    this.addBlockEditor({
      id: 'main-box',
      pluginComponent: this.AddEmbedComponent,
      embedUrl: $('#youtubeEmbedURL')
        .val()
        .replace(/watch\?v=/gi, 'embed/'),
    });
  }

  cbToolboxClock = () => {
    this.addBlockEditor({
      id: 'main-box',
      pluginComponent: this.AddEmbedComponent,
      embedUrl: 'plugins/clock',
    });
  }

  cbToolboxTwitter = async () => {
    const response = await this.apiService.getTweet(
      $('#twitterEmbedURL').val()
    );
    this.addBlockEditor({
      id: 'main-box',
      pluginComponent: this.AddTwitterComponent,
      embedUrl: response.html,
    });
  }

}
