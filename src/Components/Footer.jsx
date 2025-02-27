import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../index.css";

const Footer = () => {
  const cart = useSelector((state) => state.products.cart);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    'Beauty', 'Fragrances', 'Furniture', 'Groceries',
    'Laptops', 'Motorcycle', 'Smartphones',
    'Sunglasses', 'Tablets', 'Tops', 'Vehicle' 
  ];

  return (
    <footer className={`footer-container ${totalItemsInCart === 0 ? 'footer-empty' : ''}`}>
      <div className="footer-content">
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              <Link to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <p>&copy; {new Date().getFullYear()} PandaGow Shopping. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
