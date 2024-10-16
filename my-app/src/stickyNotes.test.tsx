import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

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

    const newNoteTitle = screen.getAllByPlaceholderText("Note Title");
    const newNoteContent = screen.getAllByPlaceholderText("Note Content");
 
    for (let i=0; i<newNoteTitle.length; i++){
        expect(newNoteTitle[i]).toBeInTheDocument();
        expect(newNoteContent[i]).toBeInTheDocument();
    }
  
});



