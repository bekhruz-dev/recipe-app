const API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let result = document.querySelector("#result");
let searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
  let input = document.querySelector("#user-inp").value;
  async function getApi() {
    const res = await fetch(API + input);
    const data = await res.json();
    let myMeal = data.meals[0];
    console.logmyMeal;
    console.log(myMeal.strMealThumb);
    console.log(myMeal.strMeal);
    console.log(myMeal.strArea);
    console.log(myMeal.strInstructions);

    let count = 1;
    let instructions = [];
    //
    for (let i in myMeal) {
      let ingredient = "";
      let measure = "";
      if (i.startsWith("strIngredient") && myMeal[i]) {
        ingredient = myMeal[i];
        measure = myMeal[`strMeasure` + count];
        count += 1;
        instructions.push(`${measure} ${ingredient}`);
      }
    }
    console.log(myMeal);

    result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
        `;

    let ingredientCon = document.getElementById("ingredient-con");
    let parent = document.createElement("ul");
    let recipe = document.getElementById("recipe");
    let hideRecipe = document.getElementById("hide-recipe");
    let showRecipe = document.getElementById("show-recipe");

    instructions.forEach((i) => {
      let child = document.createElement("li");
      child.innerText = i;
      parent.appendChild(child);
      ingredientCon.appendChild(parent);
    });
    hideRecipe.addEventListener("click", () => {
      recipe.style.display = "none";
    });
    showRecipe.addEventListener("click", () => {
      recipe.style.display = "block";
    });
  }

  getApi();
});
