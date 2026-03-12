"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Brain,
  Briefcase,
  Plus,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Building2,
  MapPin,
  Calendar,
  ArrowLeft,
  X,
  Send,
  Star,
  TrendingUp,
  Clock,
  Zap,
  BookOpen,
  AlertTriangle,
  Link2,
  Users,
  CheckCircle2,
  Trophy,
  Lightbulb,
  MoreVertical,
  Flag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialPosts = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineering Intern",
    location: "Bangalore",
    duration: "3 months",
    skills: ["DSA", "System Design", "Python", "Go"],
    obtained:
      "Applied through Google Step program via Referral from a senior. Two technical coding rounds focused on graphs and dynamic programming.",
    prep: "Solved ~400 LeetCode questions, primarily Medium and Hard. Focused on blind 75 list. Practiced mock interviews on Pramp.",
    mistakes:
      "Initially ignored system design thinking it wouldn't be asked for interns. Also, I didn't communicate my thought process clearly in the first mock interviews.",
    resources: [
      "LeetCode",
      "NeetCode.io",
      "Cracking the Coding Interview",
      "Grokking System Design",
    ],
    advice:
      "Focus on fundamentals. Don't just memorize solutions, understand the patterns. Be vocal during the interview.",
    rating: 5,
    likes: 234,
    comments: 45,
    author: "Arjun Mehta",
    year: "3rd Year CSE",
    date: "2 days ago",
    saved: false,
    liked: false,
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Product Management Intern",
    location: "Hyderabad",
    duration: "2 months",
    skills: ["Product Thinking", "SQL", "Analytics", "Communication"],
    obtained:
      "Shortlisted via On-Campus placement drive. Had 1 Resume screening, 1 Group Discussion, and 2 Case Study rounds.",
    prep: "Read 'Decode and Conquer'. Practiced circle frameworks for product design. Analyzed 10 common apps for improvements.",
    mistakes:
      "Didn't ask enough clarifying questions during the case study round. Almost solved for the wrong user persona.",
    resources: [
      "Product Management Exercises",
      "Stratechery",
      "Exponent YouTube Channel",
    ],
    advice:
      "Think about the 'Why' before the 'What'. Empathy for the user is the most important skill for a PM.",
    rating: 4,
    likes: 189,
    comments: 32,
    author: "Sanya Gupta",
    year: "Final Year MBA",
    date: "5 days ago",
    saved: true,
    liked: true,
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE Intern",
    location: "Bangalore",
    duration: "6 months",
    skills: ["Java", "AWS", "SQL", "OOD"],
    obtained:
      "Off-campus application via Amazon Jobs portal. Received an OA (Online Assessment) link after 2 weeks.",
    prep: "Deep dived into Amazon Leadership Principles (LP). Practiced STAR method for behavioral questions. Brushed up on Java collections.",
    mistakes:
      "Underestimated the importance of Leadership Principles. They are as important as coding at Amazon.",
    resources: [
      "Amazon LP Documentation",
      "LeetCode (Amazon Tagged)",
      "GeeksforGeeks",
    ],
    advice:
      "Write clean, modular code. Even in a 45 min interview, code quality matters. Know your LPs by heart.",
    rating: 5,
    likes: 312,
    comments: 56,
    author: "Rohan Das",
    year: "3rd Year IT",
    date: "1 week ago",
    saved: false,
    liked: false,
  },
];

