import s from './HomePage.module.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Home = () => {
  return (
    <div className={clsx('container', s.containerModern)}>
      <div className={s.homeContainer}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>
            The road to the <span className={s.titleWord}>depths</span> of the
            human soul
          </h1>
          <p className={s.text}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <Link to="/psychologists" className={clsx('button', s.getButton)}>
            Get started{' '}
            <svg
              className={s.iconArrow}
              width="15"
              height="17"
              aria-hidden="true"
            >
              <use href="/icons.svg#icon-arrow" />
            </svg>
          </Link>
        </div>
        <img
          loading="lazy"
          src={'/back_img_groop.png'}
          alt="a woman with glasses"
          className={s.mainImg}
        />
      </div>
    </div>
  );
};

export default Home;
