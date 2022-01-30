import React, { useState, useEffect } from "react";
import "./style.css";
//get the lcoalStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
export const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggle, setToggle] = useState(false);
  //add the items functions
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggle) {
      setItems(
        items.map((cur) => {
          if (cur.id === isEditItem) {
            return { ...cur, name: inputdata };
          }
          return cur;
        })
      );
      setInputdata("");
      setIsEditItem();
      setToggle(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputdata("");
    }
  };
  //edit the items
  const editItem = (index) => {
    const editItem = items.find((cur) => {
      return cur.id === index;
    });
    setInputdata(editItem.name);
    setIsEditItem(index);
    setToggle(true);
  };
  //delete item
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };
  //remove all items
  const removeAll = () => {
    setItems([]);
  };
  //adding localStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="📝Add Items"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputdata(e.target.value)}
            />
            {toggle ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem} />
            )}
          </div>
          {/* Show our items */}
          <div className="showItems">
            {items.map((cur) => {
              return (
                <div className="eachItem" key={cur.id}>
                  <h3>{cur.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(cur.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(cur.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span>Check List</span>
            </button>
          </div>
          <p style={{ color: "red", marginTop: "4em" }}>
            Copyright &copy; 2022
          </p>
        </div>
      </div>
    </>
  );
};
