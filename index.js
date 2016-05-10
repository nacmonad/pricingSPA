var express = require('express');
var app = express();
var nunjucks = require('nunjucks')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/public/views');
app.engine('html', nunjucks.render);
app.set('view engine', 'html');


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

