module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGenders(res, mysql, context, complete){
        mysql.pool.query("SELECT gender_id as id, gender_name FROM gender", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.gender = results;
            complete();
        });
    }

    function getAudiences(res, mysql, context, complete){
        mysql.pool.query("SELECT audiences.audience_id as id, audience_age_range_min, audience_age_range_max, audience_location_country, audience_location_state, gender.gender_name AS audience_gender FROM audiences INNER JOIN gender ON audience_gender = gender.gender_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.audiences = results;
            complete();
        });
    }

    function getAudiencesbyGender(req, res, mysql, context, complete){
      var query = "SELECT audiences.audience_id as id, audience_age_range_min, audience_age_range_max, audience_location_country, audience_location_state, gender.gender_name AS audience_gender FROM audiences INNER JOIN gender ON audience_gender = gender.gender_id WHERE audiences.audience_gender = ?";
      console.log(req.params)
      var inserts = [req.params.audience_gender]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.audiences = results;
            complete();
        });
    }


    function getAudience(res, mysql, context, id, complete){
        var sql = "SELECT audience_id as id, audience_age_range_min, audience_age_range_max, audience_location_country, audience_location_state, audience_gender FROM audiences WHERE audience_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.audience = results[0];
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteaudience.js","filteraudiences.js"];
        var mysql = req.app.get('mysql');
        getAudiences(res, mysql, context, complete);
        getGenders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('audiences', context);
            }

        }
    });

    /*Display all audiences*/
    router.get('/filter/:audience_gender', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteaudience.js","filteraudiences.js"];
        var mysql = req.app.get('mysql');
        getAudiencesbyGender(req,res, mysql, context, complete);
        getGenders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('audiences', context);
            }

        }
    });


    /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedgender.js", "updateaudience.js"];
        var mysql = req.app.get('mysql');
        getAudience(res, mysql, context, req.params.id, complete);
        getGenders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-audience', context);
            }

        }
    });

    /* Adds an audience*/

    router.post('/', function(req, res){
        console.log(req.body.audience_gender)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO audiences (audience_age_range_min, audience_age_range_max, audience_location_country, audience_location_state, audience_gender) VALUES (?,?,?,?,?)";
        var inserts = [req.body.audience_age_range_min, req.body.audience_age_range_max, req.body.audience_location_country, req.body.audience_location_state, req.body.audience_gender];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/audiences');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE audiences SET audience_age_range_min=?, audience_age_range_max=?, audience_location_country=?, audience_location_state=?, audience_gender=? WHERE audience_id=?";
        var inserts = [req.body.audience_age_range_min, req.body.audience_age_range_max, req.body.audience_location_country, req.body.audience_location_state, req.body.audience_gender, req.params.id];
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
        var sql = "DELETE FROM audiences WHERE audience_id = ?";
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
