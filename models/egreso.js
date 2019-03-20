const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EgresoSchema = mongoose.Schema({
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
const Egreso = module.exports = mongoose.model('Egreso', EgresoSchema);

module.exports.addEgreso = function(newEgreso, callback) {
  newEgreso.save(callback);
}

module.exports.getAllEgresos = function(userIdRecived, callback) {
  Egreso.aggregate([{
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

module.exports.getSumEgresosByUser = function(userIdRecived, callback) {
  Egreso.aggregate([{
      $match: {
        userId: userIdRecived
      }
    },
    {
      $group: {
        _id: null,
        totalEgresos: {
          $sum: "$cantidad"
        }
      }
    },
    {
      $project: {
        totalEgresos: 1
      }
    }
  ], callback);
}
