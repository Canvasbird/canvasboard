import { Component, OnInit } from "@angular/core";
import { v4 as uuidv4 } from "uuid";

declare var $: any;

@Component({
  selector: "app-new-board",
  templateUrl: "./new-board.component.html",
  styleUrls: ["./new-board.component.scss"],
})
export class NewBoardComponent implements OnInit {
  /**
   * Quill editor style
   */
  quillEditorStyle = {
    height: "320px",
  };

  constructor() {}

  ngOnInit() {
    //Initials
    this.disableTitleEnter();

    // /////////////////////////////////////////////////////////////////
    // ......................... DISABLING ENTER KEYWORD .........................
    $("#original[contenteditable]").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) {
        //Enter key's keycode
        return false;
      }
    });
    // ............................. Initialing with a div..................................
    this.addAfterBlockEditor("sub-title", 0);
    // ////////////////////////////////////////////////////////////////////
  }

  // ........................ UTILITY FUNCTIONS ...........................

  //.........................ADDING BLOCK AFTER THE DIV FUNCTION.................
  addAfterBlockEditor = (id, checker) => {
    try {
      // getting uid and appending after specified ID
      let uid: any = uuidv4();

      if (checker === 0) {
        $(`#${id}`).after(`
      <div id="cb-box-1-${uid}" class="cb-box-1">
      <div class="row">
        <div class="col-11 px-1">
          <!-- content box -->
          <div id="cb-box-2-${uid}" class="cb-box-2 mt-2 mb-2">
            <div class="cb-box-3">
              <div id="original-${uid}" class="edit" contenteditable="true">

              </div>
            </div>
          </div>
        </div>
        <!-- menu icon -->
        <div id="show-more-toolbox-${uid}" class="col-1 px-0">
          <!-- menu button -->
          <div class="cb-toolbox">
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-justify" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>

          <!-- expand toolbox -->
          <div id="cb-expand-more-toolbox-${uid}" class="cb-more-toolbox">
            <div class="toolbox-main shadow">
              <!-- delete button -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="remove-cb-box1-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </button>
              </div>
              <!-- H1 tag -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="add-h1-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h1" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
                  </svg>
                </button>
              </div>
              <!-- h2 tag -->
              <div class="tool box2 m-1">
                <button class="btn btn-light" id="add-h2-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h2" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
                  </svg>
                </button>
              </div>
              <!-- h3 tag -->
              <div class="tool box3 m-1">
                <button class="btn btn-light" id="add-h3-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h3" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
                  </svg>
                </button>
              </div>
              <!-- paragraph -->
              <div class="tool box4 m-1">
                <button class="btn btn-light" id="add-p-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-text-paragraph" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- more -->
              <div class="tool box5 m-1">
                <button class="btn btn-light">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </div>
              <!-- top -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-prev-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-up" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- bottom -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-down" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
  } //close of if statement of 0

  if(checker === 1){
  $(`#cb-box-1-${id}`).after(`
      <div id="cb-box-1-${uid}" class="cb-box-1">
      <div class="row">
        <div class="col-11 px-1">
          <!-- content box -->
          <div id="cb-box-2-${uid}" class="cb-box-2 mt-2 mb-2">
            <div class="cb-box-3">
              <div id="original-${uid}" class="edit" contenteditable="true">

              </div>
            </div>
          </div>
        </div>
        <!-- menu icon -->
        <div id="show-more-toolbox-${uid}" class="col-1 px-0">
          <!-- menu button -->
          <div class="cb-toolbox">
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-justify" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>

          <!-- expand toolbox -->
          <div id="cb-expand-more-toolbox-${uid}" class="cb-more-toolbox">
            <div class="toolbox-main shadow">
              <!-- delete button -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="remove-cb-box1-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </button>
              </div>
              <!-- H1 tag -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="add-h1-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h1" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
                  </svg>
                </button>
              </div>
              <!-- h2 tag -->
              <div class="tool box2 m-1">
                <button class="btn btn-light" id="add-h2-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h2" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
                  </svg>
                </button>
              </div>
              <!-- h3 tag -->
              <div class="tool box3 m-1">
                <button class="btn btn-light" id="add-h3-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h3" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
                  </svg>
                </button>
              </div>
              <!-- paragraph -->
              <div class="tool box4 m-1">
                <button class="btn btn-light" id="add-p-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-text-paragraph" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- more -->
              <div class="tool box5 m-1">
                <button class="btn btn-light">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </div>
              <!-- top -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-prev-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-up" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- bottom -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-down" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
  } //end of if case 1

  //hiding and showing the TOOLBOX
  $(`#show-more-toolbox-${uid}`).hover(
    //display block
    () => {
      console.log("Showing");
      $(`#cb-expand-more-toolbox-${uid}`).css("display", "block");
    },
    //  display none
    () => {
      console.log("None");
      $(`#cb-expand-more-toolbox-${uid}`).css("display", "none");
    }
  );
  //Adding click action of above button
  $(`#add-new-box-prev-${uid}`).click(() => {
    this.addBeforeBlockEditor(uid, 1);
  });

  //  Adding the click action of the below button
  $(`#add-new-box-${uid}`).click(() => {
    this.addAfterBlockEditor(uid, 1);
  });

  // Delete/Remove button
  $(`#remove-cb-box1-${uid}`).click( () => {
    $(`#cb-box-1-${uid}`).remove()
  })

  //Adding H1 Tags
  $(`#add-h1-box2-${uid}`).click( () => {
    console.log("Atleast working");
    $(`#cb-box-2-${uid}`).removeClass("cb-H2 cb-H3").addClass("cb-H1")
  })

  //Adding H2 Tags
  $(`#add-h2-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H1 cb-H3").addClass("cb-H2")
  })

  //Adding H3 Tags
  $(`#add-h3-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H1 cb-H2").addClass("cb-H3")
  })

  //Adding Paragraphs
  $(`#add-p-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H1 cb-H2 cb-H3")
  })


    } catch (err) {
      console.log("Error", err);
    }
  };

  //.........................ADDING BLOCK BEFORE DIV FUNCTION...................
  addBeforeBlockEditor = (id, checker) => {
    try {
      // getting uid and appending after specified ID
      let uid: any = uuidv4();

      if (checker === 0) {

        $(`#${id}`).before(`
      <div id="cb-box-1-${uid}" class="cb-box-1">
      <div class="row">
        <div class="col-11 px-1">
          <!-- content box -->
          <div id="cb-box-2-${uid}" class="cb-box-2 mt-2 mb-2">
            <div class="cb-box-3">
              <div id="original-${uid}" class="edit" contenteditable="true">

              </div>
            </div>
          </div>
        </div>
        <!-- menu icon -->
        <div id="show-more-toolbox-${uid}" class="col-1 px-0">
          <!-- menu button -->
          <div class="cb-toolbox">
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-justify" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>

          <!-- expand toolbox -->
          <div id="cb-expand-more-toolbox-${uid}" class="cb-more-toolbox">
            <div class="toolbox-main shadow">
              <!-- delete button -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="remove-cb-box1-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </button>
              </div>
              <!-- H1 tag -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="add-h1-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h1" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
                  </svg>
                </button>
              </div>
              <!-- h2 tag -->
              <div class="tool box2 m-1">
                <button class="btn btn-light" id="add-h2-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h2" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
                  </svg>
                </button>
              </div>
              <!-- h3 tag -->
              <div class="tool box3 m-1">
                <button class="btn btn-light" id="add-h3-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h3" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
                  </svg>
                </button>
              </div>
              <!-- paragraph -->
              <div class="tool box4 m-1">
                <button class="btn btn-light" id="add-p-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-text-paragraph" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- more -->
              <div class="tool box5 m-1">
                <button class="btn btn-light">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </div>
              <!-- top -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-prev-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-up" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- bottom -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-down" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
  } //close of if statement of 0

  if(checker === 1){
  $(`#cb-box-1-${id}`).before(`
      <div id="cb-box-1-${uid}" class="cb-box-1">
      <div class="row">
        <div class="col-11 px-1">
          <!-- content box -->
          <div id="cb-box-2-${uid}" class="cb-box-2 mt-2 mb-2">
            <div class="cb-box-3">
              <div id="original-${uid}" class="edit" contenteditable="true">

              </div>
            </div>
          </div>
        </div>
        <!-- menu icon -->
        <div id="show-more-toolbox-${uid}" class="col-1 px-0">
          <!-- menu button -->
          <div class="cb-toolbox">
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-justify" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>

          <!-- expand toolbox -->
          <div id="cb-expand-more-toolbox-${uid}" class="cb-more-toolbox">
            <div class="toolbox-main shadow">
              <!-- delete button -->
              <div class="tool box1 m-1">
                <button class="btn btn-light" id="remove-cb-box1-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </button>
              </div>
              <!-- H1 tag -->
              <div class="tool box1 m-1" id="add-h1-box2-${uid}">
                <button class="btn btn-light">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h1" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
                  </svg>
                </button>
              </div>
              <!-- h2 tag -->
              <div class="tool box2 m-1">
                <button class="btn btn-light" id="add-h2-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h2" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
                  </svg>
                </button>
              </div>
              <!-- h3 tag -->
              <div class="tool box3 m-1">
                <button class="btn btn-light" id="add-h3-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h3" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
                  </svg>
                </button>
              </div>
              <!-- paragraph -->
              <div class="tool box4 m-1">
                <button class="btn btn-light" id="add-p-box2-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-text-paragraph" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>

              <!-- more -->
              <div class="tool box5 m-1">
                <button class="btn btn-light">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </div>
              <!-- top -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-prev-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-up" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
              <!-- bottom -->
              <div class="tool box5 m-1">
                <button class="btn btn-light" id="add-new-box-${uid}">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-down" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)

  }

  //hiding and showing the TOOLBOX
  $(`#show-more-toolbox-${uid}`).hover(
    //display block
    () => {
      console.log("Showing");
      $(`#cb-expand-more-toolbox-${uid}`).css("display", "block");
    },
    //  display none
    () => {
      console.log("None");
      $(`#cb-expand-more-toolbox-${uid}`).css("display", "none");
    }
  );
  //Adding click action of above button
  $(`#add-new-box-prev-${uid}`).click(() => {
    this.addBeforeBlockEditor(uid, 1);
  });

  //  Adding the click action of the below button
  $(`#add-new-box-${uid}`).click(() => {
    this.addAfterBlockEditor(uid, 1);
  });

  // Delete/Remove button
  $(`#remove-cb-box1-${uid}`).click( () => {
    $(`#cb-box-1-${uid}`).remove()
  })

  //Adding H1 Tags
  $(`#add-h1-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H2 cb-H3").addClass("cb-H1")
  })

  //Adding H2 Tags
  $(`#add-h2-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H1 cb-H3").addClass("cb-H2")
  })
  //Adding H3 Tags
  $(`#add-h3-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H1 cb-H2").addClass("cb-H3")
  })

  //Adding Paragraphs
  $(`#add-p-box2-${uid}`).click( () => {
    $(`#cb-box-2-${uid}`).removeClass("cb-H1 cb-H2 cb-H3")
  })

    } catch (err) {
      console.log("Error", err);
    }
  };
  // ......................... ESSENTIALS.............................

  disableTitleEnter() {
    $("#title[contenteditable]").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) {
        //Enter key's keycode
        return false;
      }
    });
  }
}
