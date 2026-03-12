"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Settings,
  ArrowLeft,
  User,
  Bell,
  Lock,
  Eye,
  Database,
  Cpu,
  Save,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const [username, setUsername] = React.useState<string>("");

  React.useEffect(() => {
    // Get username from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsername(parsed.username || parsed.displayName || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Background Visuals */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-white/60 hover:text-white hover:bg-white/[0.06]"
              >
                <ArrowLeft className="w-4 h-4" /> Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-blue-400" />
              <span className="font-bold">System Settings</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-2 tracking-tight">
            Configuration <span className="text-blue-400">Panel</span>
          </h1>
          <p className="text-white/40">
            Manage your profile, AI preferences, and security settings.
          </p>
        </header>

        <div className="grid gap-8">
          {/* Profile Section */}
          <Card className="bg-white/[0.02] border-white/[0.06]">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <CardTitle>Public Profile</CardTitle>
              </div>
              <CardDescription className="text-white/40">
                How others see you on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-widest">
                    Full Name
                  </label>
                  <Input
                    placeholder="Student Name"
                    className="bg-white/[0.03] border-white/[0.08]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-widest">
                    Email Address
                  </label>
                  <Input
                    placeholder="student@campus.edu"
                    className="bg-white/[0.03] border-white/[0.08]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest">
                  Bio
                </label>
                <Input
                  placeholder="Tell us about your career goals..."
                  className="bg-white/[0.03] border-white/[0.08]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest">
                  Username
                </label>
                <Input
                  value={username}
                  readOnly
                  className="bg-white/[0.03] border-white/[0.08] text-white/60 cursor-not-allowed"
                />
                <p className="text-xs text-white/40">
                  Your username is set during onboarding and cannot be changed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Preferences */}
          <Card className="bg-white/[0.02] border-white/[0.06]">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                </div>
                <CardTitle>AI Preferences</CardTitle>
              </div>
              <CardDescription className="text-white/40">
                Customize how the AI assistant interacts with you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="space-y-1">
                  <p className="text-sm font-bold">
                    Proactive Roadmap Suggestions
                  </p>
                  <p className="text-xs text-white/40">
                    Receive AI suggestions based on your recent activity.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="space-y-1">
                  <p className="text-sm font-bold">Anonymous Transcription</p>
                  <p className="text-xs text-white/40">
                    Automatically process Silent Scream reports with high
                    privacy AI.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-white/[0.02] border-white/[0.06]">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <ShieldCheck className="w-5 h-5 text-rose-400" />
                </div>
                <CardTitle>Security & Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-white/40">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    // Enable 2FA functionality
                    alert("2FA setup would be initiated here");
                  }}
                  variant="outline"
                  className="border-white/[0.08] hover:bg-white/[0.06]"
                >
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                    <Database className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Data Management</p>
                    <p className="text-xs text-white/40">
                      Download or delete your account data.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                      // Delete account functionality
                      console.log("Account deletion initiated");
                      alert("Account deletion would be processed here");
                    }
                  }}
                  variant="ghost"
                  className="text-rose-400 hover:bg-rose-500/10"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              className="h-12 px-8 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold gap-2 shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}



