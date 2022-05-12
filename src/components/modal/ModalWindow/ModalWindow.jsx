import closeBtn from "../../../images/closeBtn.png";
import s from "./ModalWindow.module.css";

const ModalWindow = ({ toggleModal, children }) => {
  const clickBackdrop = (event) => {
    if (event.currentTarget === event.target) toggleModal();
  }

  return (
    <div className={s.backdrop} onClick={clickBackdrop}>
      <div className={s.exitModal}>
        <button type="button" className={s.closeBtn} onClick={toggleModal}>
          <img src={closeBtn} alt="closeButton" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalWindow;
