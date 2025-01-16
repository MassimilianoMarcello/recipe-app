import PropTypes from "prop-types";

const RecipeDetails = ({ recipe, onClose }) => {

  const {
    label,
    image,
    url,
    ingredients,
    totalTime,
    calories,
    cuisineType,
    mealType,
    dietLabels,
  } = recipe.recipe;
console.log(recipe);
  return (
    <div className="recipe-details-container">
      <button onClick={onClose} className="close-button">X</button>
      <h2>{label}</h2>
      <img src={image} alt={label} className="recipe-image" />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>
      <p><strong>Time:</strong> {totalTime ? `${totalTime} min` : "N/A"}</p>
      <p><strong>Calories:</strong> {Math.round(calories)} kcal</p>
      <p><strong>Cuisine:</strong> {cuisineType ? cuisineType.join(", ") : "N/A"}</p>
      <p><strong>Meal Type:</strong> {mealType ? mealType.join(", ") : "N/A"}</p>
      <p><strong>Diet:</strong> {dietLabels ? dietLabels.join(", ") : "N/A"}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">Go to Recipe</a>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecipeDetails;
