import jwt from "jsonwebtoken";

export const sendCookie = (resp, user, message, statusCode = 200) => {
  const token = jwt.sign({user}, process.env.JWT_KEY);
  return resp
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    .json(user);
};
