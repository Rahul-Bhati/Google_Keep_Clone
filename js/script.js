const addTitle = document.getElementById("title");
const addText = document.getElementById("text");
const addNoteButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes");

showNotes();
// local storage vs session storage
// JSON: JavaScript Object Notation

function addNotes(){
     let notes = localStorage.getItem("notes"); 

     // check in local storage there is notes have any val or not 
     if(notes === null) notes = [] ;
     else notes = JSON.parse(notes) ;

     // Check textarea val if empty through alert
     if(addText.value == ''){
          alert("Add Your Notes!") ;
          return;
     }

     // make obj of values of title and text to enter it in notes
     const objForNotes = {
          title : addTitle.value , text : addText.value 
     };

     // now empty the title and textarea val after adding there val in notes
     addTitle.value = "" ;
     addText.value = "" ;

     // now puch that obj in notes arr
     notes.push(objForNotes);

     // now set notes val in local storage 
     localStorage.setItem("notes", JSON.stringify(notes));

     // call showNotes for showing all notes
     showNotes();
}

function showNotes() {
     let notesHTML = "";
     let notes = localStorage.getItem("notes");
     if (notes === null) return;
     else notes = JSON.parse(notes);
     for (let i = 0; i < notes.length; i++) {
     notesHTML += `
          <div class="note">
               <div class="row">
                    <div class="col-1">
                         <span class="title">${notes[i].title === "" ? "Note" : notes[i].title}</span>
                         <div class="text">${notes[i].text}</div>
                    </div>
                    <div class="col-2">
                         <table>
                         <tr><td><button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button></td></tr>
                         <tr></tr><td><button class="archive_notes" id=${i} onclick="ArchiveNote(${i})">Archive</button></td></tr>
                         </table>
                    </div>
               </div>
          </div>
          `;
     }
  notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind) {
     let notes = localStorage.getItem("notes");
     if (notes === null) return;
     else notes = JSON.parse(notes);
     let delNote = notes.splice(ind, 1);
     console.log(delNote[0].text);

     let delNotes = localStorage.getItem("delete_notes");
     if (delNotes === null) return;
     else delNotes = JSON.parse(delNotes);
     delNotes.push(delNote[0]) ;
     localStorage.setItem("delete_notes", JSON.stringify(delNotes));
     localStorage.setItem("notes", JSON.stringify(notes));
     showNotes();
}
addNoteButton.addEventListener("click", addNotes);

function removeNote(ind) {
     let delNotes = localStorage.getItem("delete_notes");
     if (delNotes === null) return;
     else delNotes = JSON.parse(delNotes);
     delNotes.splice(ind, 1);
     localStorage.setItem("delete_notes", JSON.stringify(delNotes));
     showDeleteNotes();
}

function restoreNote(ind) {
     let delNotes = localStorage.getItem("delete_notes");
     if (delNotes === null) return;
     else delNotes = JSON.parse(delNotes);
     let restore = delNotes.splice(ind, 1);
     let notes = localStorage.getItem("notes"); 
     if (notes === null) notes = [];
     else notes = JSON.parse(notes);
     notes.push(restore[0]) ;
     localStorage.setItem("notes", JSON.stringify(notes))
     localStorage.setItem("delete_notes", JSON.stringify(delNotes));
     showDeleteNotes();
}

function showDeleteNotes(){
     let notesHTML = "";
     let notes = localStorage.getItem("delete_notes");
     if (notes === null) return;
     else notes = JSON.parse(notes);
     for (let i = 0; i < notes.length; i++) {
          notesHTML += `
          <div class="del_note">
               <div class="row">
                    <div class="col-1">
                         <span class="title">${notes[i].title === "" ? "Note" : notes[i].title}</span>
                         <div class="text">${notes[i].text}</div>
                    </div>
                    <div class="col-2">
                         <table>
                         <tr><td><button class="deleteNote" id=${i} onclick="removeNote(${i})">Remove</button></td></tr>
                         <tr></tr><td><button class="restoreNote" id=${i} onclick="restoreNote(${i})">Restore</button></td></tr>
                         </table>
                    </div>
               </div>
          </div>
          `;
     }
     document.getElementById("main").style.display = "none";
     document.getElementById("del-note").innerHTML = notesHTML;
}

document.getElementById("deleted_notes").addEventListener('click' , showDeleteNotes);
function unarchiveNote(ind) {
     let arcNotes = localStorage.getItem("archive_notes");
     if (arcNotes === null) return;
     else arcNotes = JSON.parse(arcNotes);
     let restore = arcNotes.splice(ind, 1);
     let notes = localStorage.getItem("notes");
     if (notes === null) notes = [];
     else notes = JSON.parse(notes);
     notes.push(restore[0]);
     localStorage.setItem("notes", JSON.stringify(notes))
     localStorage.setItem("archive_notes", JSON.stringify(arcNotes));
     showArchiveNotes();
}
function showArchiveNotes() {
     let notesHTML = "";
     let notes = localStorage.getItem("archive_notes");
     if (notes === null) return;
     else notes = JSON.parse(notes);
     for (let i = 0; i < notes.length; i++) {
          notesHTML += `
          <div class="del_note">
               <div class="row">
                    <div class="col-1">
                         <span class="title">${notes[i].title === "" ? "Note" : notes[i].title}</span>
                         <div class="text">${notes[i].text}</div>
                    </div>
                    <div class="col-2">
                         <table>
                         <tr></tr><td><button class="unarchiveNote" id=${i} onclick="unarchiveNote(${i})">UnArchive</button></td></tr>
                         </table>
                    </div>
               </div>
          </div>
          `;
     }
     document.getElementById("main").style.display = "none";
     document.getElementById("del-note").innerHTML = notesHTML;
}

function ArchiveNote(ind) {
     let notes = localStorage.getItem("notes");
     if (notes === null) return;
     else notes = JSON.parse(notes);
     let archNotes = notes.splice(ind, 1);
     console.log(archNotes[0].text);

     let archiveNotes = localStorage.getItem("archive_notes");
     if (archiveNotes === null) return;
     else archiveNotes = JSON.parse(archiveNotes);
     archiveNotes.push(archNotes[0]);
     localStorage.setItem("archive_notes", JSON.stringify(archiveNotes));
     localStorage.setItem("notes", JSON.stringify(notes));
     showNotes();
}

document.getElementById("archive_notes").addEventListener('click', showArchiveNotes);




// assignment

/*
1. delete notes: implementation delete array
2. Archieve Notes: implementation archieve array
3. sorting filter, iterate through all the notes, and check 
4. reminder
5. edit note
*/

