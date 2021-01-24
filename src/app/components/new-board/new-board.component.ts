import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, NavigationExtras, Params } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { fabric } from 'fabric';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { RestService } from '../../services/rest.service';
import { Chart } from 'chart.js';
import Swal from 'sweetalert2';
import { BrowserStack } from 'protractor/built/driverProviders';
import { NewBoardCard } from './new-board-card';
import { NewBoard } from 'src/interfaces/new-board';
import { each, param } from 'jquery';
import { TwitterData } from 'src/interfaces/twitterData';
import { AddBlockEditorParameters } from 'src/interfaces/add-block-parameters';
import { PluginComponent } from 'src/interfaces/plugin-component';
import { BasePluginComponent } from 'src/interfaces/base-plugin-component';
import { PluginType } from 'src/interfaces/plugin-type';

// Importing Plugins
import { AddH1Component } from '../../plugins/cb-h1';
import { AddCanvasBoard } from '../../plugins/cb-whiteboard';
import { AddH2Component } from '../../plugins/cb-h2';
import { AddH3Component } from '../../plugins/cb-h3';
import { AddParaComponent } from '../../plugins/cb-p';
import { AddRedBackgroundComponent } from '../../plugins/color-background/cb-redbackground';
import { AddBlueBackgroundComponent } from '../../plugins/color-background/cb-bluebackground';
import { AddYellowBackgroundComponent } from '../../plugins/color-background/cb-yellowbackground';
import { AddGreenBackgroundComponent } from '../../plugins/color-background/cb-greenbackground';
import { AddClearBackgroundComponent } from '../../plugins/color-background/cb-clearbackground';

import { AddFontMonospaceComponent } from '../../plugins/monospace';
import { AddFontPlayfairComponent } from '../../plugins/playfair';
import { AddFontKalamComponent } from '../../plugins/kalam';
import { AddClearFontComponent } from '../../plugins/clear-font';
import { AddLeftAlignComponent } from '../../plugins/left-align';
import { AddCenterAlignComponent } from '../../plugins/center-align';
import { AddRightAlignComponent } from '../../plugins/right-align';
import { AddOrderedListComponent } from '../../plugins/ordered-list';
import { AddUnOrderedListComponent } from '../../plugins/unordered-list';
import { AddTopComponent } from '../../plugins/top';
import { AddBottomComponent } from '../../plugins/bottom';
import { AddDeleteComponent } from '../../plugins/delete';
import { AddEmbedComponent } from '../../plugins/embed';
import { AddPdfRenderComponent } from '../../plugins/pdf-render';
import { AddTwitterComponent } from 'src/app/plugins/twitter';


