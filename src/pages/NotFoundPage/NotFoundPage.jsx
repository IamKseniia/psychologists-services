import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <p>
        Sorry, page not found! Please go to{' '}
        <span>
          <Link to="/">Home page</Link>
        </span>
      </p>
    </div>
  );
};

export default NotFoundPage;
