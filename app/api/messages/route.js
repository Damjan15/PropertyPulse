import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/messages
export const POST = async (request) => {
    try {
        await connectDB();

        const { name, email, phone, message, property, recipient } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return new Response("User ID is required", { status: 401 });
        }

        const { user } = sessionUser;

        // Can not send message to self
        if (user.id === recipient) {
            return new Response(JSON.stringify({ message: "Can not send message to yourself "}), { status: 400 });
        }

        // Create a new message
        const newMessage = new Message({
            name,
            sender: user.id,
            recipient,
            property,
            email,
            phone,
            body: message,
        });

        // Save message
        await newMessage.save();

        return new Response(JSON.stringify({ message: 'Message Sent '}), {
            status: 200,
        })
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}

// GET /api/messages
export const GET = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 });
        }

        const { userId } = sessionUser;

        const readMessages = await Message.find({ recipient: userId, read: true  })
        .sort({ createdAt: -1}) // Sort "read" messages by date in descending order
        .populate('sender', 'username')
        .populate('property', 'name');

        const unreadMessages = await Message.find({
            recipient: userId,
            read: false,
        })
        .sort({ createdAt: -1 }) // Sort "unread" messages by date in descending order
        .populate('sender', 'username')
        .populate('property', 'name');

        const messages = [...unreadMessages, ...readMessages]; // Combine unread messages and read messages

        return new Response(JSON.stringify(messages), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}