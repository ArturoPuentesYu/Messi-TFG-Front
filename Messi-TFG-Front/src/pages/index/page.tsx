import messiBarca from "../../assets/Messi-barca.png";
import messiArgentina from "../../assets/Messi-argentina.png";
import messiMiami from "../../assets/Messi-miami.png";
import messiPsg from "../../assets/messi-psg-t.png";
import indexWallpaper from "../../assets/wallpapersden.com_lionel-messi-4k-in-black_2560x1080.webp";
import { Image, Spinner } from "@nextui-org/react"
import { PlayerService } from "../../services/data.service";
import { useEffect, useState } from "react";
import { MessiStats } from "../../types/data.types";
const HomePage = () => {
  const [player, setPlayer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setError] = useState('');

  const playerService = new PlayerService();

  const imgsClubs = [{
    img: messiArgentina,
    name: "Argentina",
    colors: "from-[#6CACE4] via-white to-[#6CACE4]"
  },{
    img: messiBarca,
    name: "Barcelona",
    colors: "from-[#004D98] to-[#A50044]"
  },  {
    img: messiPsg,
    name: "",
    colors: "from-[#004170] via-[#DA291C] to-[#004170]"
  }, {
    img: messiMiami,
    name: "",
    colors: "from-[#231F20] via-[#F7B5CD] to-[#231F20]"
  }];


  useEffect(() => {
    playerService.getMessiStats().then((response) => {
      if (response.status === 'ok') {
        const data = response.transactions;
        setPlayer(data);
        setLoading(false);
        return data;
      }
    }).catch((error) => {
      setError(error);
      return errorMessage;
    });
  }, []);
  console.log(player);
  if (loading) {
    return (<Spinner label="Default" color="default" labelColor="foreground" />);
  } else {
    return (
      <>
        <div className="flex w-full">
          <Image src={indexWallpaper} alt="Messi campeón del mundo" height="100%" radius="none" shadow="lg" />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          {/* <div className="flex flex-row items-center justify-center w-full gap-4 bg-gradient-to-r from-[#004D98]  to-[#A50044]">
            <div className="flex items-start justify-center">

              <Image src={messiBarca} alt="messi-logo" radius="none" className="h-[10rem] md:h-[20rem] lg:h-[30rem]" isZoomed={true} />
            </div>
            <div className="flex flex-col items-start justify-center w-[50%]">

              <ul className="w-2/3">
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Club: </p>
                    <p className="ms-auto">Barcelona</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Partidos Jugados: </p>
                    <p className="ms-auto">778</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Goles: </p>
                    <p className="ms-auto">672</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Asistencias: </p>
                    <p className="ms-auto">305</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Tarjetas amarillas: </p>
                    <p className="ms-auto">78</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Tarjetas rojas: </p>
                    <p className="ms-auto">3</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Debut: </p>
                    <p className="ms-auto">16/10/2004</p>
                  </div>
                </li>
              </ul>


            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full gap-4 bg-gradient-to-r from-[#6CACE4] via-white  to-[#6CACE4]">
            <div className="flex items-start justify-center w-[50%]">
              <Image src={messiArgentina} alt="messi-logo" radius="none" className="h-[10rem] md:h-[20rem] lg:h-[30rem]" isZoomed={true} />
            </div>
            <div className="flex flex-col items-start justify-center w-[50%]">
              <ul className="w-2/3">
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Club: </p>
                    <p className="ms-auto">Barcelona</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Partidos Jugados: </p>
                    <p className="ms-auto">778</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Goles: </p>
                    <p className="ms-auto">672</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Asistencias: </p>
                    <p className="ms-auto">305</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Tarjetas amarillas: </p>
                    <p className="ms-auto">78</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Tarjetas rojas: </p>
                    <p className="ms-auto">3</p>
                  </div>
                </li>
                <li className="border-b-2 border-gray-300">
                  <div className="flex">
                    <p className="font-bold">Debut: </p>
                    <p className="ms-auto">16/10/2004</p>
                  </div>
                </li>
              </ul>


            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full gap-4 bg-gradient-to-r from-[#004170]  via-[#DA291C]  to-[#004170] ">
            <div className="flex items-start justify-center w-[50%]">
              <Image src={messiPsg} alt="messi-logo" radius="none" className="h-[10rem] md:h-[20rem] lg:h-[30rem]" isZoomed={true} />

            </div>
            <div className="flex items-start justify-center w-[50%]">

            </div>
          </div> */}

          {player.map((club: MessiStats, index: number) => {

            return (
            <div className={`flex flex-row items-center justify-center w-full gap-4 bg-gradient-to-r ${imgsClubs[index].colors}`}>
              <div className="hidden md:flex items-start justify-center w-[50%]">
                <Image src={imgsClubs[index].img} alt="messi-logo" radius="none" className="h-[10rem] md:h-[20rem] lg:h-[30rem]" isZoomed={true} />
              </div>
              <div className="flex items-start justify-center w-[80%] md:w-[50%]">

                <div className="my-8 sm:my-12 mx-[2%]">
                  <div className={`flex items-start justify-center text-4xl font-bold pb-2 ${index === 0 ? '':'text-slate-50'}`}>{club.club || club.pais}</div>
                  <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                      <dt className="order-last text-sm md:text-md font-medium text-gray-500">Partidos</dt>

                      <dd className="text-2xl font-extrabold text-blue-600 md:text-5xl">{club.partidos_jugados}</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                      <dt className="order-last text-sm md:text-md font-medium text-gray-500">Goles</dt>

                      <dd className="text-2xl font-extrabold text-blue-600 md:text-5xl">{club.goles}</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                      <dt className="order-last text-sm md:text-md font-medium text-gray-500">Asistencias</dt>

                      <dd className="text-2xl font-extrabold text-blue-600 md:text-5xl">{club.asistencias}</dd>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                      <dt className="order-last text-sm md:text-md font-medium text-gray-500">T. Amarillas</dt>

                      <dd className="text-2xl font-extrabold text-blue-600 md:text-5xl">{club.tarjetas_amarillas}</dd>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                      <dt className="order-last text-sm md:text-md font-medium text-gray-500">T. Rojas</dt>

                      <dd className="text-2xl font-extrabold text-blue-600 md:text-5xl">{club.tarjetas_rojas}</dd>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                      <dt className="order-last text-sm md:text-md font-medium text-gray-500">G+A/P</dt>

                      <dd className="text-2xl font-extrabold text-blue-600 md:text-5xl">{((club.goles+club.asistencias)/club.partidos_jugados).toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            );
          })}



        </div>
      </>
    );
  }
};

export default HomePage;
