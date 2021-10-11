module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      duration: {
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.INTEGER
      }
    });
  
    return Client;
  };
