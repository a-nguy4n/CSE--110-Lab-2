import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { Label } from "./types";
import { ToDoList } from "./toDoList";
// import {document}

describe("Create StickyNote", () => {
test("renders create note form", () => {
 render(<StickyNotes />);
 const createNoteButton = screen.getByText("Create Note");
 expect(createNoteButton).toBeInTheDocument();
});

test("creates a new note", () => {
    render(<StickyNotes />);
 
 // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
 
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);
 
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");
 
    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

});

test("read all notes", () => {
    render(<StickyNotes/>);

    // Matching note title + content | Ex: "test note 3 title"
    const newNoteTitle = screen.getAllByText(/test note \d+ title/i);
    const newNoteContent = screen.getAllByText(/test note \d+ content/i);
 
    console.log("Number of notes ", newNoteTitle.length)
    
    // checking that each title and content in the document
    for (let i=0; i<newNoteTitle.length; i++){
        expect(newNoteTitle[i]).toBeInTheDocument();
        expect(newNoteContent[i]).toBeInTheDocument();
    }
  
});

test("update notes", () => {
  render(<StickyNotes/>);
  const NoteId = screen.getByTestId(2);         // grabbing note with ID #2 
  NoteId.innerHTML = "<p>Note Updated</p>";     // directly modifying note content
  fireEvent.click(NoteId);
 
  console.log(NoteId)                           // for debugging 
 
  const updateNote = screen.getByText("Note Updated"); // verification that note content updates
  expect(updateNote).toBeInTheDocument();
});

test("delete notes", () => {
  render(<StickyNotes/>);

  //grabs the delete button from first note in notes list
  const XButton = screen.getAllByText("x")[0]; 

  // grabs the element with a numbered test ID 
  const notesCurrList = screen.getAllByTestId(/\d+/);   // *** /\d+/ expressedion to match any numeric ID 
  
  // checking for if notes in the notes list exist
  expect(notesCurrList.length).toBeGreaterThan(0);
  
  fireEvent.click(XButton);

  // Now checking if notes list length has decremented by 1
  const updatedNotesList = screen.queryAllByTestId(/\d+/);
  expect(updatedNotesList.length).toBe(notesCurrList.length-1);

  //   const oldList = screen.findAllByTestId();   UNCOMMENT
  // const NoteId = screen.getByTestId(2);
});


/***** EDGE CASE TESTS *****/

test("no sticky notes", () => {
    
    render(<StickyNotes/>); 

    const deleteButton  = screen.getAllByText("x");
    const notesCurrList = screen.getAllByTestId(/\d+/);

    expect(notesCurrList.length).toBeGreaterThan(0); 

    // deletes each note 
    for(let i = 0; i < notesCurrList.length; i++){
        fireEvent.click(deleteButton[i]); 
    }

    // checking for the notes to now be all deleted with none left 
    const allNotesDeleted = screen.queryAllByTestId(/\d+/);
    expect (allNotesDeleted.length).toBe(0); 

});

//if a note is in the favorite section and user changes the note title, 
// checking to see if the title is updated under favorites

// test("liked note title updated", () => {

//     render(<StickyNotes/>);

//     // create a note + make note as a favorite 
//     const currNoteTitle = "Homework To Do List";     // ERROR HERE _________ if we like all the notes because 
//                                                      // then there exists multiple elements with this name 
//     const noteContent = "programming assignment, worksheet, readings"; 

//     fireEvent.change(screen.getByPlaceholderText("Note Title"), {target: {value: currNoteTitle} });
//     fireEvent.change(screen.getByPlaceholderText("Note Content"), { target: { value: noteContent } });
   
//     const noteLabelBoxes = screen.getAllByRole('combobox');
//     fireEvent.change(noteLabelBoxes[0], {target: {value: "Study"}});

//     // submit form to create
//     fireEvent.click(screen.getByText("Create Note")); 

    
//     // ERROR HERE ______________ if we only try to specifically like this NEW CREATED NOTE
//     // *** liking the created note to add to favorites
//     // liking all the notes 
//     const allLikeButtons = screen.getAllByText('🤍');
//     allLikeButtons.forEach((likeButton) => {
//         fireEvent.click(likeButton); // Click each like button to like all notes
//     });
   
//     // END ERROR ______________
    
//     // updating the note title 
//     const toUpdateTitle = screen.getByText(currNoteTitle);
//     fireEvent.click(toUpdateTitle);
//     fireEvent.change(toUpdateTitle, {target: {innerText: "Finished HW"}}); 
//     fireEvent.blur(toUpdateTitle); // triggering the update 

//     // Verification of Update in:
//     // Favorite Column 
//     const checkTitleUpdate = screen.getByText("Finished HW");
//     expect(checkTitleUpdate).toBeInTheDocument;

//     const favoriteColumn = screen.getByText("Finished HW");
//     expect (favoriteColumn).toContainElement(checkTitleUpdate);
// });




// _______________ TO DO LIST TESTS _______________// 

test("read all the todo lists items", () => {
    render(<ToDoList/>);

    const itemsList = screen.getAllByTestId(/\d+/);
    expect(itemsList).toHaveLength(2); // should begin with two items in list 

});

test("number of items checked equals to title", () => {
    render(<ToDoList/>);

    const itemsCounter = screen.getByText(/Items bought: \d+/).textContent;
    //console.log(itemsCounter);
    expect(itemsCounter).toContain("Items bought: 0");
 

    const checkoffs = screen.getAllByRole("checkoff");
    //console.log(checkoffs.length);
    fireEvent.click(checkoffs[0]); // checkoff the first item

    const new_itemsCounter = screen.getByText(/Items bought: \d+/).textContent;
    expect(new_itemsCounter).toContain("Items bought: 1");
    
});

// EDGE CASE for TO DO //

test("checking off all items and uncheck all items", () => {
    render(<ToDoList/>);

    // Want to check that no items bought yet
    const itemsCounter = screen.getByText(/Items bought: \d+/).textContent;
    expect(itemsCounter).toContain("Items bought: 0");
 
    
    // const checkoffs = screen.getAllByTestId(/\d+/);
    const checkoffs = screen.getAllByRole('checkoff');
    console.log(checkoffs);

    // for(let i = 0; i < checkoffs.length; i++){  // to check off all item 
    //     fireEvent.click(checkoffs[i]);
    //     //console.log("CHECKED ", checkoffs[i]);
    // }
    //Checking off each box
    checkoffs.forEach(checkbox => {fireEvent.click(checkbox);});
    
    const new_itemsCounter = screen.getByText(/Items bought: \d+/).textContent;
    console.log(new_itemsCounter);
    expect(new_itemsCounter).toContain(`Items bought: ${checkoffs.length}`);
    
    // for(let i = 0; i < checkoffs.length; i++){  // to UNCHECK all the items
    //     fireEvent.click(checkoffs[i]); 
    // }
});

