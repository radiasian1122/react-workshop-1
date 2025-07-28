import { useState, useEffect } from "react";
import "./App.css";
import js from "@eslint/js";

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

function Cocktails({ cocktailList, clickHandler, className }) {
  return (
    <div className={className}>
      {cocktailList.map((drink) => {
        return <Cocktail onCocktailClick={clickHandler} drink={drink} />;
      })}
    </div>
  );
}

function Search({ updateList }) {
  const getUpdatedList = (ingredient) => {
    fetch(`http://localhost:3001/search/${ingredient}`)
      .then((httpResponse) => httpResponse.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        updateList(jsonResponse.drinks);
        // setCocktailList(jsonResponse.drinks.slice(0, 10));
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search Cocktail by Ingredient"
        onKeyUp={(e) => {
          if ((e.key === "Enter" || e.keyCode === 13) && e.target.value != "") {
            getUpdatedList(e.target.value);
          }
        }}
      ></input>
    </div>
  );
}
//main component
function App() {
  //use state - creating state of application
  const [cocktailList, setCocktailList] = useState([
    { strDrink: "Fetching drinks...", strDrinkThumb: null },
  ]);

  /*
  let count = 0

  useEffect(()=>{
    console.log(count)
    }, count) // anytime count changes, useEffect runs - can this be a function?
    count++
  */
  // useState returns [data, function]
  // JS allows for an array of variables to be assigned an array of data
  // let [x,y] = ()=>  {return [20,30]}
  // x -> 20
  // y -> 30
  // let [n,m] = ['hello', ()=>{}]
  // n -> 'hello'
  // m -> ()=>{}

  /*
    useState = (initialState) => {
      
      return [initialState, ()=>{}]
    }
  */
  const [favorites, setFavorites] = useState([
    { strDrink: "No favorites added.", strDrinkThumb: null },
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((httpResponse) => httpResponse.json())
      .then((jsonResponse) => {
        setCocktailList(jsonResponse.drinks.slice(0, 10));
      });
  }, []);

  const addCocktail = (drink) => {
    let cocktails = favorites.map((favoriteDrink) => favoriteDrink);
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
      <h3>Favorites</h3>
      <Cocktails
        className="cocktail-list favorites"
        cocktailList={favorites}
        clickHandler={removeCocktail}
      />
      <h3>Drinks</h3>
      <Search updateList={setCocktailList} />
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
