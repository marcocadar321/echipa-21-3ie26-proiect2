import React from 'react';
import { Leaf, Truck, Heart, Calendar, ShoppingBag, Users, Award } from 'lucide-react';
import poza1 from '../assets/images/poza1.jpg';
import poza2 from '../assets/images/poza2.jpg';
import poza3 from '../assets/images/poza3.jpg';
import poza4 from '../assets/images/poza4.jpg';
import poza5 from '../assets/images/poza5.jpg';
import poza6 from '../assets/images/poza6.jpg';
import poza7 from '../assets/images/poza7.jpg';

const AboutPage = () => {
  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-800 antialiased overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={poza1} 
            alt="Florărie Premium Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-emerald-400 font-serif italic text-lg md:text-xl block mb-4 tracking-widest uppercase">
            Pasiune dincolo de petale
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-wide leading-tight">
            Despre Noi
          </h1>
          <p className="text-stone-200 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed border-t border-white/20 pt-6">
            Transformăm emoțiile în povești florale memorabele și aducem frumusețea naturii direct în momentele voastre speciale.
          </p>
        </div>
      </section>

      {/* 2. POVESTEA NOASTRĂ */}
      <section className="my-32 py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="overflow-hidden rounded-3xl shadow-xl h-[400px] md:h-[550px] w-full">
            <img 
              src={poza2} 
              alt="Atelierul nostru floral" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-stone-100 flex flex-col justify-center">
            <span className="text-emerald-700 font-medium tracking-widest text-xs uppercase block mb-3">
              Rădăcinile Noastre
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 leading-tight">
              Cum a început călătoria noastră în lumea botanică
            </h2>
            <div className="space-y-4 text-stone-600 font-light leading-relaxed">
              <p>
                Florăria noastră s-a născut dintr-un vis simplu, dar profund: acela de a redefini designul floral local prin eleganță, prospețime absolută și o atenție meticuloasă la detalii. Ceea ce a început ca un mic atelier de creație a evoluat astăzi într-un reper al rafinamentului.
              </p>
              <p>
                Fiecare buchet care părăsește atelierul nostru este o piesă unică de artă. Selectăm personal fiecare floare de la producători de top, asigurându-ne că nuanțele, texturile și parfumurile se îmbină într-o armonie perfectă care să transmită exact mesajul dorit.
              </p>
              <p className="font-medium text-stone-800 italic pt-4 border-t border-stone-100">
                Pentru noi, florile nu sunt doar un produs, ci un limbaj universal al eleganței.
              </p>
            </div>
          </div>

        </div>
        <br></br>
      </section>
    

      {/* 3. STATISTICI */}
      <section className="my-32 py-20 bg-stone-950 text-white block clear-both position-relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            
            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/5 rounded-full mb-4">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-emerald-400 mb-2">10+</span>
              <span className="text-stone-400 text-xs tracking-wider uppercase font-medium">Ani Experiență</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/5 rounded-full mb-4">
                <ShoppingBag className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-emerald-400 mb-2">5000+</span>
              <span className="text-stone-400 text-xs tracking-wider uppercase font-medium">Comenzi Realizate</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/5 rounded-full mb-4">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-emerald-400 mb-2">1000+</span>
              <span className="text-stone-400 text-xs tracking-wider uppercase font-medium">Clienți Mulțumiți</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/5 rounded-full mb-4">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-4xl md:text-5xl font-serif font-bold text-emerald-400 mb-2">100%</span>
              <span className="text-stone-400 text-xs tracking-wider uppercase font-medium">Flori Proaspete</span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DE CE SĂ NE ALEGI */}
      <section className="my-32 py-12 px-4 md:px-8 max-w-7xl mx-auto block clear-both">
        <div className="text-center max-w-3xl mx-auto mb-20"><br></br>
          <span className="text-emerald-700 font-medium tracking-widest text-xs uppercase block mb-3">
            Standardele Noastre
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
            De ce să ne alegi pe noi
          </h2>
          <div className="w-20 h-[2px] bg-emerald-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-700 shadow-inner">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-4">Flori Proaspete</h3>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Colaborăm exclusiv cu furnizori certificați. Fiecare floare este inspectată individual și păstrată în condiții optime de temperatură pentru o rezistență îndelungată în vază.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-700 shadow-inner">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-4">Livrare Rapidă</h3>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Curierii proprii livrează aranjamentele în mașini cu temperatură controlată. Garantăm transportul impecabil și predarea buchetului în condiții de siguranță deplină.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-700 shadow-inner">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-4">Aranjamente Personalizate</h3>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Ascultăm cu atenție dorințele tale. Floriștii noștri pot realiza concepte unice adaptate tematicii, paletei cromatice și bugetului specificat de fiecare client.
            </p>
          </div>

        </div>
      </section>

      {/* 5. GALERIE */}
      <section className="my-32 py-16 px-6 md:px-12 max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-stone-100 block clear-both">
        <div className="text-center max-w-3xl mx-auto mb-20"><br></br>
          <span className="text-emerald-700 font-medium tracking-widest text-xs uppercase block mb-3">
            Portofoliu Vizual
          </span>
          <br></br>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">
            Galeria Noastră de Creații
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base">
            O privire fugară asupra designurilor recente realizate cu pasiune în atelierul nostru floral.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="overflow-hidden rounded-2xl shadow-md h-72">
            <img src={poza3} alt="Aranjament floral select" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md h-72">
            <img src={poza4} alt="Buchet de mireasă rafinat" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md h-72">
            <img src={poza5} alt="Design floral nuntă" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md h-72">
            <img src={poza6} alt="Flori proaspete de sezon" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md h-72 sm:col-span-2 md:col-span-1">
            <img src={poza7} alt="Detalii buchet de lux" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        </div>
      </section>

      {/* 6. ECHIPA */}
      <section className="my-32 py-12 px-4 md:px-8 max-w-7xl mx-auto block clear-both">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-700 font-medium tracking-widest text-xs uppercase block mb-3">
            Oameni Dedicați
          </span>
          <br></br>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">
            Echipa de Specialiști
          </h2>
          <div className="w-24 h-[2px] bg-emerald-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 text-center flex flex-col items-center p-10">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-stone-50 shadow-md bg-stone-100 flex items-center justify-center font-serif text-2xl font-bold text-stone-600">
              AM
            </div>
            <h3 className="text-xl font-serif text-stone-900 mb-1">Andreea Marin</h3>
            <span className="text-xs tracking-widest font-medium uppercase text-emerald-600 mb-5 block">Designer Floral Principal</span>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Cu studii masterale în arta peisagistică și design botanic, Andreea dă viață celor mai complexe și sofisticate aranjamente.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 text-center flex flex-col items-center p-10">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-stone-50 shadow-md bg-stone-100 flex items-center justify-center font-serif text-2xl font-bold text-stone-600">
              EP
            </div>
            <h3 className="text-xl font-serif text-stone-900 mb-1">Elena Popescu</h3>
            <span className="text-xs tracking-widest font-medium uppercase text-emerald-600 mb-5 block">Consultant Evenimente</span>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Specialistul nostru în planificare. Elena se asigură că nunta sau evenimentul tău privat beneficiază de un decor ireproșabil.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 text-center flex flex-col items-center p-10">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-stone-50 shadow-md bg-stone-100 flex items-center justify-center font-serif text-2xl font-bold text-stone-600">
              RD
            </div>
            <h3 className="text-xl font-serif text-stone-900 mb-1">Radu Dumitrescu</h3>
            <span className="text-xs tracking-widest font-medium uppercase text-emerald-600 mb-5 block">Manager Livrări Premium</span>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Radu coordonează rețeaua logistică internă pentru a garanta că fiecare comandă ajunge la destinație în stare proaspătă și la timp.
            </p>
          </div>

        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="my-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto block clear-both">
        <div className="bg-rose-50 rounded-3xl shadow-xl py-20 px-8 md:px-16 text-center border border-rose-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-rose-100/40 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 transform -translate-x-12 translate-y-12 w-48 h-48 bg-emerald-100/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <br></br>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight text-align-center">
              Ești gata să aduci un strop de prospețime în viața ta?
            </h2>
            <p className="text-stone-600 font-light mb-10 text-base md:text-lg">
              Explorează colecția noastră exclusivă de sezon și alege aranjamentul care vorbește pe limba ta. Realizăm livrări în aceeași zi.
            </p><br></br>
            <button className="bg-stone-950 hover:bg-emerald-900 text-white font-medium text-sm md:text-base tracking-wider uppercase px-10 py-5 rounded-full shadow-lg transition-all duration-300">
              Vezi Aranjamentele
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;