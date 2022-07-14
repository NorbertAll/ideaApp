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
        }
    })
   return Ideas
}