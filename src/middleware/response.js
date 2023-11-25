
function standardizeResponse(req, res, next){
    res.sendSucess = function(data){
        res.status(200).json({
            success: true, 
            data: data
        });
    };

    res.sendError = function(error, statusCode = 500){
        res.status(statusCode).json({
            success: false,
            error: error
        });
    };
    next()
}

module.exports = {
    standardizeResponse,
}