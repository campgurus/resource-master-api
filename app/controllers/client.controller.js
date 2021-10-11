const db = require('../models');
const Client = db.clients;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.name) {
        res.status(400).send({
            message: "Client must have a name!"
        });
        return;
    }

    const client = {
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        start_date: req.body,
        duration: req.body.duration,
        rate: req.body.rate
    }

    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'An error occurred while creating this Client.'
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%`} } : null;

    Client.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving clients"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Can't find Client with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Client with id=' + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Client was updated successfully'
                })
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. MAybe Client was not found or request body was empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating client with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Client.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Client with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Client.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Clients were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Clients."
        });
      });
};

// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
// };