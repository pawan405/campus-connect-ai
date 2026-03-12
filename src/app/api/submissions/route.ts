import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { signalId, authorityName } = await req.json();

    if (!signalId) {
      return NextResponse.json({ error: 'Signal ID is required' }, { status: 400 });
    }

    // Insert into submissions collection
    const submissionRef = await addDoc(collection(db, 'submissions'), {
      signalId,
      authorityName: authorityName || 'Campus Security',
      status: 'submitted',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Update signal status
    const signalRef = doc(db, 'signals', signalId);
    await updateDoc(signalRef, {
      status: 'submitted_to_authorities',
      updatedAt: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      submission: {
        id: submissionRef.id,
        signalId,
        authorityName: authorityName || 'Campus Security',
        status: 'submitted'
      }
    });
  } catch (error: any) {
    console.error('Error submitting to authorities:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
