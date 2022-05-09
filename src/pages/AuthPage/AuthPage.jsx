import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from '../../components/Container';
import AuthForm from '../../components/AuthForm';
import { getError } from '../../redux/user/selectors';
import { getUserIP } from '../../redux/user/helper';

import s from './AuthPage.module.css';

function AuthPage() {
  console.log('AuthPage.jsx');

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [host, sethost] = useState('')

  const showRegForm = () => setShowRegisterForm(true);
  const showLogForm = () => setShowRegisterForm(false);

  const authErr = useSelector(getError);

  useEffect(() => {
    async function fetchData() {
      const get = localStorage.getItem('get');
      console.log('AuthPage.jsx => localStorage.getItem("get")', get);
    
      if (get === null) { 
        const result = await getUserIP()
        // const ip = window.btoa(result)
        const ip = result

        sethost(ip)
      }
    
      localStorage.setItem('get', true);
    }
    
    fetchData()
  }, [])
  
  window.onbeforeunload = function () {
    localStorage.removeItem('get');
    return '';
  }

  useEffect(() => {
    if (authErr) Notify.failure(`Attention! ${authErr.message}`);
  }, [authErr]);

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
            Choose your name to
            <button
              type="button"
              onClick={showRegForm}
              className={s.invisibleButton}
            >
              sign up
            </button>
            or
            <button
              type="button"
              onClick={showLogForm}
              className={s.invisibleButton}
            >
              log in
            </button>
          </p>

          <AuthForm showRegisterForm={showRegisterForm} host={host}/>
        </section>
      </Container>
    </div>
  );
}

export default AuthPage;
