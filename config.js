var config = {
  expressPort: 3000,
  client: {
    mongodb: {
      defaultDatabase: 'users',
      defaultCollection: 'todos',
      defaultUri: "mongodb://aayush24:sharmaji@meanbeta-shard-00-00-sshqm.mongodb.net:27017,meanbeta-shard-00-01-sshqm.mongodb.net:27017,meanbeta-shard-00-02-sshqm.mongodb.net:27017/users?ssl=true&replicaSet=MEANbeta-shard-0&authSource=admin"
    }
  }
};

module.exports = config;

