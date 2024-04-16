import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import trash from "./assets/unchecked.svg";
import buttonPlus from "./assets/btn.create.svg";
import returnIcon from "./assets/arrow-rotate-left-solid.svg";
import check from "./assets/Group 1.svg";
import { useRef, useState } from "react";
function App() {
  const user = useSelector((state) => state);
  const done = useSelector((state) => state.done);
  console.log(user.counter);
  const [counterTask, setCounterTask] = useState(0);
  const [counterDone, setCounterDone] = useState(0);
  const [userErr, setUserErr] = useState(false);
  const dispatch = useDispatch();
  const name = useRef();
  function validate() {
    if (!name.current.value) {
      setUserErr(true);
      alert("Name is null");
      return false;
    } else {
      setUserErr(false);
    }

    if (name.current.value.trim().length < 3) {
      setUserErr(true);
      alert("Name must have more than 3 words");
      return false;
    } else {
      setUserErr(false);
    }

    return true;
  }
  // HANDLE DELETE START
  function handleDelete(id) {
    const confir = confirm("Are you sure ?");
    if (confir) {
      setCounterTask(counterTask - 1);
      dispatch({ type: "DELETE", payload: id });
    }
  }
  // HANDLE CHECK START
  function handleCheck(name, id) {
    setCounterDone(counterDone + 1);
    setCounterTask(counterTask - 1);
    const userinfo = {
      username: name,
      id: Date.now(),
    };
    dispatch({ type: "DONE", payload: userinfo });
    dispatch({ type: "DELETE", payload: id });
  }
  // HANDLE RETURN START
  function handleReturn(id, name) {
    setCounterTask(counterTask + 1);
    setCounterDone(counterDone - 1);
    const userinfo = {
      username: name,
      id: Date.now(),
    };
    dispatch({ type: "ADD", payload: userinfo });
    dispatch({ type: "RETURN", payload: id });
  }

  function handleClick(e) {
    e.preventDefault();
    // prompt("are you
    if (validate()) {
      const userinfo = {
        username: name.current.value,
        id: Date.now(),
      };
      setCounterTask(counterTask + 1);
      dispatch({ type: "ADD", payload: userinfo });
      name.current.value = null;
    }
  }

  return (
    <div className="container text-white w-full h-full mx-auto">
      <form
        onSubmit={handleClick}
        className="w-[432px] items-center mb-[59px] pt-[159px] mx-auto flex"
      >
        <input
          ref={name}
          type="text"
          className={`rounded-[10px] w-[381px] mr-[11px] h-[40px] bg-transparent py-[11px] font-normal placeholder:text-[16px] placeholder:leading-[19.36px] px-[15px] ${
            userErr == true ? "border-red-700" : "border-[#3E1671]"
          } mt-[10px] border-[1px] focus:outline-none placeholder:text-[#777777]`}
          placeholder="Add a new task"
        />
        <button className="transition duration-200 mt-[10px] hover:opacity-[80%]">
          <img src={buttonPlus} alt="add button" />
        </button>
      </form>
      <div className="wrapper_card w-[432px] mb-[60px] gap-[17px] mx-auto flex flex-col">
        <h3 className="text-[16px] leading-[19.36px]">
          Tasks to do - {counterTask}
        </h3>
        {user.counter.map((todo, i) => {
          return (
            <div
              key={i}
              className="cards py-[22px] px-[21px] rounded-[10px] items-center flex justify-between bg-[#15101c]"
            >
              <h3 className="text-[#9E78CF] text-[16px] leading-[19.36px]">
                {todo.username}
              </h3>
              <div className="w-[68px] h-[30px] flex justify-between">
                <img
                  className="cursor-pointer transition duration-200 hover:opacity-[50%]"
                  src={check}
                  alt="check-icon"
                  onClick={() => handleCheck(todo.username, todo.id)}
                />{" "}
                <img
                  className="cursor-pointer transition duration-200 hover:opacity-[50%]"
                  onClick={() => handleDelete(todo.id)}
                  src={trash}
                  alt="trash-icon"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="done_card w-[432px] pb-[363px] gap-[17px] mx-auto flex flex-col">
        <h3 className="text-[16px] leading-[19.36px]">Done - {counterDone}</h3>
        {done.map((todo, i) => {
          return (
            <div
              key={i}
              className="cards py-[22px] px-[21px] rounded-[10px] items-center flex justify-between bg-[#15101c]"
            >
              <h3 className="text-[#78CFB0] line-through text-[16px] leading-[19.36px]">
                {todo.username}
              </h3>
              <img
                className="cursor-pointer transition duration-200 hover:opacity-[50%]"
                width={22}
                height={22}
                onClick={() => handleReturn(todo.id, todo.username)}
                src={returnIcon}
                alt="return-icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
