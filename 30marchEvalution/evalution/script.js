document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("recipe-form");
    const recipesContainer = document.getElementById("recipes-container");
    const filterDropdown = document.getElementById("filter");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check and apply dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

    function loadRecipes() {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        displayRecipes(recipes);
    }

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = "";
        recipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p>${recipe.steps}</p>
                <h4>Ingredients:</h4>
                <ul>${recipe.ingredients.split("\n").map(ing => `<li>${ing}</li>`).join("")}</ul>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("recipe-name").value;
        const ingredients = document.getElementById("ingredients").value;
        const category = document.getElementById("category").value;
        const steps = document.getElementById("steps").value;

        const newRecipe = { name, ingredients, category, steps };
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        form.reset();
        loadRecipes();
    });

    filterDropdown.addEventListener("change", function() {
        const category = filterDropdown.value;
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        if (category !== "All") {
            recipes = recipes.filter(recipe => recipe.category === category);
        }
        displayRecipes(recipes);
    });

    loadRecipes();
});
