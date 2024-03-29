import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    // console.log(data);

    if (await isAdmin()) {
        const menuItem = await MenuItem.create(data);
        return Response.json(menuItem);
    }
    else return Response.json({});
}


export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, ...data } = await req.json();
    if (await isAdmin()) {
        await MenuItem.findByIdAndUpdate(_id, data);
    }

    return Response.json(true);
}


export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const menuItem = await MenuItem.find();
    return Response.json(menuItem)
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    //getting id from our paramter
    const url = new URL(req.url);
    // console.log(url.searchParams);
    const _id = url.searchParams.get('_id');


    if (await isAdmin()) {
        await MenuItem.deleteOne({ _id });
    }
    return Response.json(true);
}