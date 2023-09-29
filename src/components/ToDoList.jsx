import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import hello_gif from "../assets/images/png/HelloThereHolaGIF.gif";

const ToDoList = () => {
  const myBtn = useRef();
  const popup = useRef();
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [filteredList, setFilteredList] = useState("");
  const [openPopup, setOpenPopup] = useState(true);
  const [randomNum, setRandomNum] = useState(3);

  const popupClose = () => {
    setOpenPopup(false);
  };

  useEffect(() => {
    if (openPopup === true) {
      const timer = setTimeout(() => {
        console.log("This will run after 3 seconds!");
        popup.current.style.right = -400 + "px";
        setTimeout(() => {
          popup.current.style.right = 0;
          console.log("Second message after" + randomNum + "ms");
          let randomNo = Math.floor(Math.random() * (10 - 3 + 1) + 7);
          setRandomNum(randomNo);
        }, randomNum * 1000);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      console.log(openPopup);
      popup.current.style.right = -400 + "px";
    }
  }, [randomNum, openPopup]);

  // local storage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("todoList"));
    if (storedList) {
      setTodoList(storedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleClick = () => {
    setTodoList((prev) => [
      ...prev,
      {
        task: input,
        completed: false,
        taskTime:
          new Date().getHours() +
          ":" +
          new Date().getMinutes().toLocaleString(),
      },
    ]);

    setInput("");
  };

  // Delete task
  const completedTask = (index) => {
    let update = [...todoList];
    update.splice(index, 1);
    setTodoList(update);
  };

  // complete list line-strike
  const checked = (index) => {
    let update = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodoList(update);
  };

  //  task time

  const current = new Date();
  const newDate = `${current.getDate()}`;

  //   const time = new Date();
  //   const showTime = time.getHours() + ":" + time.getMinutes();

  return (
    <>
      <section className="bg_color vh-100 position-relative overflow-hidden">
        <div
          ref={popup}
          className="position-absolute popup_box bg-info rounded-1 bottom-0 z-3" style={{right:0}}
        >
          <div className="position-relative">
            {" "}
            <img src={hello_gif} alt="" className="w-100 h-100" />
            <button
              aria-label="popup btn"
              className="close_btn fw-bolder position-absolute top-0 end-0 bg-transparent border-0 pt-2 me-4 text-end"
              onClick={popupClose}
            >
              ×
            </button>
          </div>
        </div>
        <Container className="py-5 d-flex justify-content-start h-100">
          <div className=" toDO_card h-100 overflow-hidden">
            <div className="toDo_bg d-flex flex-column justify-content-end align-items-end">
              <h1 className=" text-white">Date: {newDate}</h1>
              <h1 className=" text-white">{date.toLocaleTimeString()}</h1>
            </div>
            <div className="p-4 bg-white">
              <input
                id="search-box"
                placeholder="search..."
                value={filteredList}
                onChange={(event) => setFilteredList(event.target.value)}
                className="mb-2 w-100 input_add"
              />
              <div className=" d-flex gap-2 w-100 pb-4 mb-3">
                <input
                  type="text"
                  value={input}
                  placeholder="Note"
                  onInput={(e) => setInput(e.target.value)}
                  className="input_add"
                />
                <Button
                  ref={myBtn}
                  onClick={() => handleClick()}
                  className="add_btn"
                  disabled={!input}
                >
                  Add
                </Button>
              </div>
              <div>
                <ul className="p-0 overflow-auto">
                  {todoList
                    .filter((todoList) =>
                      todoList.task
                        .toLowerCase()
                        .includes(filteredList.toLowerCase())
                    )
                    .map((todo, index) => {
                      return (
                        <li
                          className="d-flex justify-content-between align-items-center pb-4 ps-1 "
                          key={index}
                        >
                          <div>
                            <h2
                              className="mb-1 task"
                              style={{
                                textDecoration: todo.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {todo.task}😃
                            </h2>
                            <p className="mb-0 task_time">
                              Today at {todo.taskTime}
                            </p>
                          </div>
                          <div className="d-flex justify-content-end align-items-center gap-3">
                            <input
                              type="checkbox"
                              name="checked"
                              id="checked"
                              onClick={() => checked(index)}
                            />
                            <button
                              className="border-0 bg-transparent"
                              onClick={() => completedTask(index)}
                            >
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 5H21M9 10V15M13 10V15M3 5H19L17.42 19.22C17.3658 19.7094 17.1331 20.1616 16.7663 20.49C16.3994 20.8184 15.9244 21 15.432 21H6.568C6.07564 21 5.60056 20.8184 5.23375 20.49C4.86693 20.1616 4.63416 19.7094 4.58 19.22L3 5ZM6.345 2.147C6.50675 1.80397 6.76271 1.514 7.083 1.31091C7.4033 1.10782 7.77474 0.999995 8.154 1H13.846C14.2254 0.999806 14.5971 1.10755 14.9176 1.31064C15.2381 1.51374 15.4942 1.80381 15.656 2.147L17 5H5L6.345 2.147V2.147Z"
                                  stroke="#FF4545"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ToDoList;
