import { useState } from "react";

const lanes: Record<
  string,
  {
    currency: string;
    rate: number;
    rateRestricted?: number;
    handling: number;
    unit: string;
    mode: string;
    duration: string;
  }
> = {
  uk: {
    currency: "€",
    rate: 6.5,
    handling: 25,
    unit: "kg",
    mode: "air",
    duration: "3–4 working days",
  },
  "china-sea": {
    currency: "KSh",
    rate: 60000,
    handling: 0,
    unit: "CBM",
    mode: "sea",
    duration: "45 working days",
  },
  europe: {
    currency: "€",
    rate: 10,
    handling: 30,
    unit: "kg",
    mode: "air",
    duration: "4–5 working days",
  },
  turkey: {
    currency: "€",
    rate: 8,
    handling: 0,
    unit: "kg",
    mode: "air",
    duration: "4–5 working days",
  },
  "south-africa": {
    currency: "€",
    rate: 8,
    handling: 25,
    unit: "kg",
    mode: "air",
    duration: "3–4 working days",
  },
  "china-air": {
    currency: "€",
    rate: 10.5,
    rateRestricted: 13,
    handling: 0,
    unit: "kg",
    mode: "air",
    duration: "7–10 working days",
  },
  usa: {
    currency: "€",
    rate: 15,
    handling: 0,
    unit: "kg",
    mode: "air",
    duration: "7 working days",
  },
  "dubai-air": {
    currency: "€",
    rate: 9,
    handling: 0,
    unit: "kg",
    mode: "air",
    duration: "4–5 working days",
  },
  "uk-sea": {
    currency: "€",
    rate: 2.5,
    handling: 15,
    unit: "kg",
    mode: "sea",
    duration: "30–45 working days",
  },
  india: {
    currency: "€",
    rate: 10,
    handling: 0,
    unit: "kg",
    mode: "air",
    duration: "7 working days",
  },
  "dubai-sea": {
    currency: "KSh",
    rate: 62000,
    handling: 0,
    unit: "CBM",
    mode: "sea",
    duration: "40 working days",
  },
};

interface Package {
  id: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  value: number;
  vol: number;
  cbm: number;
}

interface Results {
  currency: string;
  mode: string;
  qty: number;
  freight: number;
  handling: number;
  customs: number;
  total: number;
  duration: string;
}

