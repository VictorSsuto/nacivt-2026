export default function TournamentDetails() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">Tournament Details</div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Quick Info
        </h2>

        <div className="h-px w-16 bg-black/20 mb-6"></div>

        <ul className="list-disc pl-6 text-black/80 space-y-2">
          <li><strong>Dates:</strong> Labour Day Weekend — September 5-7, 2026</li>
          <li><strong>Format:</strong> 9-Man Volleyball (tournament format details coming soon)</li>
          <li><strong>Location:</strong> Montreal Chinatown / Palais des Congrès</li>
          <li><strong>Registration:</strong> contact@nacivt.com</li>
        </ul>

        <p className="mt-6 text-base text-black/70">.</p>
      </div>
    </section>
  )
}
