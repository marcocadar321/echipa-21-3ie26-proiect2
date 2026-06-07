import { useState, useEffect } from 'react';
import { fetchContact } from '../api/strapi';

export default function ContactPage() {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({ nume: '', email: '', mesaj: '' });
  const [trimis, setTrimis] = useState(false);

  useEffect(() => {
    fetchContact()
      .then(res => setContact(res.data.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrimis(true);
    setForm({ nume: '', email: '', mesaj: '' });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white pt-20">
      
      <section className="bg-pink-50 dark:bg-gray-800 py-16 text-center">
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
          Contactează-ne
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Suntem aici pentru tine — flori pentru orice ocazie!
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400">
            Informații
          </h2>
          {contact ? (
            <div className="space-y-4 text-base">
              <p>📧 <span className="font-medium">Email:</span> {contact.Email}</p>
              <p>📞 <span className="font-medium">Telefon:</span> {contact.Telefon}</p>
              <p>📍 <span className="font-medium">Adresă:</span> {contact.Adresa}</p>
              <div>
                <p className="font-medium mb-1">🕐 Program:</p>
                {contact.ProgramLucru?.map((bloc, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-300">
                    {bloc.children?.[0]?.text}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Se încarcă...</p>
          )}

          <div className="rounded-2xl overflow-hidden shadow-md h-64 w-full mt-4">
            <iframe
              title="Locatie florarie"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87515.89545556808!2d21.206289!3d45.749943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff05512f5fd!2sTimișoara!5e0!3m2!1sro!2sro!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-6">
            Trimite-ne un mesaj
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
            {trimis && (
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 p-3 rounded-lg text-sm">
                ✅ Mesajul a fost trimis cu succes! Te vom contacta în curând.
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Nume</label>
              <input
                type="text" name="nume" value={form.nume}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Numele tău"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="email@exemplu.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mesaj</label>
              <textarea
                name="mesaj" value={form.mesaj}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                placeholder="Scrie mesajul tău..."
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Trimite mesajul 💐
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}