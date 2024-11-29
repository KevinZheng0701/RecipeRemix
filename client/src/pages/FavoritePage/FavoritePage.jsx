import { useState, useEffect } from "react";
import GridLayout from "../../components/GridLayout/GridLayout";
import useAuth from "../../context/AuthContext";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Function to fetch favorite recipes by a user
    async function fetchFavorites() {
      if (user) {
        const response = await fetch(`api/favorite/${user.userid}`);
        const json = await response.json();
        setFavorites(json.data);
      }
    }
    fetchFavorites();
  }, [user]);

  return (
    <div className="container mt-4">
      {user ? (
        // Check if the user has any favorite recipes
        favorites.length > 0 ? (
          <>
            <h2 className="mb-4">My Favorite Recipes</h2>
            <GridLayout recipes={favorites} />
          </>
        ) : (
          <h2 className="text-center">You have no favorite recipes yet.</h2>
        )
      ) : (
        <h2 className="text-center">Log in to see your favorite recipes!</h2>
      )}
    </div>
  );
};

export default FavoritePage;
