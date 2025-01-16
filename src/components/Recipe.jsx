import {useState} from 'react'
import PropTypes from 'prop-types';
import RecipeInfo from './RecipeInfo';

const Recipe = ({recipe}) => {
    const[show,setShow]=useState(false)
    const{label,image,url,ingredients}= recipe.recipe;
    return (
      <div className="recipe">
        <h2>{label}</h2>
        <img src={image} alt={label} />
        <a href={url} target="_blank" rel="noopener noreferrer">
          Go to the recipe
        </a>
        <button onClick={() => setShow(!show)}>See Ingredients</button>
        {show && <RecipeInfo ingredients={ingredients} />}
      </div>
    );
}
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

export default Recipe
