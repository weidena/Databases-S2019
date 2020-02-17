module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCameras(res, mysql, context, complete){
        mysql.pool.query("SELECT camera_id as id, camera_view FROM camera", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.camera  = results;
            complete();
        });
    }

    function getGamePlays(res, mysql, context, complete){
        mysql.pool.query("SELECT game_play.game_play_id as id, camera.camera_view AS game_play_camera, game_play_multiplayer, game_play_main_character, game_play_worlds FROM game_play INNER JOIN camera ON game_play_camera = camera.camera_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game_plays = results;
            complete();
        });
    }

    function getGamePlaysbyCamera(req, res, mysql, context, complete){
      var query = "SELECT game_play.game_play_id as id, camera.camera_view AS game_play_camera, game_play_multiplayer, game_play_main_character, game_play_worlds FROM game_play INNER JOIN camera ON game_play_camera = camera.camera_id WHERE game_play.game_play_camera = ?";
      console.log(req.params)
      var inserts = [req.params.game_play_camera]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game_play = results;
            complete();
        });
    }

    /* Find game whose fname starts with a given string in the req */
    function getGamePlaysWithCharacterLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT game_play.game_play_id as id, camera.camera_view AS game_play_camera, game_play_multiplayer, game_play_main_character, game_play_worlds FROM game_play INNER JOIN camera ON game_play_camera = camera.camera_id WHERE games.game_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game_play = results;
            complete();
        });
    }

    function getGamePlay(res, mysql, context, id, complete){
        var sql = "SELECT game_play_id as id, game_play_camera, game_play_multiplayer, game_play_main_character, game_play_worlds FROM game_play WHERE game_play_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game_play = results[0];
            complete();
        });
    }

    /*Display all games. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegameplay.js","filtergameplays.js","searchgames.js"];
        var mysql = req.app.get('mysql');
        getGamePlays(res, mysql, context, complete);
        getCameras(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('game_play', context);
            }

        }
    });

    /*Display all games from a given gameplay. Requires web based javascript to delete with AJAX*/
    router.get('/filter/:game_play_camera', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegameplay.js","filtergameplays.js","searchgameplays.js"];
        var mysql = req.app.get('mysql');
        getGamePlaysbyCamera(req,res, mysql, context, complete);
        getCameras(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('game_play', context);
            }

        }
    });

    /*Display all games whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegameplay.js","filtergameplays.js","searchgameplays.js"];
        var mysql = req.app.get('mysql');
        getGamePlaysWithCharacterLike(req, res, mysql, context, complete);
        getCameras(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('game_play', context);
            }
        }
    });

    /* Display one game for the specific purpose of updating games */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedcamera.js", "updategameplay.js"];
        var mysql = req.app.get('mysql');
        getGamePlay(res, mysql, context, req.params.id, complete);
        getCameras(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-gameplay', context);
            }

        }
    });

    /* Adds a game, redirects to the game page after adding */

    router.post('/', function(req, res){
        console.log(req.body.game_play_camera)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO game_play (game_play_camera, game_play_multiplayer, game_play_main_character, game_play_worlds) VALUES (?,?,?,?)";
        var inserts = [req.body.game_play_camera, req.body.game_play_multiplayer, req.body.game_play_main_character, req.body.game_play_worlds];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/game_play');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE game_play SET game_play_camera=?, game_play_multiplayer=?, game_play_main_character=?, game_play_worlds=? WHERE game_play_id=?";
        var inserts = [req.body.game_play_camera, req.body.game_play_multiplayer, req.body.game_play_main_character, req.body.game_play_worlds, req.params.id];
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

    /* Route to delete a game, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM game_play WHERE game_play_id = ?";
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
