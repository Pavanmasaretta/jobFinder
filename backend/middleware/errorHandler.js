const errorHandler = (err, req, res, next) => {
    console.error(new Date().toLocaleDateString(), "Error:", err);
    if(err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message , errors: "ValidationError" });
    }
    if(err.name==="UnauthorizedError") {
        return res.status(401).json({ message: err.message , errors: "UnauthorizedError" });
    }
    if(err.name==="NotFoundError") {
        return res.status(404).json({ message: err.message , errors: "NotFoundError" });
    }
    if(err.name==="ForbiddenError") {
        return res.status(403).json({ message: err.message , errors: "ForbiddenError" });
    }
    return res.status(500).json({ message: "Internal Server Error", errors: err.message });

}
module.exports = errorHandler;