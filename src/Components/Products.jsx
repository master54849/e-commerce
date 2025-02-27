import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, addToCart } from '../Redux/productsSlice';
import { useParams } from 'react-router-dom';
import '../App.css';

const ProductsPage = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { categories, productsByCategory, loading, error } = useSelector((state) => state.products);
  const { category } = useParams();
  const [sortOrder, setSortOrder] = useState('lowToHigh');

  useEffect(() => {
    categories.forEach((cat) => {
      dispatch(fetchProductsByCategory(cat));
    });
  }, [dispatch, categories]);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product); 
    dispatch(addToCart(product)); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const formattedCategory = category ? category.replace(/-/g, ' ') : null;

  const sortProducts = (products) => {
    const sortedProducts = [...products];
    if (sortOrder === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  const filterProducts = (products) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (searchQuery) {
    const allProducts = categories.flatMap((cat) => productsByCategory[cat] || []);
    const filteredProducts = filterProducts(allProducts);

    return (
      <div>
        <h2>Search Results for "{searchQuery}"</h2>
        <div className="products-row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h5>{product.title}</h5>
                <p className="price">Price: ${product.price}</p>
                <p className="brand">Brand: {product.brand}</p>
                <p className="rating">Rating: {product.rating} ⭐</p>
                <p className="availability">Availability: {product.availabilityStatus}</p>
                <p className="stock">Stock: {product.stock}</p>
                <button className="btn btn-outline-primary w-100" onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            ))
          ) : (
            <p>No products found for the search "{searchQuery}".</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {formattedCategory ? (
        <div className="category-section">
          <div className="category-header">
            <h2>{formattedCategory.toUpperCase()}</h2>
            <div className="filter-container">
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
          <div className="products-row">
            {sortProducts(productsByCategory[formattedCategory] || []).map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h5>{product.title}</h5>
                <p className="price">Price: ${product.price}</p>
                <p className="brand">Brand: {product.brand}</p>
                <p className="rating">Rating: {product.rating} ⭐</p>
                <p className="availability">Availability: {product.availabilityStatus}</p>
                <p className="stock">Stock: {product.stock}</p>
                <button className="btn btn-outline-primary w-100" onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            )) || <p>No products available in this category.</p>}
          </div>
        </div>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="category-section">
            <div className="category-header">
              <h2>{cat.replace(/-/g, ' ').toUpperCase()}</h2>
              <div className="filter-container">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
            </div>
            <div className="products-row">
              {sortProducts(productsByCategory[cat] || []).map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.thumbnail} alt={product.title} />
                  <h5>{product.title}</h5>
                  <p className="price">Price: ${product.price}</p>
                  <p className="brand">Brand: {product.brand}</p>
                  <p className="rating">Rating: {product.rating} ⭐</p>
                  <p className="availability">Availability: {product.availabilityStatus}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <button className="btn btn-outline-primary w-100" onClick={() => handleAddToCart(product)}>Add to cart</button>
                </div>
              )) || <p>No products available in this category.</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductsPage;
