import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './SignupForm.css'
import SpotifyLogoSVG from "./SpotifyLogo";


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

    const emailInput = document.querySelector("input[name='email']")

    const passwordInput = document.querySelector("input[name='password']")

    const nameInput = document.querySelector("input[name='name']")

    const monthInput = document.querySelector("select[name='month']")

    const dayInput = document.querySelector("input[name='day']")

    const yearInput = document.querySelector("input[name='year']")



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
                    onChange={(e)=> setEmail(e.target.value)}
                    required />
            </label>
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
                    onChange={(e)=> setPassword(e.target.value)}
                    required />
            </label>
            <label>What should we call you?
                <input 
                    type="text"
                    className="textInput spanInput"
                    name="name"
                    placeholder="Enter a profile name."
                    value={name}
                    onChange={(e)=> setName(e.target.value)} 
                    required />
                <br />
            <span className="book">This appears on your profile.</span>
            </label>
            <label>What's your date of birth?
            <div className="birthDate">
                <label className="monthInput"><span className="book">Month</span>
                <select
                    name="month"
                    className="textInput"
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
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        required />
                </label>
                </div>
            </label>
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