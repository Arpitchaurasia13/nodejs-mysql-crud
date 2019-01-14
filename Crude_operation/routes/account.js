var express = require('express');
var router = express.Router();
async = require('async');

/* GET home page. */
router.get('/',function(req, res, next){
  var con =req.con;
 async.parallel(
   [
    function(callback){
      con.query('select * from account' , function(errors,accounts){
        callback(errors,accounts);
      });
    }
 ],
  function(err, results){
    var data = {accounts: results[0]};
    res.render('account/index',data);
  }
  
  );
});
router.get('/add',function(req, res, next){
  res.render('account/add');
});

router.post('/add',function(req, res, next){
  var con =req.con;
  async.parallel(
    [
      function(callback){
        con.query('insert into account(username,fullname,password) values(?,?,?)',
        [req.body.username,req.body.fullname,req.body.password] ,function(errors, accounts){
          callback(errors);
        });
      }
     ],
  function(err, results){
    
    res.redirect('/account');

  }
 );
});

router.get('/delete/:id',function(req, res, next){
  var con =req.con;
  async.parallel(
    [
      function(callback){
        con.query('delete from account where id = ?',
        [req.params.id] ,function(errors, accounts){
          callback(errors);
        });
      }
     ],
  function(err, results){
    
    res.redirect('/account');

  }
 );
});

router.get('/edit/:id',function(req, res, next){
  var con =req.con;
  async.parallel(
    [
      function(callback){
        con.query('select * from account where id = ?',
        [req.params.id] ,function(errors, accounts){
          callback(errors,accounts[0]);
        });
      }
     ],
  function(err, results){
    var data  = {account:results[0]};
    res.render('account/edit',data);

  }
 );
});

router.post('/edit',function(req, res, next){
  var con =req.con;
  async.parallel(
    [
      function(callback){
        con.query('select * from account where id = ?',
        [req.body.id] ,function(errors, accounts){
          var password = accounts[0].password;
          if(req.body.password !=''){
            account.password = req.body.password;

          }
          con.query('update account set username = ?, fullname = ?,password = ? where id = ?',
          [req.body.username,req.body.fullname,password,req.body.id] ,function(errors, accounts){
            callback(errors);
          });
        });
      }
     ],
  function(err, results){
    res.redirect('/account');

  }
 );
});
module.exports = router;
