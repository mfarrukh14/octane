import React from "react";

const CreditCard = () => {
  return (
    <div className="w-[350px] h-[200px] rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-[#000000] text-white shadow-xl px-6 py-5 font-sans relative overflow-hidden border border-white/10">

      {/* Bank Name */}
      <div className="text-lg font-semibold tracking-wide">OCTANE BANK</div>

      {/* VISA Logo - Top Right */}
      <div className="absolute top-5 right-6">
        <div className="text-sm font-bold text-white tracking-wide">VISA</div>
      </div>

      {/* Chip */}
      <div className="w-12 h-8 bg-yellow-400 rounded-sm mt-6 mb-5 shadow-inner shadow-black/40"></div>

      {/* Card Number */}
      <div className="text-xl tracking-widest font-mono mb-6">
        4321 5678 9012 3456
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        <div>
          <div className="uppercase text-xs text-white/60">Card Holder</div>
          <div className="mt-1 font-semibold text-sm">MUHAMMAD FARRUKH</div>
        </div>
        <div>
          <div className="uppercase text-xs text-white/60">Expires</div>
          <div className="mt-1 font-semibold text-sm">12/28</div>
        </div>
      </div>

      {/* Decorative Glow (Optional, can be removed) */}
      <div className="absolute w-40 h-40 bg-white/5 rounded-full -top-10 -left-10 blur-2xl"></div>
      <div className="absolute w-32 h-32 bg-white/5 rounded-full -bottom-10 -right-10 blur-2xl"></div>
    </div>
  );
};

export default CreditCard;
