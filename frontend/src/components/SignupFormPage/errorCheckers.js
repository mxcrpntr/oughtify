import { commonPasswords } from "./commonPasswords";


export const emailErrors = (email) => {
    const errors = [];
    const emailRegex = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (!emailRegex.test(email)) {
        errors.push("This email is invalid. Make sure it's written like example@email.com")
    }
    if (email.length === 0) {
        if (errors[0]) errors.pop();
        errors.push("You need to enter your email.")
    }
    return errors[0];
}

export const passwordErrors = (password) => {
    const errors = [];
    if (commonPasswords.has(password)) {
        errors.push("Your password is too weak. Set a stronger one.");
    }
    if (password.length < 8) {
        if (errors[0]) errors.pop();
        errors.push("Your password is too short");
    }
    if (password.length === 0) {
        if (errors[0]) errors.pop();
        errors.push("You need to enter a password.")
    }
    return errors[0];
}

export const nameErrors  = (name) => {
    const errors = [];
    if (name.length === 0) {
        errors.push("Enter a name for your profile.")
    }
    return errors[0];
}

export const monthErrors  = (month) => {
    const errors = [];
    if (!month) {
        errors.push("Select your birth month.")
    }
    return errors[0];
}
export const dayErrors  = (day) => {
    const errors = [];
    if (!day || !validDay(day)) {
        errors.push("Enter a valid day of the month.")
    }
    return errors[0];
}
export const yearErrors  = (year) => {
    const errors = [];
    if (!year || !validYear(year)) {
        errors.push("Enter a valid year.")
    }
    return errors[0];
}

const validDay = (day) => {
    const errors = [];
    const numerals = new Set(["0","1","2","3","4","5","6","7","8","9"]);
    const chars = day.split("");
    for (let i = 0; i < chars.length; i++) {
        if (!numerals.has(chars[i])) return false;
    }
    return true;
}
const validYear = (year) => {
    const errors = [];
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