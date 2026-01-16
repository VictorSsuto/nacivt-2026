export default function RegistrationAlert({ daysLeft, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-4 text-white">
          <h3 className="text-xl font-semibold">NACIVT 2026 Registration </h3>
          <p className="text-sm text-white/80">Get ready to serve.</p>
        </div>

        {/* Body */}
        <div className="px-1 py-1 text-center">
          <p className="text-lg text-gray-700">
          <span className="text-red-600 font-bold">Early </span>Registration starts in
          </p>

          <div className="mt-4 text-5xl font-bold text-blue-900">
            {daysLeft}
            <span className="ml-2 text-2xl text-gray-500">days</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 pb-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-blue-800 px-2 py-1 text-blue-800 hover:bg-blue-800 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
