// Create token and saving in cookie
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });

    const options = {
        secure: process.env.NODE_ENV === 'localhost' ? 'auto' : true,
        httpOnly: true,
        maxAge: 7*24*60*60*1000,   //days*hoursPerDay*minutesPerHour*secondsPerMinute*1000
        sameSite: process.env.NODE_ENV === 'localhost' ? 'lax' : 'none',
   };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken