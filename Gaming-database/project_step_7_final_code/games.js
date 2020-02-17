module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGenres(res, mysql, context, complete){
        mysql.pool.query("SELECT genre_id as id, genre_name FROM genre", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genre  = results;
            complete();
        });
    }

    function getGames(res, mysql, context, complete){
        mysql.pool.query("SELECT games.game_id as id, game_name, game_release_date, genre.genre_name AS game_genre, game_rating FROM games INNER JOIN genre ON game_genre = genre.genre_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.games = results;
            complete();
        });
    }

    function getGamesbyGenre(req, res, mysql, context, complete){
      var query = "SELECT games.game_id as id, game_name, game_release_date, genre.genre_name AS game_genre, game_rating FROM games INNER JOIN genre ON game_genre = genre.genre_id WHERE games.game_genre = ?";
      console.log(req.params)
      var inserts = [req.params.game_genre]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.games = results;
            complete();
        });
    }

    /* Find people whose fname starts with a given string in the req */
    function getGamesWithTitleLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT games.game_id as id, game_name, game_release_date, genre.genre_name AS game_genre, game_rating FROM games INNER JOIN genre ON game_genre = genre.genre_id WHERE games.game_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.games = results;
            complete();
        });
    }

    function getGame(res, mysql, context, id, complete){
        var sql = "SELECT game_id as id, game_name, game_release_date, game_genre, game_rating FROM games WHERE game_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game = results[0];
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegame.js","filtergames.js","searchgames.js"];
        var mysql = req.app.get('mysql');
        getGames(res, mysql, context, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('games', context);
            }

        }
    });

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:game_genre', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegame.js","filtergames.js","searchgames.js"];
        var mysql = req.app.get('mysql');
        getGamesbyGenre(req,res, mysql, context, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('games', context);
            }

        }
    });

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegame.js","filtergames.js","searchgames.js"];
        var mysql = req.app.get('mysql');
        getGamesWithTitleLike(req, res, mysql, context, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('games', context);
            }
        }
    });

    /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedgenre.js", "updategame.js"];
        var mysql = req.app.get('mysql');
        getGame(res, mysql, context, req.params.id, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-game', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        console.log(req.body.game_genre)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO games (game_name, game_release_date, game_genre, game_rating) VALUES (?,?,?,?)";
        var inserts = [req.body.game_name, req.body.game_release_date, req.body.game_genre, req.body.game_rating];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/games');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE games SET game_name=?, game_release_date=?, game_genre=?, game_rating=? WHERE game_id=?";
        var inserts = [req.body.game_name, req.body.game_release_date, req.body.game_genre, req.body.game_rating, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM games WHERE game_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
