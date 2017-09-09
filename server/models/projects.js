module.exports = function(sequelize, DataTypes) {
    var projects = sequelize.define("projects", {

        projectName: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        comments: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        bids: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },        
        lowestBidder: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        timeEnding: {
            type: DataTypes.TIME,
            allowNull: true
        },
        paymentReceived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completedBy: {
            type: DataTypes.STRING,
            defaultValue: ""
        },        
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }); 

    projects.associate = function (models) {

        projects.belongsTo(models.users, {
            foreignKey: {
                allowNull: false
            }
        });
    
    };
    return projects
};
