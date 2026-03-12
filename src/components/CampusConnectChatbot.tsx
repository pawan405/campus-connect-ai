"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function CampusConnectChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm CampusConnect AI. How can I help you today with your career, skills, or projects?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat({ role: "user", content: userMessage }).map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

        setMessages((prev) => [...prev, { role: "bot", content: data.content }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "I'm sorry, I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4"
          >
            <Card className="w-[380px] sm:w-[420px] h-[550px] flex flex-col bg-zinc-950/95 backdrop-blur-xl border-zinc-800 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-b border-zinc-800 py-4 px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-white tracking-tight">CampusConnect AI</CardTitle>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Online Assistant</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden relative">
                <ScrollArea className="h-full px-6 py-6" ref={scrollRef}>
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex w-full gap-3",
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div
                          className={cn(
                            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border",
                            message.role === "user" 
                              ? "bg-zinc-800 border-zinc-700 text-blue-400" 
                              : "bg-blue-600 border-blue-500 text-white"
                          )}
                        >
                          {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                            message.role === "user"
                              ? "bg-zinc-800 text-zinc-100 rounded-tr-none"
                              : "bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-tl-none"
                          )}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex w-full gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-zinc-900/50 border border-zinc-800 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          AI is thinking...
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 bg-zinc-950/50 border-t border-zinc-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex w-full items-center gap-2"
                >
                  <Input
                    placeholder="Ask about careers, projects..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-blue-500/20 focus:border-blue-500/50 h-11 px-4"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-11 w-11 p-0 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-16 w-16 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center group",
            isOpen 
              ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700" 
              : "bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20"
          )}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-bounce" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
