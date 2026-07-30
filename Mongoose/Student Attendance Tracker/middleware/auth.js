const auth = async (req, res) => {
    const token = jwt.sign(
        {
            id: result.id,
            email: result.email,
        }, "!@#$%&()", { expiresIn: "1h" }
    );
    res.cookie("teacher", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 1,
    })
}