module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHardwares(res, mysql, context, complete){
        mysql.pool.query("SELECT hardware.hardware_id as id, hardware_platform, hardware_game_cartridge, hardware_controls FROM hardware", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hardwares = results;
            complete();
        });
    }

    /* Find hardware whose name starts with a given string in the req */
    function getHardwareWithPlatformLike(req, res, mysql, context, complete) {
      
       var query = "SELECT hardware.hardware_id as id, hardware_platform, hardware_game_cartridge, hardware_controls FROM hardware WHERE hardware.hardware_platform LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hardwares = results;
            complete();
        });
    }

    function getHardware(res, mysql, context, id, complete){
        var sql = "SELECT hardware_id as id, hardware_platform, hardware_game_cartridge, hardware_controls FROM hardware WHERE hardware_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hardware = results[0];
            complete();
        });
    }

    /*Display*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletehardware.js","filterhardware.js", "searchhardware.js"];
        var mysql = req.app.get('mysql');
        getHardwares(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('hardware', context);
            }

        }
    });


    /*Search the hardware */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletehardware.js", "filterhardware", "searchhardware.js"];
        var mysql = req.app.get('mysql');
        getHardwareWithPlatformLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('hardware', context);
            }
        }
    });

    /* Filter for the purpose of updating */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatehardware.js"];
        var mysql = req.app.get('mysql');
        getHardware(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-hardware', context);
            }

        }
    });

    /* Adds a hardware*/

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO hardware (hardware_platform, hardware_game_cartridge, hardware_controls) VALUES (?,?,?)";
        var inserts = [req.body.hardware_platform, req.body.hardware_game_cartridge, req.body.hardware_controls];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/hardware');
            }
        });
    });

    /* The URI that update data is sent to in order to update a hardware */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE hardware SET hardware_platform=?, hardware_game_cartridge=?, hardware_controls=? WHERE hardware_id=?";
        var inserts = [req.body.hardware_platform, req.body.hardware_game_cartridge, req.body.hardware_controls, req.params.id];
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

    /* Route to delete a hardware, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM hardware WHERE hardware_id = ?";
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
