import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./lib/db";
import UserModel from "./model/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, request) {
        await dbConnect();
        console.log(credentials.email)
        const email = credentials.email;
        const password = credentials.password as string;
        const user = await UserModel.findOne({ email });
        console.log(user)
        if (!user) {
          throw new Error("user not exist");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        ((token.id = user.id),
          (token.name = user.name),
          (token.email = user.email));
        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});
