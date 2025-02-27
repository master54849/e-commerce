import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';

const Searchbar = ({ setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('');
  const [quote, setQuote] = useState('');
  const fullQuote = "Find what you love, and let it fill your cart!";

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    let currentIndex = 0;

    const typeQuote = () => {
      if (currentIndex < fullQuote.length) {
        setQuote(fullQuote.slice(0, currentIndex + 1)); 
        currentIndex++;
        setTimeout(typeQuote, 100); 
      }
    };

    typeQuote(); 

    return () => {
      currentIndex = fullQuote.length; 
    };
  }, []);

  return (
    <div className="container-fluid Search-container">
      <div className="quote-container">
        <h2 id="quote-text">{quote}</h2>
      </div>

      <Form className="d-flex form-container" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search for your product......"
          className="me-2"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Searchbar;
