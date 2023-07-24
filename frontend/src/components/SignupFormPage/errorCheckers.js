

export const emailErrors = (email) => {
    const errors = [];
    if (!email.match(email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        errors.push("This email is invalid. Make sure it's written like example@email.com")
    }
    if (email.length === 0) {
        errors.pop();
        errors.push("You need to enter your email.")
    }
    return errors;
}

export const passwordErrors = (password) => {
    const errors = [];
    if (password.length < 8) {
        errors.push("Your password is too short")
    }
    if (password.length === 0) {
        errors.pop();
        errors.push("You need to enter a password.")
    }
    return errors;
}

export const nameErrors  = (name) => {
    const errors = [];
    if (name.length === 0) {
        errors.pop();
        errors.push("Enter a name for your profile.")
    }
    return errors;
}

export const monthErrors  = (month) => {
    const errors = [];
    if (!month) {
        errors.push("Select your birth month.")
    }
    return errors;
}
export const dayErrors  = (day) => {
    const errors = [];
    if (!day || !validDay(day)) {
        errors.push("Enter a valid day of the month.")
    }
    return errors;
}
export const yearErrors  = (year) => {
    const errors = [];
    if (!year || !validYear(year)) {
        errors.push("Enter a valid year.")
    }
    return errors;
}

const validDay = (day) => {
    const numerals = new Set(["0","1","2","3","4","5","6","7","8","9"]);
    const chars = day.split("");
    for (let i = 0; i < chars.length; i++) {
        if (!numerals.has(chars[i])) return false;
    }
    return true;
}
const validYear = (year) => {
    const numerals = new Set(["0","1","2","3","4","5","6","7","8","9"]);
    const chars = year.split("");
    if (chars.length !== 4) return false;
    for (let i = 0; i < chars.length; i++) {
        if (!numerals.has(chars[i])) return false;
    }
    const int = parseInt(year);
    const todaysYear = new Date().getFullYear();
    if (int < 1900 || int > todaysYear) {
        return false;
    }
    return true;
}