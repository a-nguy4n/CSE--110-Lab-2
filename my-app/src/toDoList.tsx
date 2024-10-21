import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constant";
import { useParams } from "react-router-dom";

export function ToDoList() {
  const { name } = useParams();
  const [items, setItems] = useState(dummyGroceryList);
  const [numBoughtItems, setNumBoughtItems] = useState(0); 
  
  // determine the number of items remaining
  const numRemainingItems = items.length - numBoughtItems; 
  
  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox: HTMLInputElement = e.target as HTMLInputElement;
    const itemName = checkbox.name;

    // updating the items state immutably
    const updatedItems = items.map(item => 
      item.name === itemName ? { ...item, isPurchased: checkbox.checked } : item
    );

    // updating the count of bought items
    const increment = checkbox.checked ? 1 : -1;
    setNumBoughtItems(prevCount => prevCount + increment); // incr/decr the bought items count

    setItems(updatedItems);
  }

  //unchanged except for "Items bought: # " ; 
  // which is put into a div 
  return (
    <div className="App">
      <div className="App-body">
        <h1>{name}'s To Do List</h1>
        <div>Items bought: {numBoughtItems}</div> 
        <form action=".">
          {items.map((item) => ListItem(item, handleCheckboxClick))}
        </form>
      </div>
    </div>
  );
}

// unchanged 
function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
 return (
   <div>
     <input
       data-testid= {item.id}
       role="checkoff"
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
     />
     {item.name}
   </div>
 );
}



// export function ToDoList() {
//  const { name } = useParams();
//  const [numRemainingItems, setNumRemainingItems] = useState(0);

//  let [items, setItems] = useState(dummyGroceryList);

//  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
//    const checkbox: HTMLInputElement = e.target as HTMLInputElement;
//    const itemName = checkbox.name;

//    // Updating items index state
//    const itemIndex = items.findIndex((item) => item.name === itemName);
//    items[itemIndex] = {id:itemIndex+1, name: itemName, isPurchased: checkbox.checked };

//    const uncheckedItems = items.filter((item) => !item.isPurchased);
//    const checkedItems = items.filter((item) => item.isPurchased);

//    const newItems = uncheckedItems.concat(checkedItems);

//    setItems(newItems);

//    const diff = checkbox.checked ? 1 : -1;

//    setNumRemainingItems(numRemainingItems + diff);
//  }

//  return (
//    <div className="App">
//      <div 
//      className="App-body">
//      <h1>{name}'s To Do List</h1>
//        Items bought: {numRemainingItems}
//        <form action=".">
//          {items.map((item) => ListItem(item, handleCheckboxClick))}
//        </form>
//      </div>
//    </div>
//  );
// }

