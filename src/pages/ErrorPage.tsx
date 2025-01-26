import { Link } from 'react-router-dom';
import '../styles/error.css'

const ErrorPage = () => {
  return (
    <section className='error'>
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <h1> ¯\_(ツ)_/¯</h1>
      <p>Would you like to return home?</p>
      <Link to="/">Return Home</Link>
    </section>
  );
};

export default ErrorPage;
