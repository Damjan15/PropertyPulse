import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/bookmarks
export const GET = async (request) => {
  try {
    await connectDB();

    const { userId } = await getSessionUser();

    // Find the user by their session ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Retrieve the user's bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
