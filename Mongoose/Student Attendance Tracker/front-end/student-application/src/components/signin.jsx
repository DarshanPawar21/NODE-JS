const Signin = () => {
    return (
        <div>
            <div className="card" style={{ width: '30rem',height: '25rem' }}>
                <div className="card-body rounded-5">
                    <h5 className="card-title text-center fs-4">Sign In</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary text-center fs-5">Welcome Teacher !</h6>
                <hr />
                <div>
                    <div className="form-group d-flex flex-column gap-3 mt-4">
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" id="email" className="form-control" />
                        <label htmlFor="password">Password :</label>
                        <input type="password" name="password" id="password" className="form-control" />
                    </div>
                    <a href="#" className="btn btn-primary text-center w-100 mt-4">Sign In</a>
                </div>
                
                    {/* <a href="#" className="card-link">Another link</a> */}
                </div>
            </div>
        </div>
    );
};

export default Signin;