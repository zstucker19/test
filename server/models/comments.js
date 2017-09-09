module.exports = function(sequelize, DataTypes) {
    var comments = sequelize.define("comments", {
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    comments.associate = function (models) {

    comments.belongsTo(models.projects, {
       foreignKey: {
         allowNull: false
       }
    });
    

    comments.belongsTo(models.users, {
       foreignKey: {
         allowNull: false
       }
    });
    
};

    return comments
};