import db from '../init/mysql';

export default (passport, app, socket) => {

	const githubAuth = passport.authenticate('github');

	app.get('/login', (req, res, next) => {
		req.session.clientId = req.query.clientId;
		next();
	}, githubAuth);

	app.get('/github/callback', githubAuth, (req, res) => {
		socket.in(req.session.clientId).emit('user', {user: req.user.username});
		req.session.loggedUser = req.user.username;
		//this needs to be optimized so that it only tries to insert if the user doesn't exist --Syed
		db.query('INSERT INTO users VALUES(?)', [req.session.loggedUser]);
		res.end();
	});

	app.get('/logout', (req, res) => {
		req.session.loggedUser = undefined;
		req.logout();
		res.end();
	});

};