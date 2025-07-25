import { useState, useEffect } from "react";
import "./App.css";

function Cocktail({ drink, onCocktailClick }) {
  return (
    <div
      className="cocktail"
      onClick={() => {
        onCocktailClick(drink);
      }}
    >
      <img src={drink.strDrinkThumb}></img>
      <p>{drink.strDrink}</p>
    </div>
  );
}

function Cocktails({ cocktailList, clickHandler }) {
  return (
    <div>
      {cocktailList.map((drink) => {
        return <Cocktail onCocktailClick={clickHandler} drink={drink} />;
      })}
    </div>
  );
}

function App() {
  const [cocktailList, setCocktailList] = useState([
    { strDrink: "Fetching drinks...", strDrinkThumb: null },
  ]);
  const [favorites, setFavorites] = useState([
    { strDrink: "No favorites added.", strDrinkThumb: null },
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((httpResponse) => httpResponse.json())
      .then((data) => {
        setCocktailList(data.drinks.slice(0, 10));
      });
  }, []);

  const addCocktail = (drink) => {
    let cocktails = favorites.map((drink) => drink);
    if (cocktails[0].strDrink === "No favorites added.") {
      cocktails.splice(0, 1, drink);
    } else if (
      cocktails.filter((cocktail) => cocktail.strDrink == drink.strDrink)
        .length < 1
    ) {
      cocktails.push(drink);
    }

    setFavorites(cocktails);
  };

  const removeCocktail = (drink) => {
    // TODO
    let removeCocktails = favorites.filter(
      (cocktail) => cocktail.strDrink != drink.strDrink
    );
    if (removeCocktails.length < 1) {
      removeCocktails.push({
        strDrink: "No favorites added.",
        strDrinkThumb: null,
      });
    }
    setFavorites(removeCocktails);
  };

  return (
    <>
      <Cocktails
        className="cocktail-list favorites"
        cocktailList={favorites}
        clickHandler={removeCocktail}
      />
      <Cocktails
        className="cocktail-list results"
        cocktailList={cocktailList}
        clickHandler={addCocktail}
      />
    </>
  );
}

export default App;

/*
 Render a default list of cocktails
  • useState(["Fetching cocktails"]), cocktailsList, setCocktailsList
  • useEffect fetch http://localhost:3001/ then grab top 10 drinks in object <- we can make it random

 Favorites list
  • useState([]), favoriteCocktails setFavoriteCocktails

 Add cocktails to a favorites list
  • setFavoriteCocktails with new data

 Remove cocktails from favorites list
  • setFavoriteCocktails with spliced data

 Search by ingrediant
  • useEffect with a fetch to http://localhost:3001/search/{item}

 Styling
  • use className and apply styles
*/

/*

.map <- method of the Array class

.map( callback Function )
  • it passes 3 arguments into the callback function: element, index, collection
  • it creates a new array
  • then applies the callback function to every element in the array
  • then pushes the result of the callback function into the new array
  • then return the new array
  
    () => {} <- this function technically has 3 arguments being passed into it
    (element) => {} <- do something with the element 
    (element, index) => {}
    (element, index, collection) => {}

    .map will always pass in the element, then index, then collection
    ---- element is the value of the current index location in the array
    ---- index is the current index location in the array
    ---- collection is the current array

      // -- What .map does --
      .map invoked on an array with a callback function
        let result = [];
        for each element in array
          results.push(callback function(element, index, collection))
        return result;
      end of .map
      // -------------------------

    // Example
    let myArray = [0,1,2,7,4]
    let myCb = (number, index, collection) => {
      let value = number + index + collection[index]
      return value == 0 ? "zero" : value;
    }

    myArray.map(myCb) -> ["zero",3,6,17,12]

    // ---------------------------------
    

*/
