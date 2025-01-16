import { useState } from "react";
import PropTypes from "prop-types";
import RecipeInfo from "./RecipeInfo";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

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
          <RecipeInfo ingredients={ingredients} show={show} />
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
    }).isRequired,
  }).isRequired,
};

export default Recipe;


