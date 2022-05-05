import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteTodo,
  changeTodo,
  deleteNewTodo,
  addNewCard,
  changeTodoStatus,
} from '../../redux/todos/operation';
import { newTodoCard } from '../../redux/todos/todosSelector';

import DifficultModal from '../modal/DifficultModal';
import DeleteModule from '../modal/modalDelete';
import CategoryModal from '../modal/CategoryModal';

import TimeDatePicker from '../TimePickers';
import dateAdapted from '../TimePickers/dateAdapted';
import CompletedChallenge from '../CompletedChallenge';
import CompletedCard from '../CompletedCard/CompletedCard';

import saveIcon from '../../images/save.svg';
import trophy from './trophy.svg';
// import '../../utils/variables.css';
import s from './Card.module.css';

const Card = ({ data, card, isNewCard }) => {

  const [completed, setCompleted] = useState(false);
  const [categoryModal, setcategoryModal] = useState(false);
  const [modal, setmodal] = useState(false);
  const [edit, setedit] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [difficult, setdifficult] = useState('');
  const [value, setvalue] = useState('');
  const [categoryCart, setcategoryCart] = useState('family');
  const [timeDate, settimeDate] = useState(new Date());

  const dispatch = useDispatch();
  const cardFromState = useSelector(newTodoCard);

  useEffect(() => {
    setdifficult(card.level);
    setvalue(card.title);
    setcategoryCart(card.category);
    let coverct = new Date(card.time);
    coverct = dateAdapted(coverct);
    settimeDate(coverct);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onclick() {
    setmodal(!modal);
  }

  function categoryModalHandler() {
    setcategoryModal(!categoryModal);
  }

  function change(data) {
    setdifficult(data);
    onclick();
  }

  function deleteHandler(bool) {
    if (bool) {
      dispatch(deleteTodo(card._id));
      onDelete();
    }
    onDelete();
  }

  function onDelete() {
    setdeleteModal(!deleteModal);
  }

  function onedit(e) {
    if (!card.isActive) {
      return;
    }
    if (!edit) setedit(true);
  }

  function changeValue(e) {
    setvalue(e.target.value);
  }

  const closeAndSave = () => {
    setedit(false);

    const newCard = {
      level: difficult,
      title: value,
      time: timeDate.data || card.time,
      category: categoryCart,
      type: card.type,
      isActive: true,
    };
    dispatch(changeTodo({ id: card._id, ...newCard }));
  };

  const deleteNewCard = () => {
    dispatch(deleteNewTodo());
  };

  const addNewTodo = () => {
    dispatch(
      addNewCard({
        title: value,
        category: categoryCart,
        type: cardFromState.type,
        time: timeDate.data,
        level: difficult,
      }),
    );
    const adapded = dateAdapted(timeDate.data);
    settimeDate(adapded);
  };

  const addTodosDone = () => {
    // closeAndSave();
    dispatch(changeTodoStatus({ id: card._id, isActive: false }));
  };

  function changeType(data) {
    setcategoryCart(data);
    categoryModalHandler();
  }

  function takeTime(date) {
    settimeDate(date);
  }
  const changeCompleted = () => {
    if (!card.isActive) {
      return;
    }
    setCompleted(true);
  };

  return (
    <>
      {completed ? (
        card.type === 'TASK' ? (
          <CompletedCard
            change={addTodosDone}
            title={card.title}
            id={card._id}
          />
        ) : (
          <CompletedChallenge
            change={addTodosDone}
            title={card.title}
            id={card._id}
          />
        )
      ) : (
        <li
          className={`${s.card} ${
            card.type === 'CHALLENGE' ? s.challenge : s.task
          }`}
          onClick={onedit}
        >
          {card.isActive && modal && <DifficultModal change={change} />}
          {deleteModal && <DeleteModule change={deleteHandler} />}
          {card.isActive && categoryModal && (
            <CategoryModal change={changeType} />
          )}
          <p className={s.cardCategoryName}>
            {edit ? (
              <>
                <span
                  className={
                    (s.cardCategoryCircle,
                    difficult === 'Normal'
                      ? s.secondOption
                      : difficult === 'Hard'
                      ? s.thirdOption
                      : s.firstOption)
                  }
                >
                  &#9679;
                </span>
                <span className={s.cardCategory} onClick={onclick}>
                  {difficult}
                </span>
              </>
            ) : (
              <span className={card.isActive ? s.setLevel: s.inectiveCard} onClick={onclick}>
                <span
                  className={
                    (s.cardCategoryCircle,
                    difficult === 'Normal'
                      ? s.secondOption
                      : difficult === 'Hard'
                      ? s.thirdOption
                      : s.firstOption)
                  }
                >
                  &#9679;
                </span>

                <span className={s.cardCategory}>{difficult}</span>
              </span>
            )}
            {/* STAR OR TROPHY ICON*/}
            {card.type === 'CHALLENGE' ? (
              <img
                src={trophy}
                alt=""
                className={card.isActive? s.cardCategoryStart : s.cardCategoryStart_inective}
                onClick={changeCompleted}
              />
            ) : (
              <span
                className={
                  card.isActive
                    ? s.cardCategoryStart
                    : s.cardCategoryStart_inective
                }
                onClick={changeCompleted}
              >
                {' '}
                &#9733;
              </span>
            )}
          </p>
          {edit && !isNewCard && <p className={s.editTitle}>edit quest</p>}
          {isNewCard && <p className={s.editTitle}>Create New Quest</p>}

          {isNewCard || edit ? (
            <form className={s.form}>
              <input
                autoFocus
                className={`${s.input} ${
                  card.type === 'CHALLENGE' && s.inputChallenge
                }`}
                type="text"
                value={value}
                onChange={changeValue}
              />
            </form>
          ) : (
            <>
              {/* header CHALLENGE */}
              {card.type === 'CHALLENGE' ? (
                <h2 className={s.challengeHeader}>CHALLENGE</h2>
              ) : (
                <span className={s.taskHeader}>TASK</span>
              )}
              <h2
                className={`${s.cardTitle} ${
                  card.type === 'CHALLENGE' && s.cardTitle_challenge
                }`}
              >
                {card.title}
              </h2>
            </>
          )}

          <div className={s.cardDate}>
            <p className={s.timeText}>

              {timeDate.dayName}
              {!edit && !isNewCard && <>,&nbsp;{timeDate.time}</>}

            </p>
            {edit && <TimeDatePicker time={takeTime} />}
            {isNewCard && <TimeDatePicker time={takeTime} />}
          </div>

          <div className={s.bottomMenu}>
            {edit ? (
              <>
                <p
                  className={`${s.cardType} ${categoryCart.toLowerCase()}`}
                  onClick={categoryModalHandler}
                >
                  {categoryCart}
                </p>
              </>
            ) : (
              <>
                <p
                  className={`${s.cardType} 
                  ${card.category === 'LEARNING' && s.learning}
                  ${card.category === 'LEISURE' && s.leisure}
                  ${card.category === 'FAMILY' && s.family}
                  ${card.category === 'HEALTH' && s.health}
                  ${card.category === 'STUFF' && s.stuff}
                  ${card.category === 'WORK' && s.work}
                  ${!card.isActive && s.inectiveCard}
                  `}
                  onClick={categoryModalHandler}
                >
                  {card.category}{' '}
                  {card.isActive && <i className={s.arrowDown}>&#9207;</i>}
                </p>
              </>
            )}

            {isNewCard && (
              <>
                <div className={s.buttons}>
                  <span className={s.cross} onClick={deleteNewCard}>
                    &#10006;
                  </span>
                  <span onClick={addNewTodo} className={s.start}>
                    START
                  </span>
                </div>
              </>
            )}
            {edit && !isNewCard && (
              <>
                <div className={s.buttons}>
                  <div className={s.saveIcon} onClick={closeAndSave}>
                    <img src={saveIcon} alt="save card" />
                  </div>

                  <span className={s.cross} onClick={onDelete}>
                    &#10006;
                  </span>
                  <span onClick={changeCompleted} className={s.checked}>
                    &#10004;
                  </span>
                </div>
              </>
            )}
          </div>
        </li>
      )}
    </>
  );
};

export default Card;