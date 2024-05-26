import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext} from "../../providers/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
const auth = getAuth(app);

const SignUp = () => {
    const navigate = useNavigate();
    const {createUser, setLoading} = useContext(AuthContext)
    const location = useLocation();

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least 6 characters. Must have an Uppercase letter and a Lowercase letter",
            });
            return;
        }

        createUser(email, password)
        .then(result => {
            console.log("registration Successful", result.user);
                // notify();
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error.message);
                });
                result.user.displayName = name;
                swal({
                    icon: "success",
                    title: "Registration Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location?.state : "/");
                event.target.reset();
            })
            .catch(error => {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setLoading(false);
                console.log(error.message);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSignUp}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input  type="submit" value="Sign Up" className="btn btn-primary" />
                        </div>
                    </form>
                    <p className='text-center mb-5 text-red-500'><small>Already have an account? <Link to="/login">log in here</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;