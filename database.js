const Sequelize = require('sequelize');

// format: "database://user:password@host:port/databasename"
const connectionUrl = 'postgres://postgres:04031998@localhost:5432/bankdb';
//const connectionUrl = 'postgres://rcfhecaycjabdh:4ffafb45c32e2c3d3138aba299afd94c660c4809dea52e17adcca294af5e449c@ec2-54-225-88-199.compute-1.amazonaws.com:5432/d8fgq52dr36pnn';
const database = new Sequelize(process.env.DATABASE_URL ||connectionUrl);

module.exports = database;
