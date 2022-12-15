class CustomError extends Error { 
    constructor(message) { 
        super(message);
        this.status = 400;
    }
}

class NotAuthorizedError extends CustomError { 
        constructor(message) { 
        super(message);
        this.status = 401;
    }
}

module.exports = {
    CustomError, NotAuthorizedError
}