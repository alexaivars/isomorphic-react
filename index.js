require('amd-loader');

var express = require('express')
	, exphbs = require('express-handlebars')
	,	path =  require('path')
  , routes = require('app/routes')
  , Router = require('app/router')
	, app = express()
	, hbs = exphbs.create({extname: '.hbs'})
  , port = process.env.PORT || 3030
  , router = new Router(routes)
	, root = path.join(__dirname)
;


app.use('/app', express.static(path.join(root,'app')));
app.use('/node_modules', express.static(path.join(root,'node_modules')));

// Register handlebars .engine with the Express app.
app.engine('hbs', hbs.engine);
app.set('views', path.join(root, 'app/views'));
app.set('view engine', 'hbs');

// Mount the routes defined in `app/routes` on our server.
app.use(router.middleware());
app.listen(port);

console.log('Tutorial running on port %s', port);
