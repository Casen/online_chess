module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    white_player_id: {
      type: DataTypes.INTEGER,
      references: "User",
      referencesKey: "id"
    },
    black_player_id: {
      type: DataTypes.INTEGER,
      references: "User",
      referencesKey: "id"
    },
    pgn: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.User)
      }
    }
  })
  return Game
}
