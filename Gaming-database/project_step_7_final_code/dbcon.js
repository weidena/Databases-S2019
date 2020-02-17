var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_weidena',
  password        : '8383', // will not work
  database        : 'cs340_weidena'
});
module.exports.pool = pool;
