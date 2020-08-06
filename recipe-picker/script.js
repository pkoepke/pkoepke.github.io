let recipies = [
  'Turkey burgers',
  'Italian beef',
  'Chicken / Turkey sausage grilled',
  'BBQ kielbasa sandwiches( in oven)',
  'Grilled salmon',
  'Grilled chicken breast(BBQ sauce brushed or Italian marinade)',
  'BBQ pulled chicken(crock pot)',
  'Crock pot pot roast',
  'Crock pot salsa beef',
  'Crock pot salsa chicken',
  'Sweet and sour meatballs with rice',
  'Irish beef stew',
  'Tater tot casserole',
  'Frozen ravioli',
  'Frozen tortellini',
  'Grilled cheese and tomato soup',
  'Breakfast for dinner(scrambled eggs or pancakes)',
  'Cubed chicken in Indian sauces',
  'Tacos',
  'Beer can chicken',
  'Marinated pork loin / turkey loin',
  'Tony Chachere \'s jambalaya or gumbo mix',
  'Baked potatoes'
]

function writeRecipes(recipies) {
  let htmlToAdd = '<ol>';
  for (recipe of recipies) {
    htmlToAdd += '<li class="recipe">' + recipe + '</li>';
  }
  htmlToAdd += '</ol>';
  document.getElementById('output').innerHTML += htmlToAdd;
}

writeRecipes(recipies);

function pickRecipe() {
  let currentlySelected = document.getElementsByClassName('selected');
  for (recipe of currentlySelected) {
    recipe.classList.remove('selected');
  }
  let allRecipes = document.getElementsByClassName('recipe');
  let choice = Math.floor(Math.random() * 23);
  /*console.log(choice + ": ");
  console.log(allRecipes[choice]);*/
  let selected = allRecipes[choice];
  selected.classList.add('selected');
  console.log('seleced:');
  console.log(selected);
}