exports.success = (
    res,
    message = 'عملیات با موفقیت انجام شد.',
    data = null,
    statusCode = 200
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });

};

exports.error = (
    res,
    message = 'خطایی رخ داده است.',
    errors = [],
    statusCode = 400
) => {

    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });

};