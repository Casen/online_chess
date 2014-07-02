module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.User)
      }
    }
  })
  return Game
}
