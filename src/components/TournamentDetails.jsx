export default function TournamentDetails() {
  return (
    <section id="tournament-details" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">Latest Updates</div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          The Essentials
        </h2>

        <div className="h-px w-16 bg-black/20 mb-6"></div>

        <ul className="list-disc pl-6 text-black/80 space-y-2">
          <li><strong>Dates:</strong> September 5–7, 2026 (Labour Day weekend)</li>
          <li><strong>Format:</strong> 9-man volleyball (full tournament format coming soon)</li>
          <li><strong>Location:</strong> Palais des congrès, at the edge of Montreal's Chinatown</li>
          <li><strong>Questions:</strong> <a href="mailto:MTLRegistration@nacivt.com" className="text-[#1e3a8a] underline">MTLRegistration@nacivt.com</a></li>
        </ul>
      </div>
    </section>
  )
}
