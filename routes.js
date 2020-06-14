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

  //Sticky Notes Controller and Routes
  const stickyNoteController = require('./controllers/stickynotes')(allModels)
  app.get('/stickynotes', stickyNoteController.getStickyNotes)
  app.post('/stickynotes', stickyNoteController.saveStickyNotes)

  //Web Links Controller and Routes
  const webLinkController = require('./controllers/weblinks')(allModels)
  app.get('/weblinks', webLinkController.getWebLinks)
  app.post('/weblinks', webLinkController.saveWebLinks)

  //Cloud Links Controller and Routes
  const cloudLinkController = require('./controllers/cloudlinks')(allModels)
  app.get('/cloudlinks', cloudLinkController.getCloudLinks)
  app.post('/cloudlinks', cloudLinkController.saveCloudLinks)

  //Local Links Controller and Routes
  const localLinkController = require('./controllers/locallinks')(allModels)
  app.get('/locallinks', localLinkController.getLocalLinks)
  app.post('/locallinks', localLinkController.saveLocalLinks)
};
