import { useRegisterSW } from "virtual:pwa-register/react";
import AApp from "./code";
import ABpp from "./v10";

function App() {
  // PWA আপডেট হ্যান্ডেল করার জন্য হুক
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="relative">
      {/* আপনার মেইন কম্পোনেন্ট */}
      <ABpp />

      {/* আপডেট পপ-আপ UI */}
      {(offlineReady || needRefresh) && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm p-4 bg-slate-800 text-white border border-slate-700 rounded-lg shadow-2xl animate-bounce">
          <div className="mb-2">
            {offlineReady ? (
              <p>অ্যাপটি অফলাইনে ব্যবহারের জন্য প্রস্তুত।</p>
            ) : (
              <p>নতুন আপডেট পাওয়া গেছে! এখনই আপডেট করবেন?</p>
            )}
          </div>
          <div className="flex gap-2">
            {needRefresh && (
              <button
                onClick={() => updateServiceWorker(true)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                আপডেট করুন
              </button>
            )}
            <button
              onClick={close}
              className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
