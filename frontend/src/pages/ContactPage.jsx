import { useState, useEffect } from 'react';
import { fetchContact } from '../api/strapi';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({ nume: '', email: '', mesaj: '' });
  const [trimis, setTrimis] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    fetchContact().then(res => setContact(res.data.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setTrimis(true);
    setForm({ nume: '', email: '', mesaj: '' });
  };

  const fields = [
    { name: 'nume', label: 'Nume complet', type: 'text', placeholder: 'Numele dumneavoastră' },
    { name: 'email', label: 'Adresă email', type: 'email', placeholder: 'nume@exemplu.com' },
  ];

  return (
    <>
      <main style={{ backgroundColor: '#FBF7F4', minHeight: '100vh', paddingTop: '5rem', fontFamily: "'Georgia', serif" }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '6rem 1.5rem 4rem', textAlign: 'center', overflow: 'hidden' }}>
          {/* Blob-uri decorative */}
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,182,193,0.25), transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', right: '-60px', width: '350px', height: '350px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,218,185,0.2), transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase',
              color: '#C4856A', fontFamily: 'sans-serif', marginBottom: '1.5rem', fontWeight: 600
            }}>
              Maison de Fleurs
            </p>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 300, color: '#2C1810',
              letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem'
            }}>
              Contactați-ne
            </h1>
            {/* Linie ornamentală */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, #D4A090)' }} />
              <span style={{ color: '#D4A090', fontSize: '1.1rem' }}>✦</span>
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, #D4A090)' }} />
            </div>
            <p style={{
              color: '#8C6B5E', fontSize: '1rem', fontStyle: 'italic', fontWeight: 300,
              maxWidth: '480px', margin: '0 auto', lineHeight: 1.8
            }}>
              Pentru comenzi speciale, evenimente private sau consultanță personalizată — atelierul nostru vă stă la dispoziție.
            </p>
          </div>
        </section>

        {/* ── Grid principal ── */}
        <section style={{
          maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 5rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
          alignItems: 'start'
        }}
          className="contact-grid"
        >

          {/* ── Stânga: Informații ── */}
          <div>
            <p style={{
              fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: '#C4856A', fontFamily: 'sans-serif', fontWeight: 700,
              borderBottom: '1px solid #EDD9D0', paddingBottom: '0.75rem', marginBottom: '1.75rem'
            }}>
              Atelier & Detalii
            </p>

            {contact ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '✉', label: 'Email', value: contact.Email },
                  { icon: '☎', label: 'Telefon', value: contact.Telefon },
                  { icon: '◎', label: 'Adresă', value: contact.Adresa },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    padding: '1.25rem 1.5rem',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #EDD9D0',
                    boxShadow: '0 2px 16px rgba(196,133,106,0.06)',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,133,106,0.14)';
                      e.currentTarget.style.borderColor = '#C4856A';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 2px 16px rgba(196,133,106,0.06)';
                      e.currentTarget.style.borderColor = '#EDD9D0';
                    }}
                  >
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #FDE8E0, #F9D0C4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', color: '#C4856A'
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4A090', fontFamily: 'sans-serif', fontWeight: 600, marginBottom: '0.2rem' }}>
                        {label}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#3D1F15', fontWeight: 400, fontFamily: 'sans-serif' }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}

                {contact.ProgramLucru?.length > 0 && (
                  <div style={{
                    padding: '1.25rem 1.5rem',
                    background: 'white', borderRadius: '16px',
                    border: '1px solid #EDD9D0',
                    boxShadow: '0 2px 16px rgba(196,133,106,0.06)'
                  }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #FDE8E0, #F9D0C4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', color: '#C4856A'
                      }}>◷</div>
                      <div>
                        <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4A090', fontFamily: 'sans-serif', fontWeight: 600, marginBottom: '0.5rem' }}>
                          Program
                        </p>
                        {contact.ProgramLucru.map((bloc, i) => (
                          <p key={i} style={{ fontSize: '0.85rem', color: '#5C3D30', fontFamily: 'sans-serif', lineHeight: 1.7 }}>
                            {bloc.children?.[0]?.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: '72px', borderRadius: '16px', background: '#F5EAE5', animation: 'pulse 1.5s infinite' }} />
                ))}
              </div>
            )}

            {/* Hartă */}
            <div style={{
              marginTop: '1.5rem', borderRadius: '20px', overflow: 'hidden',
              border: '1px solid #EDD9D0', height: '220px',
              boxShadow: '0 4px 24px rgba(196,133,106,0.1)'
            }}>
              <iframe
                title="Locatie florarie"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87515.89545556808!2d21.206289!3d45.749943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff05512f5fd!2sTimișoara!5e0!3m2!1sro!2sro!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen loading="lazy"
              />
            </div>
          </div>

          {/* ── Dreapta: Formular ── */}
          <div>
            <p style={{
              fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: '#C4856A', fontFamily: 'sans-serif', fontWeight: 700,
              borderBottom: '1px solid #EDD9D0', paddingBottom: '0.75rem', marginBottom: '1.75rem'
            }}>
              Trimiteți un mesaj
            </p>

            <div style={{
              background: 'white', borderRadius: '24px',
              border: '1px solid #EDD9D0',
              boxShadow: '0 8px 40px rgba(196,133,106,0.1)',
              padding: '2.5rem',
              position: 'relative', overflow: 'hidden'
            }}>
              {/* Decor colț */}
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '150px', height: '150px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(253,210,196,0.4), transparent 70%)',
                pointerEvents: 'none'
              }} />

              {trimis && (
                <div style={{
                  padding: '1rem', marginBottom: '1.5rem',
                  background: '#F0F9F0', border: '1px solid #A8D5A8',
                  borderRadius: '12px', color: '#3A7A3A',
                  fontSize: '0.8rem', fontFamily: 'sans-serif',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  ✓ Mesajul a fost trimis cu succes. Vă mulțumim!
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {fields.map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label style={{
                      display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', color: '#A07060',
                      fontFamily: 'sans-serif', fontWeight: 600, marginBottom: '0.5rem'
                    }}>{label}</label>
                    <input
                      type={type} name={name} value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      placeholder={placeholder}
                      style={{
                        width: '100%', padding: '0.875rem 1.1rem',
                        borderRadius: '12px', fontSize: '0.875rem',
                        fontFamily: 'sans-serif', color: '#2C1810',
                        background: focused === name ? '#FFFAF8' : '#FBF7F4',
                        border: `1.5px solid ${focused === name ? '#C4856A' : '#EDD9D0'}`,
                        boxShadow: focused === name ? '0 0 0 3px rgba(196,133,106,0.12)' : 'none',
                        outline: 'none', transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em',
                    textTransform: 'uppercase', color: '#A07060',
                    fontFamily: 'sans-serif', fontWeight: 600, marginBottom: '0.5rem'
                  }}>Mesaj</label>
                  <textarea
                    name="mesaj" value={form.mesaj}
                    onChange={handleChange}
                    onFocus={() => setFocused('mesaj')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    placeholder="Cum vă putem ajuta?"
                    style={{
                      width: '100%', padding: '0.875rem 1.1rem',
                      borderRadius: '12px', fontSize: '0.875rem',
                      fontFamily: 'sans-serif', color: '#2C1810',
                      background: focused === 'mesaj' ? '#FFFAF8' : '#FBF7F4',
                      border: `1.5px solid ${focused === 'mesaj' ? '#C4856A' : '#EDD9D0'}`,
                      boxShadow: focused === 'mesaj' ? '0 0 0 3px rgba(196,133,106,0.12)' : 'none',
                      outline: 'none', transition: 'all 0.2s',
                      resize: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    width: '100%', padding: '1rem',
                    background: 'linear-gradient(135deg, #D4856A, #B5614A)',
                    color: 'white', border: 'none', borderRadius: '12px',
                    fontSize: '0.7rem', letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontFamily: 'sans-serif',
                    fontWeight: 600, cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(196,133,106,0.35)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(196,133,106,0.45)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,133,106,0.35)';
                  }}
                >
                  Trimite solicitarea ✦
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive mobile */}
        <style>{`
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}