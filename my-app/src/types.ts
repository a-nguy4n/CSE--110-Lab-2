export enum Label {
    personal = "Personal",
    study = "Study",
    work = "Work",
    other = "Other",
    toDo = "To Do",
    random = "Random"
 }
 
 export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    fontColor: string;
    fontStyle: string;
 };

 //Lab 3
 export type GroceryItem = { name: string; isPurchased: boolean };