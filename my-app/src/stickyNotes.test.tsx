import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
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

    // to be slightly modified
    const newNoteTitle = screen.getAllByText("test");
    const newNoteContent = screen.getAllByText("content");
 
    console.log("Number of notes ", newNoteTitle.length)
    for (let i=0; i<newNoteTitle.length; i++){
        expect(newNoteTitle[i]).toBeInTheDocument();
        expect(newNoteContent[i]).toBeInTheDocument();
    }
  
});


test("update notes", () => {
  render(<StickyNotes/>);
  const NoteId = screen.getByTestId(2);
  NoteId.innerHTML = "<p>Note Updated</p>";
  fireEvent.click(NoteId);
  // const IdContent = document.getElementById("");
  console.log(NoteId)
  //fireEvent.change(NoteId, { target: { value: "updated" } });

  const updateNote = screen.getByText("Note Updated");
  expect(updateNote).toBeInTheDocument();
});

test("delete notes", () => {
  render(<StickyNotes/>);
  const XButton = screen.getAllByText("x");
//   const oldList = screen.findAllByTestId();   UNCOMMENT
  // const NoteId = screen.getByTestId(2);
  fireEvent.click(XButton[0]);

});