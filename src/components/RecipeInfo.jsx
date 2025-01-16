import { v4 as uuidv4 } from "uuid";

import PropTypes from 'prop-types';

const RecipeInfo = ({ ingredients, show }) => {
  return (
    <tr>
      <td colSpan="2">
        <div className={`ingredient-container ${show ? "show" : ""}`}>
          <ul className="ingredient-list">
            {ingredients.map((ingredient) => (
              <li key={uuidv4()} className="ingredient-text">
                {ingredient.text}
              </li>
            ))}
          </ul>
        </div>
      </td>
    </tr>
  );

};

RecipeInfo.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
};



export default RecipeInfo;
