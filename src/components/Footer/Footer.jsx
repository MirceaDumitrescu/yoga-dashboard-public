import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul className="footer-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </div>
      <p>
        Copyright © 2022{' '}
        <a href="https://ahamtayoga.com" target="_blank" rel="noreferrer">
          AhamtaYoga.com
        </a>
        <span> | Made by </span>
        <span>
          <a href="https://dumitrescumircea.ro/#/" target="_blank" rel="noreferrer">
            Mircea Dumitrescu
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
