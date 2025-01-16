import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import logo from "./logorecipe.svg";
import { v4 as uuidv4 } from "uuid";
import Recipe from './components/Recipe';
import Alert from "./components/Alert";
import "./App.css";



function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const APP_ID = import.meta.env.VITE_EDAMAM_API_ID;
  const APP_KEY = import.meta.env.VITE_EDAMAM_API_KEY;

  // Debounce the query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); // Update debounced query after delay
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer); // Clear timeout on cleanup
  }, [query]);

  // Fetch data from API
  const getData = useCallback(async () => {
    if (debouncedQuery !== "") {
      const url = `https://api.edamam.com/search?q=${debouncedQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      try {
        const result = await Axios.get(url);
        if (!result.data.more) {
          setAlert("No food with such name");
        } else {
          setRecipes(result.data.hits);
          setAlert("");
        }
      } catch (error) {
        console.error(error);
        setAlert("Error fetching data. Please try again later.");
      }
    } else {
      setAlert("Please fill in the form");
    }
  }, [debouncedQuery, APP_ID, APP_KEY]);

  // Handle input change
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    getData(); // Call getData only when the form is submitted
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <a href="./">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <p className="logo-slogan">Use to find your next meal!</p>
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
            recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
        </article>
      </div>
      <div className="landingImage"></div>
      <div className="copyright">MassDev©2021</div>
    </>
  );
}

export default App;