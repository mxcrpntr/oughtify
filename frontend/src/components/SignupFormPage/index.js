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
    const setMonth = (month) => {
        const date = birthDate;
        date.setMonth(month);
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


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
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
            This appears on your profile.
            </label>
            <label>What's your date of birth?
            <div className="birthDate">
                <label className="monthInput">Month
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
                <label className="dayInput">Day
                    <input
                        type="text"
                        className="textInput"
                        name="day"
                        placeholder="DD"
                        value={day}
                        onChange={(e) => setDay(parseInt(e.target.value))}
                        required />
                </label>
                <label className="yearInput">Year
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
                <label>
                    <input type="radio" name="gender" value="Male" />
                Male</label>
                <label>
                    <input type="radio" name="gender" value="Female"  />
                Female</label>
                <label>
                    <input type="radio" name="gender" value="Non-binary"  />
                Non-binary</label>
                <label>
                    <input type="radio" name="gender" value="Other"  />
                Other</label>
                <label>
                    <input type="radio" name="gender" value="Prefer"  />
                Prefer not to say</label>
            </label>
            <label>
                <input type="checkbox" />
            Share my registration data with Oughtify's content providers for marketing purposes.</label>
            <h4>By clicking on sign-up, you agree to <Link to="">Oughtify's Terms and Conditions of Use</Link>.</h4>
            <h4>To learn more about how Oughtify collects, uses, shares and protects your personal data, please see <Link to="">Oughtify's Privacy Policy</Link>.</h4>
            <button type="submit">Sign Up</button>
            <h2>Have an account? <Link to="/login">Log in</Link>.</h2>
        </form>
    )
}