import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const S = {
  root: {
    minHeight: '100vh',
    background: '#FAF8F4',
    fontFamily: "'Jost', system-ui, sans-serif",
    color: '#1A1612',
  },
  hero: {
    background: 'linear-gradient(160deg, #F2EDE4 0%, #FAF8F4 100%)',
    borderBottom: '1px solid rgba(26,22,18,0.1)',
    padding: '80px 24px 60px',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#C8516A',
    marginBottom: '16px',
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(36px, 5vw, 60px)',
    fontWeight: '300',
    color: '#1A1612',
    margin: '0 0 16px',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: '13px',
    color: '#8A8480',
    fontWeight: '300',
    margin: 0,
  },
  content: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '64px 24px 80px',
  },
  section: {
    marginBottom: '48px',
  },
  h2: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '26px',
    fontWeight: '400',
    color: '#1A1612',
    margin: '0 0 16px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(26,22,18,0.1)',
  },
  p: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '1.8',
    color: '#4A4540',
    margin: '0 0 14px',
  },
  ul: {
    paddingLeft: '20px',
    margin: '0 0 14px',
  },
  li: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '1.8',
    color: '#4A4540',
    marginBottom: '6px',
  },
  highlight: {
    background: '#F5E8EB',
    borderLeft: '3px solid #C8516A',
    padding: '16px 20px',
    marginBottom: '32px',
    borderRadius: '0 4px 4px 0',
  },
  highlightText: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#4A4540',
    margin: 0,
    lineHeight: '1.7',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#C8516A',
    textDecoration: 'none',
    marginBottom: '48px',
  },
};

export default function TermeniConditii() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={S.root}>
      {/* Hero */}
      <div style={S.hero}>
        <span style={S.eyebrow}>✦ Legal ✦</span>
        <h1 style={S.title}>Termeni și Condiții</h1>
        <p style={S.subtitle}>Ultima actualizare: ianuarie 2025</p>
      </div>

      {/* Content */}
      <div style={S.content}>
        <Link to="/" style={S.backLink}>← Înapoi la pagina principală</Link>

        <div style={S.highlight}>
          <p style={S.highlightText}>
            Prin utilizarea site-ului Maison de Fleurs și plasarea unei comenzi, 
            ești de acord cu termenii și condițiile de mai jos. Te rugăm să le citești 
            cu atenție înainte de a efectua o achiziție.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>1. Informații generale</h2>
          <p style={S.p}>
            <strong>Maison de Fleurs</strong> este un atelier floral premium cu sediul la 
            Str. Florilor 12, Timișoara, România. Site-ul este destinat vânzării de 
            aranjamente florale, buchete și produse decorative cu flori.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>2. Plasarea comenzilor</h2>
          <p style={S.p}>
            Comenzile se pot plasa online prin site sau telefonic la +40 756 123 456. 
            O comandă este considerată confirmată după primirea unui email de confirmare din partea noastră.
          </p>
          <ul style={S.ul}>
            <li style={S.li}>Comenzile se procesează în ziua plasării, în limita programului de lucru</li>
            <li style={S.li}>Disponibilitatea produselor poate varia în funcție de sezon</li>
            <li style={S.li}>Ne rezervăm dreptul de a contacta clientul dacă un produs nu este disponibil</li>
            <li style={S.li}>Prețurile afișate includ TVA și sunt exprimate în RON</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>3. Livrare</h2>
          <ul style={S.ul}>
            <li style={S.li}>Livrăm în Timișoara și împrejurimi în maximum 2-4 ore de la confirmare</li>
            <li style={S.li}>Livrarea este gratuită pentru comenzi peste 300 RON</li>
            <li style={S.li}>Pentru comenzi sub 300 RON, taxa de livrare este de 20 RON</li>
            <li style={S.li}>Nu garantăm livrarea la ore exacte, ci în intervale orare</li>
            <li style={S.li}>Clientul este responsabil pentru furnizarea unei adrese corecte de livrare</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>4. Plata</h2>
          <p style={S.p}>Acceptăm următoarele metode de plată:</p>
          <ul style={S.ul}>
            <li style={S.li}>Card bancar (Visa, Mastercard) — plată securizată online</li>
            <li style={S.li}>Transfer bancar — pe baza facturii proforma</li>
            <li style={S.li}>Numerar — la livrare sau la sediul atelierului</li>
            <li style={S.li}>Rate fără dobândă — prin parteneri bancari selectați</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>5. Retururi și garanții</h2>
          <p style={S.p}>
            Datorită naturii perisabile a produselor florale, retururile sunt acceptate 
            doar în cazul în care produsele sunt deteriorate la livrare sau nu corespund 
            comenzii plasate.
          </p>
          <ul style={S.ul}>
            <li style={S.li}>Reclamațiile se fac în maxim 2 ore de la primirea comenzii</li>
            <li style={S.li}>Este necesară o fotografie a produsului pentru procesarea reclamației</li>
            <li style={S.li}>Garantăm prospețimea florilor minimum 7 zile de la livrare</li>
            <li style={S.li}>În caz de produs deteriorat, oferim înlocuire sau rambursare integrală</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>6. Proprietate intelectuală</h2>
          <p style={S.p}>
            Toate imaginile, textele și designul de pe acest site aparțin 
            <strong> Maison de Fleurs</strong> și sunt protejate de legile dreptului de autor. 
            Este interzisă reproducerea sau utilizarea lor fără acordul scris al nostru.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>7. Limitarea răspunderii</h2>
          <p style={S.p}>
            Maison de Fleurs nu își asumă răspunderea pentru întârzieri cauzate de 
            condiții meteorologice extreme, evenimente de forță majoră sau informații 
            incorecte furnizate de client (adresă greșită, telefon indisponibil etc.).
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>8. Legea aplicabilă</h2>
          <p style={S.p}>
            Acești termeni sunt guvernați de legislația română în vigoare. 
            Orice litigiu va fi soluționat pe cale amiabilă sau, în caz contrar, 
            prin instanțele competente din Timișoara.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>9. Contact</h2>
          <ul style={S.ul}>
            <li style={S.li}>📧 comenzi@maisondfleurs.ro</li>
            <li style={S.li}>📞 +40 756 123 456</li>
            <li style={S.li}>📍 Str. Florilor 12, Timișoara, România</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
