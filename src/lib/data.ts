import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type SilentReport = {
  uid: string;
  transcription: string;
  summary: string;
  duration: number;
  createdAt: any;
  status: "uploaded" | "submitted";
};

export async function createSilentReport(
  data: Omit<SilentReport, "createdAt" | "status">,
) {
  if (!db) throw new Error("Firebase not configured");
  const ref = await addDoc(collection(db, "reports"), {
    ...data,
    createdAt: serverTimestamp(),
    status: "uploaded",
  });
  return ref.id;
}

export async function submitSilentReport(reportId: string) {
  if (!db) throw new Error("Firebase not configured");
  await setDoc(
    doc(db, "reports", reportId),
    { status: "submitted" },
    { merge: true },
  );
}

export async function listMyReports(uid: string) {
  if (!db) throw new Error("Firebase not configured");
  const q = query(
    collection(db, "reports"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(20),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export type Internship = {
  company: string;
  role: string;
  location: string;
  duration: string;
  skills: string[];
  obtained?: string;
  prep?: string;
  mistakes?: string;
  resources?: string[];
  advice?: string;
  rating?: number;
  author?: string;
  year?: string;
  uid?: string;
  createdAt: any;
};

export async function createInternship(data: Omit<Internship, "createdAt">) {
  if (!db) throw new Error("Firebase not configured");
  const ref = await addDoc(collection(db, "internships"), {
    ...data,
    createdAt: serverTimestamp(),
    likes: 0,
    comments: 0,
  });
  return ref.id;
}

export async function listInternships() {
  if (!db) return [];
  const q = query(
    collection(db, "internships"),
    orderBy("createdAt", "desc"),
    limit(50),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
}

export type Hackathon = {
  name: string;
  status: string;
  date: string;
  location: string;
  prize?: string;
  createdAt: any;
};
export async function listHackathons() {
  if (!db) return [];
  const q = query(
    collection(db, "hackathons"),
    orderBy("createdAt", "desc"),
    limit(50),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
}
