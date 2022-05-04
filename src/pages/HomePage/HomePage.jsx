import Container from '../../components/Container';
import Header from '../../components/Header/Header';

import CardsToday from '../../components/CardsToday';
import ButtonAddCard from '../../components/ButtonAddCard';
import DoneSection from '../../components/DoneSection/DoneSection';
// import CardsTomorrow from '../../components/CardsTomorrow';
// import { useSelector } from 'react-redux';
// import Card from '../../components/Card';

import s from './HomePage.module.css';

function HomePage() {
  // const todo = useSelector((state) => state.todos);

  return (
    <section className={s.dashboard}>
      <Header />
      <Container>
        <CardsToday />
        {/* <CardsTomorrow /> */}
        <ButtonAddCard />
        <DoneSection />
      </Container>
    </section>
  );
}

export default HomePage;
