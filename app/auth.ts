import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./lib/db";
import UserModel from "./model/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and Password are required");
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User does not exist");
        }

        if (!user.password) {
          throw new Error("User does not exist");
        }

        const isMatch = await bcrypt.compare(password as string, user.password);

        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

 callbacks: {
  async signIn({ user, account }) {
    if (account?.provider === "google") {
      await dbConnect();
      try {
        let dbUser = await UserModel.findOne({ email: user.email });
        
        if (!dbUser) {
          dbUser = await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
 
          });
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role || "user"; 
        return true;
      } catch (error) {
        console.error("Error in Google Sign-in callback:", error);
        return false; 
      }
    }
    return true;
  },


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
