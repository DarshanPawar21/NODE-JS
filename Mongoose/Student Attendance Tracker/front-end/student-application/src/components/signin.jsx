import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setteacherdata } from "../slices/slices.js";
const Signin = () => {
    const dispatch = useDispatch();
    const teacherlogin = useSelector((state) => state.getteacherdata.value);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlesignin = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const logindata = { email, password };
        dispatch(setteacherdata(logindata));
    }
    return (
        <div>
            <div className="card" style={{ width: '30rem', height: '25rem' }}>
                <div className="card-body rounded-5">
                    <h5 className="card-title text-center fs-4">Sign In</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary text-center fs-5">Welcome Teacher !</h6>
                    <hr />
                    <div>
                        <div className="form-group d-flex flex-column gap-3 mt-4">
                            <label htmlFor="email">Email :</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="form-control" />
                            <label htmlFor="password">Password :</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" />
                        </div>
                        <button type="button" onClick={handlesignin} className="btn btn-primary text-center w-100 mt-4">Sign In</button>
                    </div>

                    {/* <a href="#" className="card-link">Another link</a> */}
                </div>
            </div>
        </div>
    );
};

export default Signin;