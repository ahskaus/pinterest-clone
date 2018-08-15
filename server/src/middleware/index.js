


export const authorized = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
    	res.status(401).send('Not authorized');
    }
}