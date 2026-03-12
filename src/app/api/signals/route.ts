import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { transcription, summary, duration } = await req.json();

    if (!transcription) {
      return NextResponse.json({ error: 'Transcription is required' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'signals'), {
      transcription,
      summary,
      duration,
      status: 'uploaded',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      signal: {
        id: docRef.id,
        transcription,
        summary,
        duration,
        status: 'uploaded'
      }
    });
  } catch (error: any) {
    console.error('Error uploading signal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
