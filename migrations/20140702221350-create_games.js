module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished

    migration.createTable(
      'games',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        white_player_id: {
          type: DataTypes.INTEGER,
          references: "users",
          referencesKey: "id",
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        black_player_id: {
          type: DataTypes.INTEGER,
          references: "users",
          referencesKey: "id",
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        pgn: DataTypes.STRING,
        status: DataTypes.STRING,
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
      }
    ).complete(function(error) {
      console.log(error);
      done(error);
    });
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('games').complete(done);
  }
}
