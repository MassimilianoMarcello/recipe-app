import { useState } from "react";
import PropTypes from "prop-types";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients, totalTime, calories, cuisineType, mealType, dietLabels, healthLabels } = recipe.recipe;

  return (
    <div className="recipe">
      <table className="recipe-table">
        <thead>
          <tr>
            <th colSpan="2">{label}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={image} alt={label} className="recipe-image" />
            </td>
            <td>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="recipe-link"
              >
                Go to the recipe
              </a>
              <button
                className="recipe-button"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide Ingredients" : "See Ingredients"}
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className={`ingredient-container ${show ? 'show' : ''}`}>
                <ul className="ingredient-list">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-text">
                      {ingredient.text}
                    </li>
                  ))}
                </ul>
              </div>
            </td >
          </tr>
          <tr>
            <td><strong>Time:</strong> {totalTime ? `${totalTime} min` : "N/A"}</td>
            <td><strong>Calories:</strong> {calories ? `${Math.round(calories)} kcal` : "N/A"}</td>
          </tr>
          <tr>
            <td><strong>Cuisine:</strong> {cuisineType ? cuisineType.join(", ") : "N/A"}</td>
            <td><strong>Meal Type:</strong> {mealType ? mealType.join(", ") : "N/A"}</td>
          </tr>
          <tr>
            <td><strong>Diet:</strong> {dietLabels ? dietLabels.join(", ") : "N/A"}</td>
            <td><strong>Health Labels:</strong> {healthLabels ? healthLabels.join(", ") : "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    recipe: PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
      totalTime: PropTypes.number,
      calories: PropTypes.number,
      cuisineType: PropTypes.array,
      mealType: PropTypes.array,
      dietLabels: PropTypes.array,
      healthLabels: PropTypes.array,
    }).isRequired,
  }).isRequired,
};

export default Recipe;





