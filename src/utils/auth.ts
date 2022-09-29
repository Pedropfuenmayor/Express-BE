import { User } from "../models/index";
import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const isUser = await findUser(email);
        const isValidUser = validatePassword(isUser as User, password);
        if (isUser && isValidUser) {
          done(null, isUser);
        } else {
          done(new Error("Invalid email and password combination"));
        }
      } catch (error) {
        done(error);
      }
    }
  );