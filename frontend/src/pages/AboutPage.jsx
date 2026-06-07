import heroImg from '../assets/images/poza1.jpg'
import storyImg from '../assets/images/poza2.jpg'

import gallery1 from '../assets/images/poza3.jpg'
import gallery2 from '../assets/images/poza4.jpg'
import gallery3 from '../assets/images/poza5.jpg'
import gallery4 from '../assets/images/poza6.jpg'
import gallery5 from '../assets/images/poza7.jpg'

export default function AboutPage() {
const valori = [
{
icon: "🌸",
title: "Flori Proaspete",
text: "Selectate zilnic pentru a păstra frumusețea și prospețimea fiecărui aranjament."
},
{
icon: "🚚",
title: "Livrare Rapidă",
text: "Comenzile sunt pregătite și livrate în cele mai bune condiții."
},
{
icon: "💝",
title: "Aranjamente Personalizate",
text: "Buchete și aranjamente adaptate fiecărui eveniment special."
}
]

const stats = [
{ value: "10+", label: "Ani experiență" },
{ value: "5000+", label: "Comenzi realizate" },
{ value: "1000+", label: "Clienți mulțumiți" },
{ value: "100%", label: "Flori proaspete" }
]

const gallery = [
gallery1,
gallery2,
gallery3,
gallery4,
gallery5
]

return ( <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

```

  <section className="relative h-[80vh] overflow-hidden">

    <img
      src={heroImg}
      alt="Florărie"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-black/45" />

    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center max-w-4xl px-6">

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Despre Noi
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          Transformăm emoțiile în buchete și aranjamente florale create cu pasiune,
          inspirație și atenție la fiecare detaliu.
        </p>

      </div>
    </div>
  </section>


  <section className="max-w-6xl mx-auto px-6 py-24">

    <div className="grid md:grid-cols-2 gap-16 items-center">

      <div className="overflow-hidden rounded-3xl shadow-xl">
        <img
          src={storyImg}
          alt="Povestea noastră"
          className="w-full h-[500px] object-cover"
        />
      </div>

      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Povestea Noastră
        </h2>

        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Florăria noastră a luat naștere din pasiunea pentru frumusețea naturii
          și dorința de a aduce bucurie prin fiecare buchet.
        </p>

        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mt-6">
          Credem că florile au puterea de a transmite emoții, de a crea amintiri
          și de a transforma orice moment într-unul special.
        </p>

        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mt-6">
          Fiecare aranjament este realizat cu atenție la detalii și respect
          pentru calitate.
        </p>
      </div>

    </div>

  </section>

  <section className="bg-gray-50 dark:bg-gray-800 py-24">

    <div className="max-w-6xl mx-auto px-6">

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        De ce să ne alegi?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {valori.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg text-center"
          >
            <div className="text-5xl mb-6">
              {item.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              {item.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              {item.text}
            </p>
          </div>
        ))}

      </div>

    </div>

  </section>

 
  <section className="py-24">

    <div className="max-w-5xl mx-auto px-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center"
          >
            <div className="text-4xl font-bold text-pink-600 mb-3">
              {item.value}
            </div>

            <div className="text-gray-600 dark:text-gray-300">
              {item.label}
            </div>
          </div>
        ))}

      </div>

    </div>

  </section>


  <section className="max-w-6xl mx-auto px-6 py-24">

    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
      Inspirație Florală
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {gallery.map((image, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl shadow-xl"
        >
          <img
            src={image}
            alt="Galerie Florală"
            className="w-full h-72 object-cover hover:scale-105 transition duration-500"
          />
        </div>
      ))}

    </div>

  </section>


  <section className="pb-24 px-6">

    <div className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-r from-pink-500 to-rose-500 p-12 md:p-16 text-center text-white">

      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Fiecare floare spune o poveste
      </h2>

      <p className="text-lg md:text-xl mb-8">
        Descoperă colecțiile noastre și găsește aranjamentul perfect pentru orice moment special.
      </p>

      <a
        href="/aranjamente"
        className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full font-semibold"
      >
        Vezi Aranjamentele
      </a>

    </div>

  </section>

</main>

)
    
}