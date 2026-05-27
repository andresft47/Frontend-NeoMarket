import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addWishlist = (productId) => {
    setWishlist((prevWishlist) => (
      prevWishlist.includes(productId) ? prevWishlist : [...prevWishlist, productId]
    ));
  };

  const removeWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
  };

  const isWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = (productId) => {
    if (isWishlist(productId)) {
      removeWishlist(productId);
      return;
    }
    addWishlist(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
        isWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
