import { CampusConnectChatbot } from "@/components/CampusConnectChatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            CampusConnect AI
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your AI-powered platform for career guidance, skill development, and connecting with opportunities in tech.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Career Guidance</h3>
            <p className="text-slate-400">Get personalized career advice and skill recommendations.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Hackathon Hub</h3>
            <p className="text-slate-400">Discover and participate in exciting coding challenges.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Internship Feed</h3>
            <p className="text-slate-400">Find internship opportunities tailored to your skills.</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <a href="/login" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            Get Started
          </a>
          <a href="/dashboard" className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}



