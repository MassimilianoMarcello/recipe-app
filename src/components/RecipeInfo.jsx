
import {v4 as uuidv4} from 'uuid'

const RecipeInfo = ({ingredients}) => {
    return ingredients.map(ingredient=>{
        return (
          <ul key={uuidv4()} className="ingredient-list">
            <li className="ingredient-text">{ingredient.text}</li>
            {/* <li className="ingredient-weight">Weight {ingredient.weight} g</li> */}
          </ul>
        );
    })
    
}

export default RecipeInfo