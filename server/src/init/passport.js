import passport from 'passport';
import Strategy from 'passport-github';

import { GITHUB_APP } from '../config/github';

const GithubStrategy = Strategy.Strategy;

export default () => {  

	passport.serializeUser((user, cb) => cb(null, user));
	passport.deserializeUser((obj, cb) => cb(null, obj));
	const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

	passport.use(new GithubStrategy(GITHUB_APP, callback));

};