import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { transcription, summary, duration } = await req.json();

    if (!transcription) {
      return NextResponse.json({ error: 'Transcription is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('signals')
      .insert([
        {
          transcription,
          summary,
          duration,
          status: 'uploaded'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, signal: data });
  } catch (error: any) {
    console.error('Error uploading signal:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
