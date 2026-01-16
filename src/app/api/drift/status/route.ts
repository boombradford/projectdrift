import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();
    if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 });
    }

    const { data: stateData, error: stateError } = await supabase
      .from('drift_state')
      .select('latest_snapshot_id, previous_snapshot_id')
      .eq('domain', domain)
      .maybeSingle();

    if (stateError) {
      throw new Error(stateError.message);
    }

    let latestTimestamp: string | undefined;
    let previousTimestamp: string | undefined;

    if (stateData?.latest_snapshot_id) {
      const { data: latestData, error: latestError } = await supabase
        .from('drift_snapshots')
        .select('timestamp')
        .eq('id', stateData.latest_snapshot_id)
        .maybeSingle();
      if (latestError) throw new Error(latestError.message);
      latestTimestamp = latestData?.timestamp;
    }

    if (stateData?.previous_snapshot_id) {
      const { data: previousData, error: previousError } = await supabase
        .from('drift_snapshots')
        .select('timestamp')
        .eq('id', stateData.previous_snapshot_id)
        .maybeSingle();
      if (previousError) throw new Error(previousError.message);
      previousTimestamp = previousData?.timestamp;
    }

    return NextResponse.json({
      domain,
      latest: latestTimestamp,
      previous: previousTimestamp
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
