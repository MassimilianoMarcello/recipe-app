import { useState } from "react";
import PropTypes from "prop-types";

const RecipeList = ({ recipes }) => {
  console.log(recipes); // Verifica cosa viene passato al componente
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe); // Impostiamo la ricetta selezionata
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null); // Chiudiamo l'overlay quando si clicca su "X"
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <h3 className="recipe-title">{recipe.recipe.label}</h3>
          <img
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            className="recipe-thumbnail"
          />
          <div className="card-buttons">
            <button
              onClick={() => handleViewDetails(recipe)} // Mostra i dettagli
              className="view-details-button"
            >
              View Details
            </button>
            <button
  className="view-details-button"
  onClick={() => window.open(recipe.recipe.url, "_blank")}
>
  Go to Recipe
</button>
          </div>
        </div>
      ))}

      {/* Mostriamo l'overlay solo quando selectedRecipe non è null */}
      {selectedRecipe && (
        <div className={`details-overlay ${selectedRecipe ? 'open' : ''}`}>
          <div className="recipe-details-container">
            {selectedRecipe.recipe ? (
              <>
                <button
                  className="close-button"
                  onClick={handleCloseDetails}
                >
                  X
                </button>
                <h2>{selectedRecipe.recipe.label}</h2>
                <img
                  src={selectedRecipe.recipe.image}
                  alt={selectedRecipe.recipe.label}
                  className="recipe-image"
                />
                <ul>
                  <p>Ingredients:</p>
                  {selectedRecipe.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                  ))}
                </ul>
                <div className="recipe-details">
                  <div className="recipe-info">
                    <p className="info-item">
                      <strong>Time:</strong> 
                      {selectedRecipe.recipe.totalTime ? `${selectedRecipe.recipe.totalTime} min` : "N/A"}
                    </p>
                    <p className="info-item">
                      <strong>Calories:</strong> 
                      {Math.round(selectedRecipe.recipe.calories)} kcal
                    </p>
                    <p className="info-item">
                      <strong>Cuisine:</strong> 
                      {selectedRecipe.recipe.cuisineType ? selectedRecipe.recipe.cuisineType.join(", ") : "N/A"}
                    </p>
                    <p className="info-item">
                      <strong>Meal Type:</strong> 
                      {selectedRecipe.recipe.mealType ? selectedRecipe.recipe.mealType.join(", ") : "N/A"}
                    </p>
                    <p className="info-item">
                      <strong>Diet:</strong> 
                      {selectedRecipe.recipe.dietLabels ? selectedRecipe.recipe.dietLabels.join(", ") : "N/A"}
                    </p>
                  </div>
                  <a
                    className="recipe-link"
                    href={selectedRecipe.recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Recipe
                  </a>
                </div>
              </>
            ) : (
              <p>Loading...</p> // Mostra un messaggio di caricamento se la ricetta non è disponibile
            )}
          </div>
        </div>
      )}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      recipe: PropTypes.shape({
        label: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
        totalTime: PropTypes.number,
        calories: PropTypes.number,
        cuisineType: PropTypes.array,
        mealType: PropTypes.array,
        dietLabels: PropTypes.array,
      }).isRequired,
    })
  ).isRequired,
};

export default RecipeList;





