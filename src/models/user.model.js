'use strict';
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT(11)
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM(roles),
			allowNull: false,
			defaultValue: 'user',
		},
		isEmailVerified: {
			type: DataTypes.BOOLEAN(),
			allowNull: false,
			defaultValue: false
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, {});

	User.beforeCreate(async (user, options) => {
		return bcrypt.hash(user.password, 10)
			.then(hash => {
				user.password = hash;
			})
			.catch(err => {
				console.error('userLoginError', err)
				throw new Error();
			});
	});

	User.associate = function (models) {
		// associations can be defined here  
		// User.hasMany(models.Lapu, {
		// 	foreignKey: 'user_id'
		// })

	};

	User.prototype.generateHash = function (password) {
		return bcrypt.hashSync(password, 10);
	}

	User.isEmailTaken = async function (email) {
		let user = await User.findOne({
			where: {
				email: email
			}
		})
		return user ? true : false;
	}

	User.prototype.isPasswordMatch = function (password) {
		return bcrypt.compareSync(password, this.password);
	}

	return User;
};