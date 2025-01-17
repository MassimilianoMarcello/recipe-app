import { useState, useEffect } from "react";
import Axios from "axios";
import logo from "./logorecipe.svg";
import Alert from "./components/Alert";
import RecipeList from "./components/RecipeList";
import "./App.css";

function App() {
  const [imageVisible, setImageVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const [searchExecuted, setSearchExecuted] = useState(false); // Per sapere se la ricerca è stata effettuata
  const [loading, setLoading] = useState(false); // Stato di caricamento

  const APP_ID = import.meta.env.VITE_EDAMAM_API_ID;
  const APP_KEY = import.meta.env.VITE_EDAMAM_API_KEY;

  const getData = async () => {
    if (!query) {
      setAlert("Please fill in the form");
      return;
    }

    setLoading(true); // Imposta loading su true
    setRecipes([]); // Resetta le ricette
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
      const result = await Axios.get(url);
      setRecipes(result.data.hits || []); // Salva le ricette se ci sono
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert("Error fetching data. Please try again later.");
    } finally {
      setLoading(false); // Imposta loading su false
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchExecuted(true); // Indica che la ricerca è stata eseguita
    getData();
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageVisible(true);
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a href="./">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <p className="logo-slogan">Find your next meal here!</p>
        {!searchExecuted && (
          <div className="instructions">
            <p>Enter one or more ingredients to find recipes.</p>
          </div>
        )}
        <form className="search-form" onSubmit={onSubmit}>
          {alert && <Alert alert={alert} />}
          <input
            type="text"
            placeholder="Enter Ingredient"
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <input type="submit" value="Search" />
        </form>
      </header>
      <article className="recipes">
        {/* Mostra le istruzioni solo se la ricerca non è stata eseguita */}
      
        
        {/* Mostra lo stato di caricamento */}
        {loading && (
          <div className="loading">
            <p>Loading recipes...</p>
          </div>
        )}
        {/* Mostra la lista delle ricette */}
        {!loading && recipes.length > 0 && <RecipeList recipes={recipes} />}
        {/* Mostra "No recipes found" solo se la ricerca è stata eseguita e non ci sono ricette */}
        {!loading && searchExecuted && recipes.length === 0 && (
          <div className="no-results">
 <p className="no-results">No recipes found. Please try different ingredients.</p>

          </div>
        )}
           <div className={`landingImage ${imageVisible ? "visible" : ""}`}></div>
      </article>
    
      <div className="copyright">MassDev©2021</div>
    </div>
  );
}

export default App;











