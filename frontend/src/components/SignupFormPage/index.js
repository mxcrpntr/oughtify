import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './SignupForm.css'
import SpotifyLogoSVG from "./SpotifyLogo";
import { dayErrors, emailErrors, monthErrors, nameErrors, passwordErrors, yearErrors } from "./errorCheckers";


export default function SignupFormPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    let year;
    const setYear = (newYear) => {
        year = newYear;
        const date = birthDate;
        date.setFullYear(newYear);
        setBirthDate(date);
    }
    let month;
    const setMonth = (newMonth) => {
        month = newMonth;
        const date = birthDate;
        date.setMonth(newMonth);
        setBirthDate(date);
    }
    let day;
    const setDay = (newDay) => {
        day = newDay;
        const date = birthDate;
        date.setDate(newDay);
        setBirthDate(date);
    }
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) {
        return (<Redirect to="/" />);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signup({ email, password, name, birthDate }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
                });
    };

    document.querySelector("body").className = "signUpBody"
    
    var [
        emailErrorText,
        passwordErrorText,
        nameErrorText,
        monthErrorText,
        dayErrorText,
        yearErrorText
          ] = ["","","","","",""]

    const handleFocus = (inputType) => (e) => {
        e.preventDefault();
        if (inputType === 'email') {
            if (!e.target.classList.contains("focused")) e.target.classList.add("focused");
            if (e.target.classList.contains("red") && emailErrors(e.target.value)) {
                document.querySelector(".emailError").innerText = emailErrors(e.target.value);
            } else {
                console.log("weere giid")
                e.target.classList.remove("red");
                document.querySelector(".emailError").innerText = "";
            }
        }
        if (inputType === 'password') {
            if (!e.target.classList.contains("focused")) e.target.classList.add("focused");
            if (e.target.classList.contains("red") && passwordErrors(e.target.value)) {
                document.querySelector(".passwordError").innerText = passwordErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".passwordError").innerText = "";
            }
        }
        if (inputType === 'name') {
            if (!e.target.classList.contains("focused")) e.target.classList.add("focused");
            if (e.target.classList.contains("red") && nameErrors(e.target.value)) {
                const book = document.querySelector(".book");
                book.classList.add("nameError");
                book.innerText = nameErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                const book = document.querySelector(".book");
                book.classList.remove("nameError");
                book.innerText = "This appears on your profile.";
            }
        }
        if (inputType === 'month') {
            if (!e.target.classList.contains("focused")) e.target.classList.add("focused");
            if (e.target.classList.contains("red") && monthErrors(e.target.value)) {
                document.querySelector(".monthError").innerText = monthErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".monthError").innerText = "";
            }
        }
        if (inputType === 'day') {
            if (!e.target.classList.contains("focused")) e.target.classList.add("focused");
            if (e.target.classList.contains("red") && dayErrors(e.target.value)) {
                document.querySelector(".dayError").innerText = dayErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".dayError").innerText = "";
            }
        }
        if (inputType === 'year') {
            if (!e.target.classList.contains("focused")) e.target.classList.add("focused");
            if (e.target.classList.contains("red") && yearErrors(e.target.value)) {
                document.querySelector(".yearError").innerText = yearErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".yearError").innerText = "";
            }
        }
    }

 

    const handleBlur = (inputType) => (e) => {
        e.preventDefault();
        if (inputType === 'email') {
            if (e.target.classList.contains("focused")) e.target.classList.remove("focused");
            if (emailErrors(e.target.value)) {
                if (!e.target.classList.contains("red")) e.target.classList.add("red");
                emailErrorText = emailErrors(e.target.value);
                document.querySelector(".emailError").innerText = " " + emailErrorText;
            } else {
                e.target.classList.remove("red");
                document.querySelector(".emailError").innerText = "";
            }
        }
        if (inputType === 'password') {
            if (e.target.classList.contains("focused")) e.target.classList.remove("focused");
            if (passwordErrors(e.target.value)) {
                if (!e.target.classList.contains("red")) e.target.classList.add("red");
                document.querySelector(".passwordError").innerText = passwordErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".passwordError").innerText = "";
            }
        }
        if (inputType === 'name') {
            if (e.target.classList.contains("focused")) e.target.classList.remove("focused");
            if (nameErrors(e.target.value)) {
                if (!e.target.classList.contains("red")) e.target.classList.add("red");
                const book = document.querySelector(".book");
                book.classList.add("nameError");
                book.innerText = nameErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                const book = document.querySelector(".book");
                book.classList.remove("nameError");
                book.innerText = "This appears on your profile.";
            }
        }
        if (inputType === 'month') {
            if (e.target.classList.contains("focused")) e.target.classList.remove("focused");
            if (monthErrors(e.target.value)) {
                if (!e.target.classList.contains("red")) e.target.classList.add("red");
                document.querySelector(".monthError").innerText = monthErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".monthError").innerText = "";
            }
        }
        if (inputType === 'day') {
            if (e.target.classList.contains("focused")) e.target.classList.remove("focused");
            if (dayErrors(e.target.value)) {
                if (!e.target.classList.contains("red")) e.target.classList.add("red");
                document.querySelector(".dayError").innerText = dayErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".dayError").innerText = "";
            }
        }
        if (inputType === 'year') {
            if (e.target.classList.contains("focused")) e.target.classList.remove("focused");
            if (yearErrors(e.target.value)) {
                if (!e.target.classList.contains("red")) e.target.classList.add("red");
                document.querySelector(".yearError").innerText = yearErrors(e.target.value);
            } else {
                e.target.classList.remove("red");
                document.querySelector(".yearError").innerText = "";
            }
        }
    }

        const emailErrorSpan = () => {
            if (emailErrorText) {
                return (<span className=""><i class="fa-solid fa-circle-exclamation"></i>{emailErrorText}</span>)
            } else {
                return ""
            }
        }



        return (
        <form onSubmit={handleSubmit}>
            <SpotifyLogoSVG />
            <h1>Sign up for free to start listening.</h1>
            <label>What's your email?
                <input
                    type="text"
                    className="textInput spanInput"
                    name="email"
                    placeholder="Enter your email."
                    value={email}
                    onFocus={handleFocus("email")}
                    onBlur={handleBlur("email")}
                    onChange={(e)=> setEmail(e.target.value)}
                    required />
            </label>
            <span className="emailError"></span>
            {/* <ul>
                {errors.map(error => <li key={error}><i class="fa-solid fa-circle-exclamation"></i> {error}</li>)}
            </ul> */}
            <label>Create a password
                <input
                    type="password"
                    className="textInput spanInput"
                    name="password"
                    placeholder="Create a password."
                    value={password}
                    onFocus={handleFocus("password")}
                    onBlur={handleBlur("password")}
                    onChange={(e)=> setPassword(e.target.value)}
                    required />
            </label>
            <span className="passwordError"></span>
            <label>What should we call you?
                <input 
                    type="text"
                    className="textInput spanInput"
                    name="name"
                    placeholder="Enter a profile name."
                    value={name}
                    onFocus={handleFocus("name")}
                    onBlur={handleBlur("name")}
                    onChange={(e)=> setName(e.target.value)} 
                    required />
                {/* <br /> */}
            </label>
            <span className="book">This appears on your profile.</span>
            <label>What's your date of birth?
            <div className="birthDate">
                <label className="monthInput"><span className="book">Month</span>
                <select
                    name="month"
                    className="textInput"
                    onFocus={handleFocus("month")}
                    onBlur={handleBlur("month")}
                    onChange={(e) => setMonth(e.target.value)}
                    required >
                    <option value="" selected disabled>Month</option>
                    <option value={0}>January</option>
                    <option value={1}>February</option>
                    <option value={2}>March</option>
                    <option value={3}>April</option>
                    <option value={4}>May</option>
                    <option value={5}>June</option>
                    <option value={6}>July</option>
                    <option value={7}>August</option>
                    <option value={8}>September</option>
                    <option value={9}>October</option>
                    <option value={10}>November</option>
                    <option value={11}>December</option>
                </select>
                </label>
                <label className="dayInput"><span className="book">Day</span>
                    <input
                        type="text"
                        className="textInput"
                        name="day"
                        placeholder="DD"
                        value={day}
                        onFocus={handleFocus("day")}
                        onBlur={handleBlur("day")}
                        onChange={(e) => setDay(parseInt(e.target.value))}
                        required />
                </label>
                <label className="yearInput"><span className="book">Year</span>
                    <input
                        type="text"
                        className="textInput"
                        name="year"
                        placeholder="YYYY"
                        value={year}
                        onFocus={handleFocus("year")}
                        onBlur={handleBlur("year")}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        required />
                </label>
                </div>
            </label>
            <span className="monthError"></span>
            <span className="dayError"></span>
            <span className="yearError"></span>
            <label>What's your gender?
                <br />
                <label>
                    <input type="radio" name="gender" value="Male" />
                <span className="book radio">Male</span></label>
                <label>
                    <input type="radio" name="gender" value="Female"  />
                <span className="book radio">Female</span></label>
                <label>
                    <input type="radio" name="gender" value="Non-binary"  />
                <span className="book radio">Non-binary</span></label>
                <label>
                    <input type="radio" name="gender" value="Other"  />
                <span className="book radio">Other</span></label>
                <label>
                    <input type="radio" name="gender" value="Prefer"  />
                <span className="book radio">Prefer not to say</span></label>
            </label>
            <label>
                <input type="checkbox" />
            Share my registration data with Oughtify's content providers for marketing purposes.</label>
            <h4>By clicking on sign-up, you agree to Oughtify's <Link to="">Terms and Conditions of Use</Link>.</h4>
            <h4>To learn more about how Oughtify collects, uses, shares and protects your personal data, please see <Link to="">Oughtify's Privacy Policy</Link>.</h4>
            <button type="submit">Sign Up</button>
            <h2>Have an account? <Link to="/login">Log in</Link>.</h2>
        </form>
    )
}