export const valid = ({ name, email, password }) => {
    const err = {}

    if (!name) {
        err.name = "Please add your name"
    }

    if (!email) {
        err.email = "Please add your email.";
    } else if (!validateEmail(email)) {
        err.email = "Email format is incorrect.";
    }

    if (!password) {
        err.password = "Please add your password.";
    } else if (password.length < 6) {
        err.password = "Password must be at least 6 characters.";
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length,
    };
}

function validateEmail(email) {
    // eslint-disable-next-line
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}