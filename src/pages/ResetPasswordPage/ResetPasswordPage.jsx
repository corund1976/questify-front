import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from "../../components/Container";
import { userResetPassword} from '../../redux/user/operation'
import { getError } from '../../redux/user/selectors';

import s from "./ResetPasswordPage.module.css";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const error = useSelector(getError)
  const history = useHistory();
  const firstUpdate = useRef(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const changeEmailValue = (event) => setEmail(event.target.value);

  const validateEmail = (email) => {
    const response =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return response.test(email);
  };

  const onSubmit = () => {
    !validateEmail(email)
      ? setEmailError("Некорректно введен e-mail")
      : setEmailError("");
      
    if (validateEmail(email))
      dispatch(userResetPassword({ email }))    
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
      
    if (error) {
      return Notify.failure(`${error.message}`)
    } else {
      if (error === '' && firstUpdate.current === false) {
        Notify.success("We sent link for change password on your email!");

        setTimeout(() => {
          history.push('/auth')
        }, 5000);
      } 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className={s.wrapper}>
      <Container>
        <section className={s.landing}>
          <h1 className={s.title}>Questify</h1>

          <p className={s.txt__top}>
            Questify will turn your life into a thrilling game full of amazing
            quests and exciting challenges.
          </p>

          <p className={s.txt__bottom}>
            Please, type your email to reset password!
          </p>

          {/* <resetForm showRegisterForm={ showRegisterForm }/> */}
          <form className={s.reset_form} autoComplete="off">
          <input
        type="email"
        name="email"
        value={email}
        onChange={changeEmailValue}
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
        placeholder="Email"
        className={s.reset_form_input}
        required
      />
          <p className={s.errorMessage}>{emailError}</p>
          
          <button
          className={s.reset_form_button}
          type="button"
          onClick={onSubmit}
        >
          go!
            </button>
            </form>
        </section>
      </Container>
    </div>
  );
}

export default ResetPasswordPage;
