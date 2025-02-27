import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity, clearCart } from '../Redux/productsSlice';
import '../App.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  useEffect(() => {
    console.log('Cart contents:', cart);
  }, [cart]);

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2); 

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="products-row">
            {cart.map((item) => (
              <div key={item.id} className="product-card">
                <img src={item.thumbnail} alt={item.title} />
                <h5>{item.title}</h5>
                <p className="price">Price: ${item.price}</p>
                <p className="brand">Brand: {item.brand}</p>
                <p className="rating">Rating: {item.rating} ⭐</p>
                <p className="availability">Availability: {item.availabilityStatus}</p>
                <p className="stock">Stock: {item.stock}</p>
                <div className="mb-2">
                  <label className="me-2">Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="form-control w-27"
                  />
                </div>
                <button className="btn btn-outline-danger mb-2" onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-warning" onClick={handleClearCart}>
              Clear Cart
            </button>
            <h4 className='totalprice'>Total Price: ${totalPrice}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
