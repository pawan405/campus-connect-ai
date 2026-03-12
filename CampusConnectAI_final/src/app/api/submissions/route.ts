import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { signalId, authorityName } = await req.json();

    if (!signalId) {
      return NextResponse.json({ error: 'Signal ID is required' }, { status: 400 });
    }

    // Insert into submissions table
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .insert([
        {
          signal_id: signalId,
          authority_name: authorityName || 'Campus Security',
          status: 'submitted'
        }
      ])
      .select()
      .single();

    if (submissionError) throw submissionError;

    // Update signal status
    const { error: updateError } = await supabase
      .from('signals')
      .update({ status: 'submitted_to_authorities' })
      .match({ id: signalId });

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    console.error('Error submitting to authorities:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
