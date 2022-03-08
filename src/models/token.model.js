'use strict';
const { tokenTypes } = require('../config/tokens');

const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	const Token = sequelize.define('Token', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT(16)
		},
		token: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		user_id: {
			type: DataTypes.BIGINT(16),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM([tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]),
			allowNull: false,
		},
		expires: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		blacklisted: {
			type: DataTypes.BOOLEAN(),
			allowNull: true,
			defaultValue: null
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

	return Token;
};