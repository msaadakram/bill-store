import { billTypes } from "@/data/billData";
import { BillTypeCard } from "@/components/BillTypeCard";

/** Grid of bill type category cards */
export function BillTypesSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div
            className="inline-block px-3 py-1 rounded-lg bg-teal-50 text-teal-700 mb-3"
            style={{ fontSize: "12px", fontWeight: 700 }}
          >
            BILL CATEGORIES
          </div>
          <h2
            className="text-slate-900 mb-3 font-serif"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800 }}
          >
            Select Your Bill Type
          </h2>
          <p className="text-slate-500 max-w-md mx-auto" style={{ fontSize: "15px" }}>
            Choose the type of utility bill you want to check from the options below
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {billTypes.map((bill) => (
            <BillTypeCard key={bill.type} bill={bill} />
          ))}
        </div>
      </div>
    </section>
  );
}
