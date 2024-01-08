import { Category } from "@/app/models/category";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
    const { name } = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const category = await Category.create({ name });

    return Response.json(category);
}


export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const categories = await Category.find();

    return Response.json(categories);
}


export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, name } = await req.json();
    await Category.updateOne({ _id }, { name });
    return Response.json(true);
}


export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    //getting id from our paramter
    const url = new URL(req.url);
    // console.log(url.searchParams);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
        await Category.deleteOne({ _id });
    }
    return Response.json(true);
}