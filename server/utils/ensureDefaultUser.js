import User from "../models/User.js";

const ensureDefaultUser = async () => {
  const username = process.env.DEFAULT_USER_USERNAME;
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;

  if (!username || !email || !password) {
    return;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return;
  }

  await User.create({ username, email, password });
};

export default ensureDefaultUser;