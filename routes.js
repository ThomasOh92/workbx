module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const pokemonControllerCallbacks = require('./controllers/pokemon')(allModels);

  app.get('/pokemons', pokemonControllerCallbacks.index);
  //app.get('/pokemons/:id', pokemons.getPokemon);

  //Accounts Controller and Routes
  const accountsController = require('./controllers/accounts')(allModels);
  // app.get('/registration', accountsController.registrationForm);
  app.post('/registration', accountsController.registerAccount);
  // app.get('/login', accountsController.loginForm);
  app.post('/login', accountsController.loginAccount);
};
