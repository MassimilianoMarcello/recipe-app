import  { useState } from "react";
import logo from "./logorecipe.svg";
import "./App.css";
import Axios from "axios";
import{v4 as uuidv4}from'uuid';
// import alert from './components/Alert'
import Recipe from './components/Recipe';
import Alert from "./components/Alert";

function App() {
  const [query, setQuery] = useState("");
const[recipes,setRecipes]=useState([])
const[alert,setAlert]= useState("")
  // data from edamam.com
  const APP_ID = "65268f1f";
  const APP_KEY = "d7809ab1d3c1a8e99f1957eec0970e27";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  // fetch api with axios
  const getData = async () => {
    if(query!==""){
      const result = await Axios.get(url);
      if(!result.data.more){
        return setAlert("No food with such name")
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("")
      setQuery("");
    }else{
      setAlert("Please fill in the form")
    }
    
  };
  // change the query
  const onChange=e=>{
    setQuery(e.target.value)
  }

  // return data when you click search
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <a  href="./index">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
           <p>Use to find your next meal!</p>
          <form className="search-form" onSubmit={onSubmit}>
            {alert !== "" && <Alert alert={alert} />}
            <input
              type="text"
              placeholder="Enter Ingredient"
              autoComplete="off"
              onChange={onChange}
              value={query}
            />
            <input type="submit" value="Search" />

            

            
          </form>
        </header>
        <article className="recipes">
          {recipes.length > 0 &&
            recipes.map((recipe) => <Recipe key={uuidv4} recipe={recipe} />)}
        </article>
      </div>
      <div className="landingImage"></div>
      <div className="copyright">MassDev©2021 </div>
    </>
  );
}

export default App;
