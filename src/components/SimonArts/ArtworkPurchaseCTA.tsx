// FILE LOCATION: src/components/simonArts/ArtworkPurchaseCTA.tsx

"use client";

import Link from 'next/link';

interface ArtworkPurchaseCTAProps {
  price?: number;
}

export default function ArtworkPurchaseCTA({ price }: ArtworkPurchaseCTAProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 lg:p-10 text-center mb-6">
      <h3 className="section-title font-bold text-gray-900 mb-2">Interested in This Piece?</h3>
      {price && (
        <p className="card-title text-gray-900 mb-4">
          Price: <span style={{ color: '#048F02' }}>KES {price.toLocaleString()}</span>
        </p>
      )}
      <Link
        href="/contact"
        className="inline-block text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all card-desc"
        style={{ backgroundColor: '#048F02' }}
      >
        Inquire About This Piece
      </Link>
    </div>
  );
}