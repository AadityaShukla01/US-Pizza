import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfo } from "@/app/models/userInfo";
import { Order } from "@/app/models/order";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email;

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');


    if (_id) {
        const orders = await Order.findById(_id);
        return Response.json(orders);
    }



    //finding if we are admin or not
    if (userEmail) {
        const userInfo = await UserInfo.findOne({ email: userEmail });

        if (userInfo.admin) {
            const orders = await Order.find();

            return Response.json(orders);
        }
        else {
            //not an admin normal user
            const orders = await Order.find({ userEmail });

            return Response.json(orders);
        }
    }
}