export default function Calculator() {
  const [mode, setMode] = useState("air");
  const [origin, setOrigin] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [value, setValue] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [results, setResults] = useState<Results | null>(null);
  const [packageCounter, setPackageCounter] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"error" | "success" | "info">(
    "info"
  );

  const showToast = (msg: string, type: "error" | "success" | "info") => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const addPackage = () => {
    const w = parseFloat(weight) || 0;
    const L = parseFloat(length) || 0;
    const W = parseFloat(width) || 0;
    const H = parseFloat(height) || 0;
    const v = parseFloat(value) || 0;

    if (!origin) {
      showToast("Please select an origin.", "error");
      return;
    }
    if (w <= 0 || L <= 0 || W <= 0 || H <= 0) {
      showToast("Enter valid package dimensions.", "error");
      return;
    }

    const id = packageCounter + 1;
    const vol = (L * W * H) / 5000;
    const cbm = (L * W * H) / 1_000_000;

    setPackages([
      ...packages,
      { id, weight: w, length: L, width: W, height: H, value: v, vol, cbm },
    ]);
    setPackageCounter(id);
    clearForm();
    showToast("Package added.", "success");
  };

  const removePackage = (id: number) => {
    setPackages(packages.filter((p) => p.id !== id));
    showToast("Package removed.", "info");
  };

  const calculateCost = () => {
    if (!packages.length) {
      showToast("Add at least one package first.", "error");
      return;
    }

    if (!lanes[origin]) {
      showToast("Select a valid origin.", "error");
      return;
    }

    const lane = lanes[origin];
    let total = 0;
    let qty = 0;

    if (lane.mode === "air") {
      packages.forEach((p) => {
        qty += Math.max(p.weight, p.vol);
      });
    } else {
      packages.forEach((p) => {
        qty += p.cbm;
      });
    }

    total = qty * lane.rate + lane.handling;
    const handling = 50;
    const customs = 75;
    const grand = total + handling + customs;

    setResults({
      currency: lane.currency,
      mode: lane.mode,
      qty,
      freight: total,
      handling,
      customs,
      total: grand,
      duration: lane.duration,
    });
  };

  const clearForm = () => {
    setWeight("");
    setLength("");
    setWidth("");
    setHeight("");
    setValue("");
  };

  const currentLane = origin ? lanes[origin] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Calculate Your Approximate Freight Cost
            </h1>
            <div className="bg-orange-500 text-white px-4 py-3 rounded-lg text-sm">
              Because of many dynamic variables involved in freight costing,
              this calculator gives an approximate cost. Contact Kisima Cargo
              branches for an accurate quotation.
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-blue-900 text-white rounded-2xl p-6 space-y-6">
            {/* Shipping Mode */}
            <div>
              <div className="text-sm font-bold mb-3">Choose Shipping Mode</div>
              <div className="flex gap-4 justify-center flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="air"
                    checked={mode === "air"}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-semibold">Air Freight</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="sea"
                    checked={mode === "sea"}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-semibold">Sea Freight</span>
                </label>
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-200 block mb-2">
                  Sending goods from
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-slate-900"
                >
                  <option value="">Select origin country</option>
                  <option value="uk">United Kingdom (Air)</option>
                  <option value="china-sea">China (Sea)</option>
                  <option value="europe">Europe (Air)</option>
                  <option value="turkey">Turkey (Air)</option>
                  <option value="south-africa">South Africa (Air)</option>
                  <option value="china-air">China (Air)</option>
                  <option value="usa">United States (Air)</option>
                  <option value="dubai-air">Dubai (Air)</option>
                  <option value="uk-sea">United Kingdom (Sea)</option>
                  <option value="india">India (Air)</option>
                  <option value="dubai-sea">Dubai (Sea)</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-200 block mb-2">
                  Sending goods to
                </label>
                <input
                  value="Kenya"
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-300 text-slate-900"
                />
              </div>
            </div>

            {/* Lane Meta */}
            {currentLane && (
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Rate: {currentLane.currency}
                  {currentLane.rate}/{currentLane.unit}
                </span>
                <span className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Handling: {currentLane.currency}
                  {currentLane.handling}
                </span>
                <span className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Transit: {currentLane.duration}
                </span>
              </div>
            )}

            {/* Package Details */}
            <div>
              <div className="text-sm font-bold mb-3">Package Details</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                  step="0.1"
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-slate-900"
                />
                <input
                  type="number"
                  placeholder="Length (cm)"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  min="0"
                  step="0.1"
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-slate-900"
                />
                <input
                  type="number"
                  placeholder="Width (cm)"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min="0"
                  step="0.1"
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-slate-900"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="0"
                  step="0.1"
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-slate-900"
                />
                <input
                  type="number"
                  placeholder="Declared Value (EUR)"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  min="0"
                  step="0.01"
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={addPackage}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                Add Package
              </button>
              <button
                onClick={calculateCost}
                className="bg-gray-300 hover:bg-gray-400 text-slate-900 px-6 py-2 rounded-lg font-bold transition-colors"
              >
                Calculate Total Cost
              </button>
            </div>

            {/* Package List */}
            {packages.length > 0 && (
              <div className="space-y-3 mt-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-gray-100 text-slate-900 rounded-lg p-3 relative"
                  >
                    <button
                      onClick={() => removePackage(pkg.id)}
                      className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold transition-colors"
                    >
                      Remove
                    </button>
                    <h4 className="font-bold text-blue-900 mb-2">
                      Package {pkg.id}
                    </h4>
                    <div className="text-xs space-y-1">
                      <p>
                        Weight: {pkg.weight}kg | Size: {pkg.length}×{pkg.width}×
                        {pkg.height}cm
                      </p>
                      <p>
                        Volumetric: {pkg.vol.toFixed(2)}kg | Volume:{" "}
                        {pkg.cbm.toFixed(3)} CBM
                      </p>
                      <p>Declared Value: €{pkg.value.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {results && (
              <div className="space-y-3 mt-6">
                <div className="bg-green-500 text-white rounded-lg p-3 font-bold text-center text-lg">
                  Total Estimated Cost: {results.currency}
                  {results.total.toFixed(2)}
                </div>
                <div className="bg-gray-100 text-slate-900 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between pb-2 border-b">
                    <span>
                      Freight Cost ({results.qty.toFixed(2)}{" "}
                      {results.mode === "air" ? "kg" : "CBM"})
                    </span>
                    <span className="font-mono">
                      {results.currency}
                      {results.freight.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Handling Fee</span>
                    <span className="font-mono">
                      {results.currency}
                      {results.handling.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Customs Clearance</span>
                    <span className="font-mono">
                      {results.currency}
                      {results.customs.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t-2 pt-2 mt-2">
                    <span>Total</span>
                    <span className="font-mono">
                      {results.currency}
                      {results.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    Estimated transit time: {results.duration}. Rates are
                    subject to change.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toast */}
      {toastMsg && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white font-bold z-50 ${
            toastType === "error"
              ? "bg-red-500"
              : toastType === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
