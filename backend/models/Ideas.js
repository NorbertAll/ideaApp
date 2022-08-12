module.exports = (sequelize, DataTypes)=>{
    const Ideas = sequelize.define("Ideas", {
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ideaText: {
            type: DataTypes.STRING,
            allowNull:false
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false
        },
    });
    Ideas.associate = (models)=>{
        Ideas.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Ideas.hasMany(models.Likes, {
            onDelete: "cascade",
        })
    }
    
   return Ideas;
};