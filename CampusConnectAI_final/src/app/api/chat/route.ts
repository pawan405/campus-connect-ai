import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Use gemini-2.5-flash which is available for this API key
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const systemPrompt = "You are CampusConnect AI, a helpful mentor for college students. You provide guidance on careers, skills, projects, and internships. Be concise and supportive.";

    // Gemini API expects history to start with 'user' and alternate roles
    let history: any[] = [];
    let lastRole = "";

    for (const m of messages.slice(0, -1)) {
      const role = m.role === "assistant" ? "model" : "user";
      
      // Skip if it's the same role as the previous one (Gemini requirement)
      if (role === lastRole) continue;
      
      // Skip leading model messages
      if (history.length === 0 && role !== "user") continue;

      history.push({
        role: role,
        parts: [{ text: m.content }],
      });
      lastRole = role;
    }

    // Ensure the last message in history is 'model' so that the next message can be 'user'
    // If the last message in history is 'user', we can't send another 'user' message
    // unless we merge them or remove the last one.
    if (history.length > 0 && history[history.length - 1].role === "user") {
      history.pop();
    }

    // If history is empty, we can prepend the system prompt to the current message
    const lastMessageContent = messages[messages.length - 1].content;
    const currentPrompt = history.length === 0 
      ? `${systemPrompt}\n\nUser: ${lastMessageContent}`
      : lastMessageContent;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(currentPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ role: "assistant", content: text });
  } catch (error: any) {
    console.error("Chat error:", error);
    // Log the error details for debugging
    if (error.status === 404) {
      console.error("Model not found. Please check the model name or API key permissions.");
    }
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}
