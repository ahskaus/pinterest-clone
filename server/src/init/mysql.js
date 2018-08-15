import mysql from 'mysql';
import util from 'util';

//SHOULD BE IN ENVVARS!!! --Syed
//It should NEVER be here. It's only here since I was crushed for time
const pool = mysql.createPool({
	connectionLimit : 5,
	host     		: 'localhost',
	user     		: 'root',
	password 		: '9fhnBwyttrU@$h',
	database 		: 'pinterest'
});

//promisifying to make life easier
pool.query = util.promisify(pool.query);

export default pool;