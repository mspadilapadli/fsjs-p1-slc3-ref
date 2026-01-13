const helper = {
    formatValdiateErrors(error) {
        if (error.name == `SequelizeValidationError`) {
            const errors = {};
            error.errors.forEach((e) => {
                errors[e.path] = e.message;
            });
            return errors;
        }
        return null;
    },
};

module.exports = helper;
