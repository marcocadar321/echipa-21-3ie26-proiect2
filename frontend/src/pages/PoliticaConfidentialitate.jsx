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

export default function PoliticaConfidentialitate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={S.root}>
      {/* Hero */}
      <div style={S.hero}>
        <span style={S.eyebrow}>✦ GDPR ✦</span>
        <h1 style={S.title}>Politica de Confidențialitate</h1>
        <p style={S.subtitle}>Ultima actualizare: ianuarie 2025</p>
      </div>

      {/* Content */}
      <div style={S.content}>
        <Link to="/" style={S.backLink}>← Înapoi la pagina principală</Link>

        <div style={S.highlight}>
          <p style={S.highlightText}>
            Maison de Fleurs respectă confidențialitatea datelor tale personale și se angajează 
            să le protejeze în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) 
            — Regulamentul UE 2016/679.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>1. Cine suntem</h2>
          <p style={S.p}>
            Operatorul de date este <strong>Maison de Fleurs</strong>, cu sediul la 
            Str. Florilor 12, Timișoara, România. Ne puteți contacta la 
            adresa comenzi@maisondfleurs.ro sau telefonic la +40 756 123 456.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>2. Ce date colectăm</h2>
          <p style={S.p}>Colectăm următoarele categorii de date personale:</p>
          <ul style={S.ul}>
            <li style={S.li}><strong>Date de identificare:</strong> nume, prenume</li>
            <li style={S.li}><strong>Date de contact:</strong> adresă email, număr de telefon, adresă de livrare</li>
            <li style={S.li}><strong>Date de comandă:</strong> produsele comandate, valoarea comenzii, istoricul achizițiilor</li>
            <li style={S.li}><strong>Date tehnice:</strong> adresa IP, tipul browserului, paginile vizitate (prin cookie-uri)</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>3. De ce colectăm datele</h2>
          <p style={S.p}>Prelucrăm datele tale în următoarele scopuri:</p>
          <ul style={S.ul}>
            <li style={S.li}>Procesarea și livrarea comenzilor tale</li>
            <li style={S.li}>Comunicarea cu tine în legătură cu comanda sau serviciile noastre</li>
            <li style={S.li}>Trimiterea newsletter-ului (doar cu consimțământul tău)</li>
            <li style={S.li}>Îmbunătățirea site-ului și a experienței de cumpărare</li>
            <li style={S.li}>Respectarea obligațiilor legale și fiscale</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>4. Temeiul legal</h2>
          <p style={S.p}>Prelucrăm datele tale pe baza:</p>
          <ul style={S.ul}>
            <li style={S.li}><strong>Executarea contractului</strong> — pentru procesarea comenzilor</li>
            <li style={S.li}><strong>Consimțământul tău</strong> — pentru newsletter și cookie-uri de marketing</li>
            <li style={S.li}><strong>Obligație legală</strong> — pentru facturare și contabilitate</li>
            <li style={S.li}><strong>Interes legitim</strong> — pentru securitatea și funcționarea site-ului</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>5. Cookie-uri</h2>
          <p style={S.p}>
            Folosim cookie-uri esențiale (necesare funcționării site-ului) și cookie-uri analitice 
            (pentru statistici anonime de vizitare). Cookie-urile de marketing sunt activate 
            doar cu consimțământul tău explicit.
          </p>
          <p style={S.p}>
            Poți gestiona preferințele de cookie-uri din setările browserului sau prin 
            bannerul de consimțământ afișat la prima vizită.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>6. Cât timp păstrăm datele</h2>
          <ul style={S.ul}>
            <li style={S.li}>Date de comandă: 5 ani (obligație legală fiscală)</li>
            <li style={S.li}>Date newsletter: până la retragerea consimțământului</li>
            <li style={S.li}>Date cookie analitice: maxim 13 luni</li>
            <li style={S.li}>Date de cont: pe durata existenței contului + 1 an</li>
          </ul>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>7. Drepturile tale</h2>
          <p style={S.p}>Conform GDPR, ai următoarele drepturi:</p>
          <ul style={S.ul}>
            <li style={S.li}><strong>Dreptul de acces</strong> — să știi ce date deținem despre tine</li>
            <li style={S.li}><strong>Dreptul la rectificare</strong> — să corectezi datele incorecte</li>
            <li style={S.li}><strong>Dreptul la ștergere</strong> — să soliciți ștergerea datelor ("dreptul de a fi uitat")</li>
            <li style={S.li}><strong>Dreptul la portabilitate</strong> — să primești datele într-un format structurat</li>
            <li style={S.li}><strong>Dreptul de opoziție</strong> — să te opui prelucrării datelor</li>
            <li style={S.li}><strong>Dreptul de retragere a consimțământului</strong> — oricând, fără efecte retroactive</li>
          </ul>
          <p style={S.p}>
            Pentru exercitarea drepturilor, ne contactezi la comenzi@maisondfleurs.ro. 
            Ai și dreptul de a depune o plângere la <strong>ANSPDCP</strong> (Autoritatea Națională de 
            Supraveghere a Prelucrării Datelor cu Caracter Personal) — www.dataprotection.ro.
          </p>
        </div>

        <div style={S.section}>
          <h2 style={S.h2}>8. Contact</h2>
          <p style={S.p}>
            Pentru orice întrebare legată de datele tale personale, ne poți contacta:
          </p>
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
