// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Simon Designs",
  description: "Learn about Simon Designs — our mission, values, and what we do.",
};

export default function AboutBrandPage() {
  return (
    <main className="min-h-[70vh]">
      {/* Simple page hero */}
      <section className="bg-gradient-to-r from-orange-100 to-green-100 border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900">About Simon Designs</h1>
          <p className="mt-3 text-gray-700 max-w-3xl">
            We’re a Kenya-based creative studio crafting brand identities, marketing assets, UI/UX,
            print design, and packaging for clients worldwide. Our focus is clarity, consistency,
            and visuals that move people to action.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl font-semibold">Brand Identity</h3>
          <p className="mt-2 text-gray-600">Logos, cards, letterheads, company profiles & full brand kits.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl font-semibold">Marketing Design</h3>
          <p className="mt-2 text-gray-600">Posters, flyers, brochures, billboards, banners, social posts & emails.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl font-semibold">UI/UX & Print</h3>
          <p className="mt-2 text-gray-600">Website & app UI, book covers, magazines, catalogs, menus & packaging.</p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold">Why Choose Simon Designs</h2>
        <ul className="mt-4 grid md:grid-cols-2 gap-4">
          <li className="p-5 rounded-2xl bg-white shadow-sm">Fast, dependable communication</li>
          <li className="p-5 rounded-2xl bg-white shadow-sm">Modern, on-brand visual systems</li>
          <li className="p-5 rounded-2xl bg-white shadow-sm">Flexible packages, fair pricing</li>
          <li className="p-5 rounded-2xl bg-white shadow-sm">Serving Kenya & clients worldwide</li>
        </ul>
      </section>
    </main>
  );
}
