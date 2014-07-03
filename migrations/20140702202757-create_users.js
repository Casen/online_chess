module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        facebook_id: DataTypes.STRING,
        facebook_token: DataTypes.STRING,
        email: DataTypes.STRING
      }
    ).complete(function (error) {
      console.log(error);
      done(error);
    });
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('users').complete(done);
  }
}