declare var $: any;

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private apiService: RestService, private router: Router) {
    this.activatedRoute.params.subscribe(params => { this.folderID = params.folderId; this.fileID = params.fileId; });
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.state !== undefined) {
        this.fileData = this.router.getCurrentNavigation().extras.state.fileData;
        this.folderID = this.router.getCurrentNavigation().extras.state.folderId;
      }
    }
    // Initialize the Map
    this.userBlocks = new Map();

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
    this.reader = new FileReader();


  }

  fileName: string;
  fileID: Data;
  folderID: Data;
  fileData: NavigationExtras;
  fileTag: Array<string>;
  fileToUpload: File = null;

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

  uniqueChartID = (() => {
    let id = 0;
    return () => {
      return id++;
    };
  })();


  ngOnInit() {

    // sortable-js
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

    // ......................... DISABLING ENTER KEYWORD .........................
    $('#original[contenteditable]').keypress((evt) => {
      const keycode = evt.charCode || evt.keyCode;
      if (keycode === 13) {
        // Enter key's keycode
        return false;
      }
    });
    // console.log(this.fileID);
    if (this.fileData !== null && this.fileData !== undefined) {
      this.populateData(this.fileData.queryParams);

    } else if (this.fileID !== undefined) {
      this.retrieveData(this.fileID);
    } else {
      this.addBlockEditor({ id: 'sub-title', pluginComponent: null });
    }
  }

  // ......................... BLOCK BUILDING FUNCITON............................
  blockFunction = (uid) => {
    const data = `
    <div id="cb-box-1-${uid}" class="cb-box-1">
    <div class="row mx-0">
      <!-- plug for dragging -->
      <div class="dragHandle col-1 col-cb-1-custom" style="padding: 0px; padding-top: 7px; max-width: 4%; flex: 0 0 4%;" title="Drag">
        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-grip-horizontal"
        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7
          5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2
          0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0
          1 2 0z"/>
        </svg>
      </div>
      <div class="col-10 px-0" style="max-width: 90%; flex: 0 0 90%;">
        <!-- content box -->
        <div id="cb-box-2-${uid}" class="cb-box-2 mt-2 mb-2" style="margin-left: 3px; border-radius: 5px;">
          <div class="cb-box-3">
            <div id="original-${uid}" class="edit" contenteditable="true" style="padding-left: 3px;">

            </div>
          </div>
        </div>
      </div>
      <!-- menu icon -->
      <div id="show-more-toolbox-${uid}" class="col-1 px-0" style="max-width: 5%; flex: 0 0 5%;">
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

  // .........................ADDING BLOCK AFTER THE DIV FUNCTION.................
  addBlockEditor = ({ id, pluginComponent = null, pType = 'editor', addBefore = false, embedUrl = null }: AddBlockEditorParameters) => {
    try {
      // getting uid and appending after specified ID
      const uid: any = uuidv4();

      const newBoardCard: NewBoardCard = new NewBoardCard(uid, -1, this.userBlocks.size);
      let pluginType: PluginType = pType;

      if (pluginComponent !== null) {

        if (pluginComponent === this.AddTopComponent || pluginComponent === this.AddBottomComponent) {

          addBefore ? $(`#${id}`).before(this.blockFunction(uid)) : $(`#${id}`).after(this.blockFunction(uid));

        } else if (pluginComponent === this.AddPdfRenderComponent) {

          $('#pdfFile').change((event) => {
            $(`#${id}`).append(this.blockFunction(uid));
            this.AddPdfRenderComponent.addToolBox(uid, event.target.files[0], this.reader);
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

        addBefore ? $(`#${id}`).before(this.blockFunction(uid)) : $(`#${id}`).after(this.blockFunction(uid));
      }

      // Adding listener to current card
      $(`#original-${uid}`).click(() => { this.currentChartID = uid; });

      // Changing focus to Current Card
      $(`#original-${uid}`).focus();

      // Setting current card id
      this.currentChartID = uid;

      // Setting Plugin Type to card
      newBoardCard.setpluginType(pluginType);

      // Adding to UserBlocks Map
      this.userBlocks.set(uid, newBoardCard);
      // this.userBlocks.push(newBoardCard);

      this.addToolBar(uid);

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
            const color: any = document.getElementById(`canvas-menu-box-${uid}`);
            const data = color.value;
            canvas.freeDrawingBrush.color = data;
          });
        });
      }



    } catch (err) {
      console.log('Error', err);
    }
  }

  addToolBar(uid) {
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

    // Add Delete HTML and click Function
    this.AddDeleteComponent.addHTMLCode(uid);
    this.AddDeleteComponent.addClickFunction(uid);
    $(`#remove-cb-box1-${uid}`).click(() => {
      this.currentChartID = this.AddDeleteComponent.prevCardID;
    });
    // Adding red background toolbox
    this.AddRedBackgroundComponent.addHTMLCode(uid);
    this.AddRedBackgroundComponent.addClickFunction(uid);
    // Adding green background toolbox
    this.AddGreenBackgroundComponent.addHTMLCode(uid);
    this.AddGreenBackgroundComponent.addClickFunction(uid);

    // Adding yellow background toolbox
    this.AddYellowBackgroundComponent.addHTMLCode(uid);
    this.AddYellowBackgroundComponent.addClickFunction(uid);

    // Adding blue background toolbox
    this.AddBlueBackgroundComponent.addHTMLCode(uid);
    this.AddBlueBackgroundComponent.addClickFunction(uid);

    // Adding clear background toolbox
    this.AddClearBackgroundComponent.addHTMLCode(uid);
    this.AddClearBackgroundComponent.addClickFunction(uid);

    // Add OrderedList HTML and click Function
    this.AddOrderedListComponent.addHTMLCode(uid);
    this.AddOrderedListComponent.addClickFunction(uid);

    // Add UnOrderedList HTML and click Function
    this.AddUnOrderedListComponent.addHTMLCode(uid);
    this.AddUnOrderedListComponent.addClickFunction(uid);

    // Add Top HTML and click Function
    this.AddTopComponent.addHTMLCode(uid);
    this.AddTopComponent.addClickFunction(uid, this.addBlockEditor);

    // Add Bottom HTML and click Function
    this.AddBottomComponent.addHTMLCode(uid);
    this.AddBottomComponent.addClickFunction(uid, this.addBlockEditor);

    // Add H1 HTML and click Function
    this.AddH1Component.addHTMLCode(uid);
    this.AddH1Component.addClickFunction(uid);

    // Adding H2 HTML and click function
    this.AddH2Component.addHTMLCode(uid);
    this.AddH2Component.addClickFunction(uid);

    // Adding H3 Tags
    this.AddH3Component.addHTMLCode(uid);
    this.AddH3Component.addClickFunction(uid);

    // Adding para tags
    this.AddParaComponent.addHTMLCode(uid);
    this.AddParaComponent.addClickFunction(uid);


    // Adding Left Align HTML and click Function
    this.AddLeftAlignComponent.addHTMLCode(uid);
    this.AddLeftAlignComponent.addClickFunction(uid);

    // Adding Center Align HTML and click Function
    this.AddCenterAlignComponent.addHTMLCode(uid);
    this.AddCenterAlignComponent.addClickFunction(uid);

    // Adding Right Align HTML and click Function
    this.AddRightAlignComponent.addHTMLCode(uid);
    this.AddRightAlignComponent.addClickFunction(uid);

  }


  // ......................... ESSENTIALS.............................

  disableTitleEnter() {
    $('#title[contenteditable]').keypress((evt) => {
      const keycode = evt.charCode || evt.keyCode;
      if (keycode === 13) {
        // Enter key's keycode
        return false;
      }
    });
  }

  // Check url validity
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
      if (ele.getpluginType() === 'editor' || ele.getpluginType() === undefined) {
        ele.setContent($(`#original-${key}`).html());
      } else if (ele.getpluginType() === 'board') {
        // For Board Save FabricJS object data
        ele.setContent(this.AddCanvasBoard.getContent(ele.cardID));
      }
      // Save Class List of each Card
      ele.setClassList($(`#cb-box-2-${key}`).attr('class'));
      data.push(ele);
    });

    // Data Save

    if ((this.fileData !== null && this.fileData !== undefined) || this.fileID !== undefined) {
      const saveDataJson = {
        file_name: boardTitle === '' ? 'untitled' : boardTitle,
        file_id: this.fileID,
        data: [],
        is_modified: true
      };
      saveDataJson.data = data;
      this.apiService.saveBoardData(saveDataJson);
    } else {
      const createDataJson = {
        file_name: boardTitle === '' ? 'untitled' : boardTitle,
        folder_id: this.folderID,
        file_tag: 'testing',
        data: []
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
      this.addToolBar(element.cardID);

      // Add Cards according to Plugin Type
      switch (element.pluginType){
        case 'editor' || undefined : {
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
        default: {
          $(`#original-${element.cardID}`).html(element.content);
        }
      }

      // Add Class list to the card
      $(`#cb-box-2-${element.cardID}`).addClass(element.classList);

      // Change CardID to previous CardID
      prevId = element.cardID;

      // Adding listener to current card
      $(`#original-${element.cardID}`).click(() => { this.currentChartID = element.cardID; });
    });

    // Adding Last card as current Card
    this.currentChartID = prevId;
  }

  // Notification Code
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


  openSlideMenu = () => {
    document.getElementById('menu').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
  }
  closeSlideMenu = () => {
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
  }

    // ......................... TOOLBOX CLICK FUNCTIONALITY .........................
  cbToolbox(pluginComponent: BasePluginComponent, pType?: PluginType, embedUrl?: string){
    this.addBlockEditor({ id: 'main-box', pluginComponent, pType, embedUrl });

  }

  // Adding Delete
  cbToolboxDeleteTag = () => {
    this.AddDeleteComponent.addToolBox(this.currentChartID);
    this.currentChartID = this.AddDeleteComponent.prevCardID;
  }

  // Adding Top
  cbToolboxTopTag = () => {
    this.AddTopComponent.addToolBox(this.currentChartID, this.addBlockEditor);
  }

  // Adding Bottom
  cbToolboxBottomTag = () => {
    this.AddBottomComponent.addToolBox(this.currentChartID, this.addBlockEditor);
  }

  // Clearing all fonts
  cbToolboxClearFont = () => {
    this.AddClearFontComponent.addToolBox(this.currentChartID);
  }

  // Adding PdfRender
  cbToolboxPdfRender = () => {
    $('#pdfFile').click();
    this.addBlockEditor({ id: 'main-box', pluginComponent: this.AddPdfRenderComponent });
  }

  // Adding Youtube
  cbToolboxYoutube = () => {
    this.addBlockEditor({ id: 'main-box', pluginComponent: this.AddEmbedComponent,
    embedUrl: $('#youtubeEmbedURL').val().replace(/watch\?v=/gi, 'embed/') });
  }

  // Adding Clock
  cbToolboxClock = () => {
    this.addBlockEditor({ id: 'main-box', pluginComponent: this.AddEmbedComponent, embedUrl: 'plugins/clock' });
  }

  // Adding Twitter
  cbToolboxTwitter = async () => {
    const response = await this.apiService.getTweet($('#twitterEmbedURL').val());
    this.addBlockEditor({ id: 'main-box', pluginComponent: this.AddTwitterComponent, embedUrl: response.html });

  }
}
