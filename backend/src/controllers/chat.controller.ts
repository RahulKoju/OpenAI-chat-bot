import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/error.utils";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";

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

    // Convert user's chat history to the correct format
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionMessageParam[];

    // Add the new user message to the chat history
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Initialize the OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPEN_AI_SECRET,
      organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });

    // Generate the chat completion from OpenAI
    const chatResponse = await client.chat.completions.create({
      model: "gpt-4",
      messages: chats,
    });

    // Handle the AI's response
    const aiMessage = chatResponse.choices[0].message;
    if (aiMessage) {
      user.chats.push(aiMessage);
      await user.save();

      // Return the AI's message to the client
      return res.status(200).json({ message: aiMessage });
    } else {
      return next(errorHandler(500, "Failed to generate AI response"));
    }
  } catch (error) {
    return next(error);
  }
};
