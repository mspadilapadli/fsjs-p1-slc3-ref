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
    formatCurrency(number) {
        let Idr = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return Idr.format(number);
    },
};

module.exports = helper;
