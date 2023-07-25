import { commonPasswords } from "./commonPasswords";

const emailErrors = (email) => {
    let errors = "";
    const emailRegex = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (!emailRegex.test(email)) {
        errors = "This email is invalid. Make sure it's written like example@email.com";
    }
    if (email.length === 0) {
        errors = "You need to enter your email.";
    }
    return errors;
}

const passwordErrors = (password) => {
    let errors = "";
    if (commonPasswords.has(password)) {
        errors = "Your password is too weak. Set a stronger one.";
    }
    if (password.length < 8) {
        errors = "Your password is too short";
    }
    if (password.length === 0) {
        errors = "You need to enter a password.";
    }
    return errors;
}

const nameErrors  = (name) => {
    let errors = "";
    if (name.length === 0) {
        errors = "Enter a name for your profile."
    }
    return errors;
}

const monthErrors  = (month) => {
    let errors = "";
    if (!month) {
        errors = "Select your birth month."
    }
    return errors;
}

export const validDay = (day) => {
    const numerals = new Set(["0","1","2","3","4","5","6","7","8","9"]);
    const chars = day.split("");
    for (let i = 0; i < chars.length; i++) {
        if (!numerals.has(chars[i])) return false;
    }
    return true;
}

const dayErrors  = (day) => {
    let errors = "";
    if (!day || !validDay(day) || parseInt(day) === 0 || parseInt(day) > 31) {
        errors = "Enter a valid day of the month."
    }
    return errors;
}

export const validYear = (year) => {
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


const yearErrors  = (year) => {
    let errors = "";
    if (!year || !validYear(year)) {
        errors = "Enter a valid year."
    }
    return errors;
}

const signUpErrors = (field) => (entry) => {
    if (field === "email") return emailErrors(entry);
    if (field === "password") return passwordErrors(entry);
    if (field === "name") return nameErrors(entry);
    if (field === "month") return monthErrors(entry);
    if (field === "day") return dayErrors(entry);
    if (field === "year") return yearErrors(entry);
}

export default signUpErrors