import Link from 'next/link';

export default function Home() {
return (
<main className="mx-auto max-w-5xl p-6">
<header className="flex items-center justify-between">
<h1 className="text-2xl font-bold">SOPSnap</h1>
<nav className="space-x-4">
<Link href="#pricing">Pricing</Link>
<Link href="/app">Try Free</Link>
</nav>
</header>

text
  <section className="mt-16 text-center">
    <h2 className="text-4xl font-bold">Turn any Loom/YouTube into a complete SOP in seconds</h2>
    <p className="mt-4 text-lg">Steps, checklist, risks, RACI, and a quick quiz — export to Notion, Docs, or PDF.</p>
    <div className="mt-6 space-x-3">
      <Link className="rounded bg-indigo-600 px-5 py-3 text-white" href="/app">Try free — no signup</Link>
      <a className="rounded border px-5 py-3" href="#demo">Watch 30s demo</a>
    </div>
  </section>

  <section id="pricing" className="mt-24">
    <h3 className="text-2xl font-semibold text-center">Pricing</h3>
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Plan name="Free" price="₹0" features={["Unlimited previews","1 export/mo (watermark)","Public share (badge)"]} cta="Start free" />
      <Plan name="Starter" price="₹749/mo" features={["10 exports/mo","Remove watermark","Notion export"]} cta="Choose Starter" />
      <Plan name="Pro" price="₹2,399/mo" features={["Unlimited exports","Custom branding","Private share pages","PDF export"]} cta="Choose Pro" />
    </div>
  </section>
</main>
);
}

function Plan({name, price, features, cta}:{name:string, price:string, features:string[], cta:string}) {
return (
<div className="rounded border p-6">
<h4 className="text-xl font-semibold">{name}</h4>
<p className="mt-2 text-3xl">{price}</p>
<ul className="mt-4 space-y-1 list-disc pl-5">
{features.map(f => <li key={f}>{f}</li>)}
</ul>
<button className="mt-4 w-full rounded bg-indigo-600 py-2 text-white">{cta}</button>
</div>
);
}
