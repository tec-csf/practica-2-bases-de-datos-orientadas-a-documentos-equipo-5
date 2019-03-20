const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const IngresoSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  concepto: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  }
});

// Create ingreso / Use this from outside / Send it to the mongoDB
const Ingreso = module.exports = mongoose.model('Ingreso', IngresoSchema);

module.exports.addIngreso = function(newIngreso, callback) {
  newIngreso.save(callback);
}

module.exports.getAllIngresos = function(userIdRecived, callback) {
  Ingreso.aggregate([{
      $match: {
        userId: userIdRecived
      }
    },
    {
      $project: {
        _id: 0,
        concepto: 1,
        cantidad: 1,
        fecha: 1
      }
    },
    {
      $sort: {
        fecha: 1
      }
    }
  ], callback);
}

module.exports.getSumIngresosByUser = function(userIdRecived, callback) {
  Ingreso.aggregate([{
      $match: {
        userId: userIdRecived
      }
    },
    {
      $group: {
        _id: null,
        totalIngresos: {
          $sum: "$cantidad"
        }
      }
    },
    {
      $project: {
        totalIngresos: 1
      }
    }
  ], callback);
}

// db.ingresos.aggregate([
//   { $match: { userId: "5c8bce36d50753435f68c798"} },
//   { $group: { _id : null, totalIngresos: { $sum: "$cantidad" } } },
//   { $project: { totalIngresos: 1 } }
// ])

// db.ingresos.aggregate([
//   { $match: { userId: "5c8bce36d50753435f68c798" } },
//   { $project: { _id: 0, concepto: 1, cantidad: 1, fecha: 1 } },
//   { $sort: { fecha: 1 } }
// ])
