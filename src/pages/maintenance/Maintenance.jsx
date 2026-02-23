import MontrealView from '../../assets/Montrealview.webp';

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{backgroundImage: `url(${MontrealView})`}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="text-center px-6 py-12 max-w-md relative z-10">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">
            🏐
          </h1>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Maintenance in Progress
        </h1>
     
        <p className="text-slate-400 mb-8">
          The site will be back online shortly. Thank you for your patience!
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}
