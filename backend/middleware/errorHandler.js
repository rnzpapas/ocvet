const errorHandling = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: 500,
        message: "Something went wrong with our server.",
        error: err.message
    })
}

export default errorHandling