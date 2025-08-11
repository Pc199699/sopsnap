'use client';
import { useState } from 'react';

export default function AppPage() {
const [url, setUrl] = useState('');
const [type, setType] = useState('operations');
const [loading, setLoading] = useState(false);
const [sop, setSop] = useState<any>(null);

async function handleGenerate() {
if (!url) return;
setLoading(true);
const vres = await fetch('/api/videos/import',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify({ url, type: url.includes('youtu') ? 'youtube' : 'loom' })
});
const { video_id } = await vres.json();
  await fetch(`/api/videos/${video_id}/transcribe`,{ method:'POST' });

const gres = await fetch('/api/sops/generate',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify({ video_id, sop_type: type })
});
const data = await gres.json();
setSop(data.sop);
setLoading(false);
}

return (
<div className="mx-auto max-w-3xl p-6">
<h1 className="text-2xl font-bold">Generate SOP</h1>
<input className="mt-4 w-full rounded border p-3" placeholder="Paste Loom/YouTube URL" value={url} onChange={e=>setUrl(e.target.value)} />
<select className="mt-2 rounded border p-2" value={type} onChange={e=>setType(e.target.value)}>
<option value="operations">Operations</option>
<option value="onboarding">Onboarding</option>
<option value="qa">QA</option>
<option value="support">Customer Support</option>
<option value="engineering">Engineering</option>
</select>
<button disabled={!url || loading} onClick={handleGenerate} className="mt-3 rounded bg-indigo-600 px-4 py-2 text-white">{loading?'Generating...':'Generate'}</button>
    {sop && (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">{sop.title || 'Generated SOP'}</h2>
      <p>{sop.goal}</p>
      <div>
        <h3 className="font-semibold">Steps</h3>
        <ol className="list-decimal pl-5 space-y-2">
          {sop.steps?.map((s:any)=> <li key={s.n}><b>{s.title}:</b> {s.detail} <i>Check:</i> {s.check}</li>)}
        </ol>
      </div>
      <div>
        <h3 className="font-semibold">Checklist</h3>
        <ul className="list-disc pl-5">
          {sop.checklist?.map((c:string,i:number)=> <li key={i}>{c}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Risks</h3>
        <ul className="list-disc pl-5">
          {sop.risks?.map((r:any,i:number)=> <li key={i}><b>{r.risk}:</b> {r.mitigation}</li>)}
        </ul>
      </div>
    </div>
  )}
</div>
);
}
