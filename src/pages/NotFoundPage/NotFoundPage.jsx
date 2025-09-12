import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <p className={s.text}>
        Sorry, page not found! Please go to{' '}
        <span className={s.home}>
          <Link to="/">Home page</Link>
        </span>
      </p>
    </div>
  );
};

export default NotFoundPage;
