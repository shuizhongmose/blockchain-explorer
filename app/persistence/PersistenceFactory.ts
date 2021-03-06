/*
 *SPDX-License-Identifier: Apache-2.0
 */

import {explorerConst} from '../common/ExplorerConst'
import {explorerError} from '../common/ExplorerMessage'
const ExplorerError = require('../common/ExplorerError');

/**
 *
 *
 * @class PersistenceFactory
 */
class PersistenceFactory {
	/**
	 *
	 *
	 * @static
	 * @param {*} db
	 * @param {*} dbconfig
	 * @returns
	 * @memberof PersistenceFactory
	 */
	static async create(db, dbconfig) {
		console.log("check",explorerConst.PERSISTENCE_POSTGRESQL)
		if (db === explorerConst.PERSISTENCE_POSTGRESQL) {
			// Avoid to load all db Persist module
			const PostgreSQL = require('./postgreSQL/Persist');
			const persistence = new PostgreSQL(dbconfig);
			await persistence.getPGService().handleDisconnect();
			return persistence;
		}
		throw new ExplorerError(explorerError.ERROR_1003, db);
	}
}

module.exports = PersistenceFactory;
