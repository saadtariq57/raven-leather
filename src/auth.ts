import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { prisma } from "../DB/db.config"
import { User } from "@/types/user.type"
import verifyOTP from "./app/verify-email/verifyOTP"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        type: {},
        username: {},
        email: {},
        password: {},
        otp: {},
      },
      authorize: async (credentials) => {
        const type = credentials.type as string;
        const username = credentials.username as string;
        const email = credentials.email as string;
        const password = credentials.password as string;
        const otp = credentials.otp as string;

        if (type === "user") {
          //* Case 1: If OTP is provided, we will verify the OTP
          if (otp) {
            const isVerified = await verifyOTP(email, otp);
            if (!isVerified) {
              throw new CredentialsSignin("Invalid or expired OTP.");
            }

            // Fetch the user data after OTP verification
            const dbUser = await prisma.user.findUnique({
              where: { email },
              select: {
                id: true,
                fullName: true,
                email: true,
                isVerified: true
              }
            });

            if (!dbUser) {
              throw new CredentialsSignin("User not found.");
            }

            // Return the user after OTP verification
            const user: User = {
              id: dbUser.id.toString(),
              name: dbUser.fullName,
              email: dbUser.email,
              isVerified: dbUser.isVerified!,
            };
            return user as User;

          }

          //* Case 2: If password is provided, we will authenticate using the password
          if (password) {
            const dbUser = await prisma.user.findUnique({
              where: { email },
              select: {
                id: true,
                fullName: true,
                email: true,
                password: true,
                isVerified: true
              }
            });

            // Check if the user exists and the password matches
            if (!dbUser) {
              throw new CredentialsSignin("Invalid email or password.");
            }

            const passwordMatched = await bcryptjs.compare(password, dbUser.password as string);
            if (!passwordMatched) {
              throw new CredentialsSignin("Invalid email or password");
            }

            const user: User = {
              id: dbUser.id.toString(),
              name: dbUser.fullName,
              email: dbUser.email,
              isVerified: dbUser.isVerified!,
            }

            return user as User
          }

          throw new CredentialsSignin("Missing credentials.");
        }

        if (type === "admin") {
          if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            // Admin successfully authenticated
            const user: User = {
              id: "",
              name: username,
              email: "",
              isVerified: true,
              role: "admin"
            }

            return user as User
          }

          throw new Error("Invalid admin credentials.");
        }

        throw new Error("Invalid credentials");
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    },
    
  )
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    signIn: async ({ user, account }) => {

      if (account?.provider === "google") {
        console.log("user signed with google: ", user);

        try {
          const { id, email, name } = user;
          let dbUser = await prisma.user.findUnique({
            where: {
              email: String(email)
            }
          })
          console.log("userExist: ", dbUser);

          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email: String(email),
                fullName: String(name),
                googleId: id,
                isVerified: true
              }
            })
            console.log("New user created: ", dbUser);
          }

          //? As google OAuth session will have googleId as userId, so we need to set it to dbUser id for consistency with Credential signIn.
          user.id = dbUser?.id.toString(); 
          
          return true;

        } catch (error: any) {
          throw new AuthError("Error while creating user.", error);
        }
      }

      if (account?.provider === "credentials") {
        console.log("user signed with credentials: ", user);
        return true
      }

      return false;
    },
    

    jwt: async ({ token, user }) => {
      if (user) {
        if (user.role === "admin") {
          // Admin JWT payload
          token.id = user.id;
          token.name = user.name;
          token.role = user.role;
        } else {
          // Normal user JWT payload
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.isVerified = user.isVerified;
        }
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token.role === "admin") {
        // Admin session payload
        session.user = {
          id: token.id as string,
          name: token.name as string,
          role: token.role as string,
          email: "",
          emailVerified: null
        };
      } else {
        // Normal user session payload
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          isVerified: token.isVerified as boolean,
          emailVerified: null
        };
      }
      return session;
    },


    
  },

})