import PropTypes from "prop-types";

const Recipe = ({ recipe }) => {
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

  return (
<div className="recipe">
  <h2 className="recipe-title">{label}</h2>
  <div className="recipe-image-container">
    <img src={image} alt={label} className="recipe-image" />
  </div>
  <ul className="ingredient-list">
    {ingredients.map((ingredient, index) => (
      <li key={index} className="ingredient-text">{ingredient.text}</li>
    ))}
  </ul>
  <div className="recipe-details">
    <div><strong>Time:</strong> {totalTime ? `${totalTime} min` : "N/A"}</div>
    <div><strong>Calories:</strong> {calories ? `${Math.round(calories)} kcal` : "N/A"}</div>
    <div><strong>Cuisine:</strong> {cuisineType ? cuisineType.join(", ") : "N/A"}</div>
    <div><strong>Meal Type:</strong> {mealType ? mealType.join(", ") : "N/A"}</div>
    <div><strong>Diet:</strong> {dietLabels ? dietLabels.join(", ") : "N/A"}</div>
  </div>
  <div className="recipe-link-container">
    <a href={url} target="_blank" rel="noopener noreferrer" className="recipe-link">
      Go to the recipe
    </a>
  </div>
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
    }).isRequired,
  }).isRequired,
};

export default Recipe;






