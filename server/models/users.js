module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        password_digest: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        servicesList: {
            type: DataTypes.STRING,
            allowNull: true
        },
        about: {
            type: DataTypes.STRING,
            allowNull: true
        },
        myRating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        myReviews: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }); 

  // Class Method
    users.associate = function (models) {

        users.hasMany(models.projects, {
            onDelete: "cascade"
        });
        
    };
  return users
}