export default function InternshipFeedPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSkill, setFilterSkill] = useState("all");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; text: string }[]
  >([]);
  const [newPost, setNewPost] = useState({
    company: "",
    role: "",
    location: "",
    duration: "",
    skills: "",
    obtained: "",
    prep: "",
    mistakes: "",
    resources: "",
    advice: "",
    rating: 5,
    author: "",
    year: "",
  });

  const filteredPosts = posts.filter((post) => {
    const searchStr =
      `${post.company} ${post.role} ${post.obtained} ${post.prep} ${post.mistakes} ${post.advice}`.toLowerCase();
    const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterSkill === "all" ||
      post.skills.some((s) =>
        s.toLowerCase().includes(filterSkill.toLowerCase())
      );
    return matchesSearch && matchesFilter;
  });

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          const isLiking = !post.liked;
          if (isLiking)
            toast.success(`Liked ${post.company}'s experience!`, {
              icon: <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />,
            });
          return {
            ...post,
            liked: isLiking,
            likes: isLiking ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handleSave = (id: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          const isSaving = !post.saved;
          toast.success(
            isSaving
              ? "Experience saved to your collection"
              : "Experience removed from collection",
            {
              icon: (
                <Bookmark
                  className={`w-4 h-4 ${isSaving ? "fill-amber-500 text-amber-500" : ""}`}
                />
              ),
            }
          );
          return { ...post, saved: isSaving };
        }
        return post;
      })
    );
  };

  const handleShare = (post: any) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(`${url}?post=${post.id}`);
    toast.success("Link copied to clipboard!", {
      description: `Share ${post.author}'s ${post.company} journey with others.`,
    });
  };

  const handleMessage = (author: string) => {
    setChatRecipient(author);
    setShowChatModal(true);
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          sender: author,
          text: `Hey! I saw you looking at my experience at ${posts.find((p) => p.author === author)?.company}. Happy to help with any questions!`,
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: "You", text: chatMessage }]);
    setChatMessage("");
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: chatRecipient || "System",
          text: "That's a great question! I'll get back to you with more details shortly.",
        },
      ]);
    }, 1000);
  };

  const handleReport = (company: string) => {
    toast.error("Report submitted", {
      description: `Thank you for helping us keep ${company} reviews authentic.`,
    });
  };

  const handleSubmitPost = () => {
    const skills = newPost.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    const resources = newPost.resources
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);

    const post = {
      id: posts.length + 1,
      ...newPost,
      skills,
      resources,
      likes: 0,
      comments: 0,
      date: "Just now",
      saved: false,
      liked: false,
    };

    setPosts([post, ...posts]);
    setShowNewPostModal(false);
    setNewPost({
      company: "",
      role: "",
      location: "",
      duration: "",
      skills: "",
      obtained: "",
      prep: "",
      mistakes: "",
      resources: "",
      advice: "",
      rating: 5,
      author: "",
      year: "",
    });

    toast.success("Experience shared successfully!", {
      description: "Your story is now live and helping other students.",
      action: {
        label: "View",
        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    });
  };

  const allSkills = [...new Set(posts.flatMap((p) => p.skills))];

  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[100px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white/60 hover:text-white hover:bg-white/[0.06]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </Link>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent hidden sm:block">
                  CampusConnect AI
                </span>
              </Link>
            </div>
            <Button
              onClick={() => setShowNewPostModal(true)}
              className="bg-linear-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white gap-2 shadow-lg shadow-violet-500/20"
            >
              <Plus className="w-4 h-4" /> Share Story
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-4 border-violet-500/30 text-violet-400 bg-violet-500/10"
            >
              <Trophy className="w-3 h-3 mr-1" /> Peer Learning Network
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Internship{" "}
              <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </h1>
            <p className="text-white/50 text-lg">
              Unlock the secrets of successful internships. Actionable insights
              from students who have been in your shoes.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.02] p-2 rounded-2xl border border-white/[0.06]">
            <div className="text-right px-4 border-r border-white/[0.06]">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                Total Stories
              </p>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
            </div>
            <div className="px-4">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                Helpfulness
              </p>
              <p className="text-2xl font-bold text-emerald-400">98%</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <Card className="bg-white/[0.02] border border-white/[0.06] shadow-sm overflow-hidden">
              <CardHeader className="bg-white/[0.02] pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-white">
                  <Filter className="w-4 h-4 text-violet-400" /> Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <Input
                      placeholder="Company, Role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-white/[0.02] border-white/[0.06] text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Top Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={filterSkill === "all" ? "default" : "outline"}
                      className={`cursor-pointer ${filterSkill === "all" ? "bg-violet-500 text-white" : "border-white/[0.06] text-white/60 hover:bg-white/[0.04]"}`}
                      onClick={() => setFilterSkill("all")}
                    >
                      All
                    </Badge>
                    {allSkills.slice(0, 8).map((skill) => (
                      <Badge
                        key={skill}
                        variant={
                          filterSkill === skill.toLowerCase()
                            ? "default"
                            : "outline"
                        }
                        className={`cursor-pointer ${filterSkill === skill.toLowerCase() ? "bg-violet-500 text-white" : "border-white/[0.06] text-white/60 hover:bg-white/[0.04]"}`}
                        onClick={() => setFilterSkill(skill.toLowerCase())}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/30 overflow-hidden shadow-xl">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Trophy className="w-24 h-24 rotate-12" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Contribute Your Success
                </h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Your journey could be the roadmap for someone else. Share your
                  mistakes and resources to help juniors grow.
                </p>
                <Button
                  onClick={() => setShowNewPostModal(true)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10"
                >
                  Write Post
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="bg-white/[0.02] border border-white/[0.06] shadow-sm hover:border-white/[0.1] transition-all group">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-black text-2xl group-hover:scale-110 transition-transform">
                              {post.company.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white text-xl">
                                  {post.company}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold px-1.5 py-0"
                                >
                                  Verified
                                </Badge>
                              </div>
                              <p className="text-white/60 font-medium flex items-center gap-2">
                                {post.role}
                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                <span className="text-white/40 text-sm font-normal">
                                  {post.duration}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < post.rating ? "text-amber-400 fill-amber-400" : "text-white/10"}`}
                                  />
                                ))}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white/30 hover:text-white hover:bg-white/10"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-[#12121a] border-white/10 text-white"
                                >
                                  <DropdownMenuItem
                                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                                    onClick={() => handleShare(post)}
                                  >
                                    <Share2 className="w-4 h-4 mr-2" /> Share
                                    Post
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                                    onClick={() => handleSave(post.id)}
                                  >
                                    <Bookmark className="w-4 h-4 mr-2" />{" "}
                                    {post.saved ? "Remove Save" : "Save Story"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="focus:bg-white/10 text-rose-400 focus:text-rose-400 cursor-pointer"
                                    onClick={() => handleReport(post.company)}
                                  >
                                    <Flag className="w-4 h-4 mr-2" /> Report
                                    Post
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-xs text-white/40 font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {post.location}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <section>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                <Zap className="w-4 h-4 text-amber-400" /> How I
                                Got It
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
                                {post.obtained}
                              </p>
                            </section>

                            <section>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                <BookOpen className="w-4 h-4 text-cyan-400" />{" "}
                                Preparation Strategy
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed">
                                {post.prep}
                              </p>
                            </section>

                            <section>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                <AlertTriangle className="w-4 h-4 text-rose-400" />{" "}
                                Mistakes to Avoid
                              </h4>
                              <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                                <p className="text-sm text-rose-300 leading-relaxed">
                                  {post.mistakes}
                                </p>
                              </div>
                            </section>
                          </div>

                          <div className="space-y-6">
                            <section>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />{" "}
                                Skills Required
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {post.skills.map((skill, j) => (
                                  <Badge
                                    key={j}
                                    variant="secondary"
                                    className="bg-white/[0.04] text-white/60 font-medium border border-white/[0.06]"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </section>

                            <section>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                <Link2 className="w-4 h-4 text-indigo-400" />{" "}
                                Top Resources
                              </h4>
                              <div className="space-y-2">
                                {post.resources.map((res, j) => (
                                  <div
                                    key={j}
                                    className="flex items-center gap-2 text-sm text-violet-400 bg-violet-500/10 px-3 py-1.5 rounded-lg border border-violet-500/20"
                                  >
                                    <Send className="w-3 h-3" /> {res}
                                  </div>
                                ))}
                              </div>
                            </section>

                            <section>
                              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
                                <Lightbulb className="w-4 h-4 text-amber-400" />{" "}
                                Advice for Juniors
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
                                &quot;{post.advice}&quot;
                              </p>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/[0.02] border-t border-white/[0.06]">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                              post.liked
                                ? "bg-rose-500/15 text-rose-400"
                                : "text-white/40 hover:bg-white/[0.04]"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`}
                            />
                            <span className="text-xs font-bold">
                              {post.likes}
                            </span>
                          </button>
                          <button
                            onClick={() => handleMessage(post.author)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/40 hover:bg-white/[0.04] transition-all"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-bold">
                              {post.comments}
                            </span>
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleMessage(post.author)}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                          >
                            <div className="text-right hidden sm:block">
                              <p className="text-xs font-bold text-white">
                                {post.author}
                              </p>
                              <p className="text-[10px] text-white/40">
                                {post.year}
                              </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-[10px] font-bold">
                              {post.author.charAt(0)}
                            </div>
                          </button>
                          <div className="flex items-center gap-2 border-l border-white/[0.06] pl-4">
                            <button
                              onClick={() => handleSave(post.id)}
                              className={`transition-colors ${
                                post.saved
                                  ? "text-amber-400"
                                  : "text-white/30 hover:text-amber-400"
                              }`}
                            >
                              <Bookmark
                                className={`w-5 h-5 ${post.saved ? "fill-current" : ""}`}
                              />
                            </button>
                            <button
                              onClick={() => handleShare(post)}
                              className="text-white/30 hover:text-violet-400 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <Card className="bg-white/[0.02] border border-white/[0.06] shadow-sm">
                <CardContent className="p-20 text-center">
                  <div className="w-20 h-20 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No matching stories
                  </h3>
                  <p className="text-white/40 max-w-sm mx-auto">
                    We couldn&apos;t find any internship stories matching your
                    filters. Try searching for different skills or companies.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterSkill("all");
                    }}
                    className="mt-4 text-violet-400"
                  >
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[95vh] overflow-y-auto"
            >
              <Card className="bg-[#0c0c12] border border-white/[0.06] shadow-2xl relative">
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/[0.06] transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>

                <CardHeader className="border-b border-white/[0.06] p-8">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black text-white">
                        Share Your Experience
                      </CardTitle>
                      <p className="text-white/40 text-sm">
                        Help thousands of students by sharing your roadmap to
                        success.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/[0.02] p-1 rounded-xl border border-white/[0.06]">
                      <TabsTrigger
                        value="basic"
                        className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white text-white/60"
                      >
                        Basic Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="experience"
                        className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white text-white/60"
                      >
                        Actionable Insights
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/70">
                            Company Name *
                          </label>
                          <Input
                            placeholder="e.g. Google"
                            className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                            value={newPost.company}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                company: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/70">
                            Role *
                          </label>
                          <Input
                            placeholder="e.g. SDE Intern"
                            className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                            value={newPost.role}
                            onChange={(e) =>
                              setNewPost({ ...newPost, role: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/70">
                            Location
                          </label>
                          <Input
                            placeholder="e.g. Remote / Bangalore"
                            className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                            value={newPost.location}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/70">
                            Duration
                          </label>
                          <Input
                            placeholder="e.g. 2 months"
                            className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                            value={newPost.duration}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                duration: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/70">
                            Your Name *
                          </label>
                          <Input
                            placeholder="e.g. John Doe"
                            className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                            value={newPost.author}
                            onChange={(e) =>
                              setNewPost({ ...newPost, author: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/70">
                            Year of Study *
                          </label>
                          <Input
                            placeholder="e.g. 3rd Year B.Tech"
                            className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                            value={newPost.year}
                            onChange={(e) =>
                              setNewPost({ ...newPost, year: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/70">
                          Skills (Comma separated) *
                        </label>
                        <Input
                          placeholder="Python, Java, DSA..."
                          className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                          value={newPost.skills}
                          onChange={(e) =>
                            setNewPost({ ...newPost, skills: e.target.value })
                          }
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold flex items-center gap-2 text-white/70">
                            <Zap className="w-4 h-4 text-amber-400" /> How did
                            you get it? *
                          </label>
                          <Textarea
                            placeholder="Referral, On-campus, LinkedIn..."
                            className="bg-white/[0.02] border-white/[0.06] min-h-[100px] resize-none text-white placeholder:text-white/30"
                            value={newPost.obtained}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                obtained: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold flex items-center gap-2 text-white/70">
                            <BookOpen className="w-4 h-4 text-cyan-400" />{" "}
                            Preparation Steps *
                          </label>
                          <Textarea
                            placeholder="What did you study? How long?"
                            className="bg-white/[0.02] border-white/[0.06] min-h-[100px] resize-none text-white placeholder:text-white/30"
                            value={newPost.prep}
                            onChange={(e) =>
                              setNewPost({ ...newPost, prep: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold flex items-center gap-2 text-white/70">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />{" "}
                            Mistakes to avoid *
                          </label>
                          <Textarea
                            placeholder="What would you do differently?"
                            className="bg-white/[0.02] border-white/[0.06] min-h-[100px] resize-none text-white placeholder:text-white/30"
                            value={newPost.mistakes}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                mistakes: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold flex items-center gap-2 text-white/70">
                            <Lightbulb className="w-4 h-4 text-emerald-400" />{" "}
                            Advice for Juniors *
                          </label>
                          <Textarea
                            placeholder="Pro-tips for success..."
                            className="bg-white/[0.02] border-white/[0.06] min-h-[100px] resize-none text-white placeholder:text-white/30"
                            value={newPost.advice}
                            onChange={(e) =>
                              setNewPost({ ...newPost, advice: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold flex items-center gap-2 text-white/70">
                          <Link2 className="w-4 h-4 text-indigo-400" />{" "}
                          Resources Used (Comma separated)
                        </label>
                        <Input
                          placeholder="LeetCode, Coursera, YouTube..."
                          className="bg-white/[0.02] border-white/[0.06] h-12 text-white placeholder:text-white/30"
                          value={newPost.resources}
                          onChange={(e) =>
                            setNewPost({
                              ...newPost,
                              resources: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-white/70">
                            Overall Rating
                          </label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={num}
                                onClick={() =>
                                  setNewPost({ ...newPost, rating: num })
                                }
                              >
                                <Star
                                  className={`w-6 h-6 ${num <= newPost.rating ? "text-amber-400 fill-amber-400" : "text-white/10"}`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={handleSubmitPost}
                          disabled={
                            !newPost.company ||
                            !newPost.obtained ||
                            !newPost.prep ||
                            !newPost.author
                          }
                          className="bg-linear-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-violet-500/20"
                        >
                          Submit Experience
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center p-4"
            onClick={() => setShowChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-[600px] flex flex-col"
            >
              <Card className="bg-[#0c0c12] border border-white/[0.06] shadow-2xl flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">
                      {chatRecipient?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        {chatRecipient}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] text-white/40 uppercase font-black">
                          Online
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white/40" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.sender === "You"
                            ? "bg-violet-500 text-white rounded-tr-none"
                            : "bg-white/[0.04] text-white/80 border border-white/[0.06] rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/[0.06] bg-white/[0.02]">
                  <div className="relative">
                    <Input
                      placeholder="Type a message..."
                      className="bg-black/50 border-white/[0.1] h-12 pr-12 text-white placeholder:text-white/20 rounded-xl"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <button
                      onClick={handleSendMessage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



