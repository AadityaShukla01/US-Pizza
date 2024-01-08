import { User } from "@/app/models/user";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    //grabbibg the data we are sending to our api
    let { email, password } = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({ email });

    //hashing 
    let salt = bcrypt.genSaltSync(10);

    let hash = bcrypt.hashSync(password, salt);

    password = hash;
    const newUser = await User.create({ email, password });

    return Response.json(newUser);
}
