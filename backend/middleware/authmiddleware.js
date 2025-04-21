const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(token){
            const isTokenValid = jwt.verify(token, process.env.SECRET);
            if(isTokenValid){
                const decodedToken = jwt.decode(token);
                req.user = decodedToken.id ;
                next();
            }
        
        else{
                const error = new Error('Invalid token');
                error.name = 'UnauthorizedError';
                next(error);
            }
    }
        else{
            const error = new Error('Token not found');
            error.name = 'UnauthorizedError';
            next(error);
        }
    }
    catch(error){
        next(error);
    }
}
module.exports = authMiddleware;