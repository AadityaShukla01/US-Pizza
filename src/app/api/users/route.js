import { User } from "@/app/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";

export async function GET(req) {
    //connect to database
    mongoose.connect(process.env.MONGO_URL);
    if (await isAdmin()) {

        const users = await User.find();
        return Response.json(users);
    }
    else return Response.json([]);
}