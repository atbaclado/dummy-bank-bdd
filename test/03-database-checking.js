const assert = require('chai').assert;
const http = require("http"); 
const orm = require("orm");
const pg = require("pg"); 

// format: "database://user:password@host:port/databasename"
var connestString = "postgres://postgres:04031998@localhost:5432/bankdb";

describe('Database setup', function() {
    
  describe('Database is found', function () {
    it('bankdb should be created already', function (done) {
      orm.connect(connestString, function (err) {
        if (err) throw err;   
        done();
      });
    });
  });

  var knex = require('knex')({
    client: 'pg',
    version: '6.4.2',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '04031998',
      database : 'bankdb'
    }
  });

  describe('Database Schema', function () {

    it('users table should be found', function (done) {     
      knex.schema.hasTable('users').then(function(exists, err) {
        if(!exists) throw err;
        done();
      }).catch(function (err) {
        throw "err";
      })
    });

    it('email table users should be found', function (done) {     
      knex.schema.hasColumn('users', 'email').then(function(exists, err) {
        if(!exists) throw err
        done();
      }).catch(function (err) {
        throw err;
      })
    });

    it('name table users should be found', function (done) {     
      knex.schema.hasColumn('users', 'name').then(function(exists, err) {
        if(!exists) throw err
        done();
      }).catch(function (err) {
        throw err;
      })
    });

    it('password table users should be found', function (done) {     
      knex.schema.hasColumn('users', 'password').then(function(exists, err) {
        if(!exists) throw err
        done();
      }).catch(function (err) {
        throw err;
      })
    });

    it('accounts table should be found', function (done) {   
      knex.schema.hasTable('accounts').then(function(exists, err) {
        if(!exists) throw err;
        done();
      }).catch(function (err) {
        throw err;           
      });
    });

    it('user_id table account should be found', function (done) {     
      knex.schema.hasColumn('accounts', 'user_id').then(function(exists, err) {
        if(!exists) throw err
        done();
      }).catch(function (err) {
        throw err;
      })
    });

   it('balance table accounts should be found', function (done) {     
      knex.schema.hasColumn('accounts', 'balance').then(function(exists, err) {
        if(!exists) throw err
        done();
      }).catch(function (err) {
        throw err;
      })
    });
  });
}); // end: database set-up checking