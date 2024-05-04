import messiBarca from "../assets/Messi-barca.png";
import messiArgentina from "../assets/Messi-argentina.png";
import messiMiami from "../assets/Messi-miami.png";
import messiPsg from "../assets/messi-psg-t.png";
import indexWallpaper from "../assets/index-wallpaper.webp";
import { Image } from "@nextui-org/react"
const HomePage = () => {
  return (
    <>
      <div className="flex w-full mb-2">
        <Image src={indexWallpaper} alt="Messi campeón del mundo" height="100%" radius="none" shadow="lg" />
      </div>
      <div className="flex flex-col items-center justify-center w-full my-10">
        <div className="flex flex-row items-center justify-center gap-4">
          <Image src={messiBarca} alt="messi-logo" radius="none" className="h-[15rem] sm:h-[20rem] md:h-[50%]" isZoomed={true} />
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
        <Image src={messiArgentina} alt="messi-logo" width="50%" radius="none" className="" isZoomed={true} />
        <Image src={messiMiami} alt="messi-logo" width="50%" radius="none" className="" isZoomed={true} />
        <Image src={messiPsg} alt="messi-logo" width="50%" radius="none" className="" isZoomed={true} />
      </div>
    </>
  );
};

export default HomePage;
