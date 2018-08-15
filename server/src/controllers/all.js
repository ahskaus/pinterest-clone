import hashy from 'hashy';
import md5 from 'md5';

import db from '../init/mysql';
import config from '../config/config.json';
import toTinyUrl from '../util/tinyUrl';

//------------------------NOTE-----------------------
//As seen here, I have not done any validation. 
//It's because I didn't have time, but I know it
//should be done. In an actual environment __ALL__
//inputs will be validated (url, name, etc.) through 
//a regex or a custom validator.
//__NO__ user input would go directly into the db
//without being checked.
//
//--Syed
//------------------------NOTE-----------------------

export const getPins = async (req, res) => {

	try {
		const github_id = req.params.user;
		const page = (req.params.page && Number(req.params.page)) || 0;

		const user = await db.query('SELECT * FROM users WHERE github_id = ?', [github_id]);
		if(!user.length)
			return res.status(404).send('Profile does not exist');

		//this can be moved to a middleware --Syed
		const selfProfile = req.session.loggedUser === req.params.user;
		const query = selfProfile ?
			'SELECT image_url AS src, hash_url AS id, tiny_url AS url FROM images WHERE user = ? AND !deleted  ORDER BY id LIMIT ?, ?' :
			'SELECT image_url AS src, hash_url AS id FROM images WHERE user = ? AND !deleted  ORDER BY id LIMIT ?, ?';

		const results = await db.query(query, [github_id, page*config.pageSize, config.pageSize]);
		res.json(results);
	} catch(e) {
		res.status(500).send('Something broke...');
	}
};

export const getPin = async (req, res) => {

	try {
		const tiny_url = req.params.tinyUrl;
		const results = await db.query('SELECT image_url FROM images WHERE tiny_url LIKE BINARY ?', [tiny_url]);
		if(!results.length)
			return res.status(404).send('Image not found');
		return res.json({ image_url: results[0]['image_url'] });
	} catch(e) {
		res.status(500).send('Something broke...');
	}
};

export const addPin = async (req, res) => {

	try {
		const { url } = req.body;

		//The INSERT and UPDATE queries should be in a transaction
		//If either fail, the transaction would be rolled back
		//--Syed

		const insert = await db.query('INSERT INTO images (user, image_url) VALUES( ?, ?)', [req.session.loggedUser, url]);
		if(insert.affectedRows != 1)
			return res.status(500).send('Something went wrong...');

		const hash = await hashy.hash(`${insert.insertId}${config.salt}`);

		const update = await db.query('UPDATE images SET hash_url = ?, tiny_url = ? WHERE id = ? ', [md5(hash), toTinyUrl(insert.insertId), insert.insertId]);
		if(update.affectedRows != 1)
			return res.status(500).send('Something went wrong...');	
		res.status(200).send();
	} catch(e) {
		res.status(500).send('Something broke...');
	}
};

export const deletePin = async (req, res) => {

	try {
		const update = await db.query('UPDATE images SET deleted = true WHERE hash_url = ? AND user = ?', [req.params.hash, req.session.loggedUser]);
		if(update.affectedRows != 1)
			return res.status(500).send('Something went wrong...');	
		res.status(200).send();
	} catch(e) {
		res.status(500).send('Something broke...');
	}
};