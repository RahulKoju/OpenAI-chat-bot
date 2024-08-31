import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/error.utils";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }

    const apikey = process.env.GROQ_API_KEY;
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const data = {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    };

    // await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${apikey}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //console.log("Success:", data);
    //     console.log("meesages", data.choices[0].message.content);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    
    // Fetch the AI response
    const aiResponse = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apikey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const aiData = await aiResponse.json();
    const aiMessage = aiData.choices[0].message.content;

    // Create new chat entries
    const newChats = [
      { role: "user", content: message },
      { role: "assistant", content: aiMessage },
    ];

    // Add new chats to the user's chat history
    user.chats.push(...newChats);
    await user.save();

    // Respond with the AI message
    return res.status(200).json({ message: aiMessage });
  } catch (error) {
    return next(error);
  }
};

export const handleGetAllChatsOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return next(
        errorHandler(401, "user not registererd or token malfunction")
      );
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return next(errorHandler(401, "Permission didn't match"));
    }
    res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return next(
        errorHandler(401, "user not registererd or token malfunction")
      );
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return next(errorHandler(401, "Permission didn't match"));
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};
