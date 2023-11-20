import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavortiesContextProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const addFavorite = (id) => {
    // console.log(id);
    setFavoriteIds((currentFavoriteIds) => [...currentFavoriteIds, id]);
  };
  const removeFavorite = (id) => {
    setFavoriteIds((currentFavoriteIds) =>
      currentFavoriteIds.filter((favId) => favId !== id)
    );
  };
  return (
    <FavoritesContext.Provider
      value={{ ids: favoriteIds, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavortiesContextProvider;
