import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "@/app/models/user";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { UserInfo } from "@/app/models/userInfo";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ email });
                const passwordOk = user && bcrypt.compare(password, user.password);

                console.log(password)
                if (passwordOk) {
                    return user;
                }

                return null
            }
        })
    ],
};

// for protecting our routes
export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await UserInfo.findOne({ email: userEmail });
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }