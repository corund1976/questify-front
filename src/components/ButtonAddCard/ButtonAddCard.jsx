import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addCardToState,
  // addTodo,
  // showTodosActive,
  // showTodosDone,
} from "../../redux/todos/operation";
// import Card from "../Card";
import ModalAddCard from "../modal/ModalAddCard/ModalAddCard";

import "../../utils/variables.css";
import s from "./ButtonAddCard.module.css";

const ButtonAddCard = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => setShowModal((prevState) => !prevState);

  const addCard = () => {
    dispatch(addCardToState());
    // addTodo({
    //   title: "Enter your data",
    //   category: "FAMILY",
    //   type: "TASK",
    //   time: Date.now(),
    //   level: "Normal",
    // });
  };

  return (
    <>
      <button className={s.ButtonAddCard} type="button" onClick={toggleModal}>
        +
      </button>
      {showModal && (
        <ModalAddCard toggleModal={toggleModal} addCard={addCard} />
      )}
      {/* <ModalAddCard toggleModal={toggleModal} addCard={addCard} /> */}
    </>
  );
};

export default ButtonAddCard;
