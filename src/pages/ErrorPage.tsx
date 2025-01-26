import { Link } from 'react-router-dom';
import '../styles/error.css'

const ErrorPage = () => {
  return (
    <section className='error'>
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <h2> ¯\_(ツ)_/¯</h2>
      <p>Would you like to return home?</p>
      <Link to="/">Return Home</Link>
    </section>
  );
};

export default ErrorPage;
