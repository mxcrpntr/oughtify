import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './SignupForm.css'
import SpotifyLogoSVG from "./SpotifyLogo";
import signUpErrors, { validDay, validYear } from "./signUpErrors";


export default function SignupFormPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const date = birthDate;
        if (month) {
            date.setMonth(month);
            if (validYear(year)) {
                date.setFullYear(year);
                if (validDay(day)) {
                    date.setDate(day);
                }
            }
            setBirthDate(date);
        }
    }, [day,month,year])

    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) {
        return (<Redirect to="/" />);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fields = ["email","password","name","month","day","year"];
        const values = [email,password,name,month,day,year];
        const newErrors = {...errors};
        for (let i = 0; i < fields.length; i++) {
            newErrors[fields[i]] = signUpErrors(fields[i])(values[i])
        }
        setErrors(newErrors);
        if (!Object.values(errors).some(ele => ele)) {
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
        }
    };

    // document.querySelector("body").className = "signUpBody"
    
    const handleFocus = (inputType) => (e) => {
        e.preventDefault();
        const alreadyErrors = errors[inputType];
        if (alreadyErrors) {
            const newErrors = {...errors};
            newErrors[inputType] = signUpErrors(inputType)(e.target.value);
            setErrors(newErrors);
        }
    }

    const handleBlur = (inputType) => (e) => {
        e.preventDefault();
        const newErrors = {...errors};
        newErrors[inputType] = signUpErrors(inputType)(e.target.value);
        setErrors(newErrors);
    }

        return (
        <form onSubmit={handleSubmit} noValidate>
            <SpotifyLogoSVG />
            <h1>Sign up for free to start listening.</h1>
            <label>What's your email?
                <input
                    type="text"
                    className={`textInput spanInput ${errors["email"] ? "red" : ""} `}
                    name="email"
                    placeholder="Enter your email."
                    value={email}
                    onFocus={handleFocus("email")}
                    onBlur={handleBlur("email")}
                    onChange={(e)=> setEmail(e.target.value)}
                    required />
            </label>
            { errors["email"] && 
                (
                    <span className="emailError"><i className="fa-solid fa-circle-exclamation"></i>{" " + errors["email"]}</span>
                )
            }
            <label>Create a password
                <input
                    type="password"
                    className={`textInput spanInput ${errors["password"] ? "red" : ""} `}
                    name="password"
                    placeholder="Create a password."
                    value={password}
                    onFocus={handleFocus("password")}
                    onBlur={handleBlur("password")}
                    onChange={(e)=> setPassword(e.target.value)}
                    required />
            </label>
            { errors["password"] && 
                (
                    <span className="passwordError"><i className="fa-solid fa-circle-exclamation"></i>{" " + errors["password"]}</span>
                )
            }
            <label>What should we call you?
                <input 
                    type="text"
                    className={`textInput spanInput ${errors["name"] ? "red" : ""} `}
                    name="name"
                    placeholder="Enter a profile name."
                    value={name}
                    onFocus={handleFocus("name")}
                    onBlur={handleBlur("name")}
                    onChange={(e)=> setName(e.target.value)} 
                    required />
            </label>
            { errors["name"] ? 
                (
                    <span className="nameError"><i className="fa-solid fa-circle-exclamation"></i>{" " + errors["name"]}</span>
                ) : (
                    <span className="book">This appears on your profile.</span>
                )
            }
            <label>What's your date of birth?
            <div className="birthDate">
                <label className="monthInput"><span className="book">Month</span>
                <select
                    name="month"
                    className={`textInput ${errors["month"] ? "red" : ""} `}
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
                        className={`textInput ${errors["day"] ? "red" : ""} `}
                        name="day"
                        placeholder="DD"
                        value={day}
                        onFocus={handleFocus("day")}
                        onBlur={handleBlur("day")}
                        onChange={(e) => {
                           setDay(e.target.value.slice(0,2));
                        }}
                        required />
                </label>
                <label className="yearInput"><span className="book">Year</span>
                    <input
                        type="text"
                        className={`textInput ${errors["year"] ? "red" : ""} `}
                        name="year"
                        placeholder="YYYY"
                        value={year}
                        onFocus={handleFocus("year")}
                        onBlur={handleBlur("year")}
                        onChange={(e) => {
                            setYear(e.target.value.slice(0,4));
                        }}
                        required />
                </label>
                </div>
            </label>
            
            { errors["month"] && 
                (
                    <span className="monthError"><i className="fa-solid fa-circle-exclamation"></i>{" " + errors["month"]}</span>
                )
            }

            { errors["day"] && 
                (
                    <span className="dayError"><i className="fa-solid fa-circle-exclamation"></i>{" " + errors["day"]}</span>
                )
            }

            { errors["year"] && 
                (
                    <span className="yearError"><i className="fa-solid fa-circle-exclamation"></i>{" " + errors["year"]}</span>
                )
            }       
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