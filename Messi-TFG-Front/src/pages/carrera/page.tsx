import MessiDebut from '../../assets/Messi-debut.jpg'
import MessiTrofeos from '../../assets/Messi-trofeos.webp'
import { Accordion, AccordionItem, Image } from '@nextui-org/react'

const CarreraData = [
  {
    title: 'Debutó profesionalmente con el FC Barcelona en 2004.',
    content:
      'Lionel Messi hizo su debut oficial con el primer equipo del FC Barcelona el 16 de octubre de 2004 contra el Espanyol, iniciando así una carrera legendaria.'
  },
  {
    title: 'Ganó 10 títulos de La Liga y 4 Champions League con el Barcelona.',
    content:
      'Durante su tiempo en el FC Barcelona, Messi fue fundamental para que el club ganara 10 títulos de La Liga y 4 Champions League, estableciéndose como uno de los mejores equipos del mundo.'
  },
  {
    title: 'Gana su primer Balón de Oro en 2009.',
    content:
      'En 2009, Messi ganó su primer Balón de Oro, reconociéndolo como el mejor jugador del mundo tras una temporada excepcional con el Barcelona.'
  },
  {
    title: 'Récord de goles en un año calendario en 2012 con 91 goles.',
    content:
      'Messi rompió el récord de más goles en un año calendario en 2012, anotando 91 goles y superando la marca anterior de Gerd Müller de 85 goles.'
  },
  {
    title:
      'Gana el triplete con el Barcelona en la temporada 2008-2009 y 2014-2015.',
    content:
      'Messi fue clave en la obtención de dos tripletes históricos para el Barcelona, ganando La Liga, la Copa del Rey y la Champions League en ambas temporadas.'
  },
  {
    title: 'Anota su gol número 500 con el FC Barcelona en 2017.',
    content:
      'El 23 de abril de 2017, Messi anotó su gol número 500 con el Barcelona en una victoria 3-2 contra el Real Madrid en El Clásico.'
  },
  {
    title: 'Máximo goleador de la historia del FC Barcelona.',
    content:
      'Lionel Messi se convirtió en el máximo goleador de todos los tiempos del FC Barcelona, superando a jugadores legendarios y estableciendo un récord difícil de superar.'
  },
  {
    title: 'Gana la Copa América con Argentina en 2021.',
    content:
      'En 2021, Messi lideró a Argentina para ganar la Copa América, su primer gran título con la selección nacional, venciendo a Brasil en la final.'
  },
  {
    title: 'Gana su séptimo Balón de Oro en 2021.',
    content:
      'Lionel Messi ganó su séptimo Balón de Oro en 2021, destacándose aún más como uno de los mejores futbolistas de todos los tiempos.'
  },
  {
    title: 'Debuta con el Paris Saint-Germain en 2021.',
    content:
      'Messi hizo su esperado debut con el Paris Saint-Germain el 29 de agosto de 2021, marcando el comienzo de un nuevo capítulo en su carrera.'
  },
  {
    title: 'Gana la Copa del Mundo con Argentina en 2022.',
    content:
      'En 2022, Messi llevó a Argentina a la victoria en la Copa del Mundo, logrando el título más prestigioso del fútbol y cementando su legado.'
  },
  {
    title:
      'Supera a Pelé como el máximo goleador sudamericano en selecciones en 2021.',
    content:
      'Messi superó a Pelé como el máximo goleador sudamericano en partidos internacionales, alcanzando un nuevo hito en su carrera en 2021.'
  },
  {
    title: 'Anota su gol número 700 en competiciones de clubes en 2023.',
    content:
      'En 2023, Messi anotó su gol número 700 en competiciones de clubes, una hazaña impresionante que refleja su consistencia y talento a lo largo de los años.'
  },
  {
    title: 'Gana la Finalissima con Argentina en 2022.',
    content:
      'Messi lideró a Argentina para ganar la Finalissima en 2022, un torneo entre los campeones de Europa y América del Sur, reforzando su éxito internacional.'
  },
  {
    title: 'Máximo asistente de la historia de La Liga.',
    content:
      'Además de sus goles, Messi se convirtió en el máximo asistente en la historia de La Liga, demostrando su visión de juego y capacidad para crear oportunidades.'
  }
]

const MiCarrera = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-y-6 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 pb-10 pt-8">
      <header className="flex w-[80%] flex-row justify-between p-4 text-center sm:text-left">
        <h1 className="text-4xl font-bold">Biografía</h1>
      </header>

      <main className="flex w-[80%] flex-col justify-between rounded-lg border border-gray-500 px-6 py-4">
        <section className="flex flex-col rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold sm:mb-4">El 'GOAT'</h2>
          <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-6">
            <Image
              src={MessiDebut}
              alt="Lionel Messi debut"
              className="my-2 w-full rounded-lg shadow-md"
            />
            <p className="text-justify md:text-lg">
              Lionel Messi tambien conocido como 'El GOAT', es un futbolista
              argentino, considerado uno de los mejores jugadores de todos los
              tiempos. Nacido el 24 de junio de 1987 en Rosario, Argentina, Messi ha
              ganado numerosos títulos y premios a lo largo de su carrera.
            </p>
          </div>
        </section>

        <section className="mt-6 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 w-full text-2xl font-bold">Carrera</h2>
          <Image
            src={MessiTrofeos}
            alt="Trofeos de la carrera"
            className="mb-4 w-full rounded-lg shadow-md"
          />
          <Accordion>
            {CarreraData.map((item, index) => (
              <AccordionItem
                key={index}
                aria-label={`Accordion ${index + 1}`}
                title={item.title}
              >
                <p className="text-justify">{item.content}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  )
}

export default MiCarrera
