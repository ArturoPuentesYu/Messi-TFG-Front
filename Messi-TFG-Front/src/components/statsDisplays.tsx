import messiBarca from "../assets/Messi-barca.png";
import messiArgentina from "../assets/Messi-argentina.png";
import messiMiami from "../assets/Messi-miami.png";
import messiPsg from "../assets/messi-psg-t.png";
import AnimatedNumber from '../utils/animated-number'
import { useEffect, useState } from 'react';
import { MessiStats } from "../types/data.types";
import { PlayerService } from "../services/data.service";
import { Button, Image, Link, Spinner } from "@nextui-org/react";
import { Title } from "rizzui";

const imgsClubs = [{
    img: messiArgentina,
    name: "ARG",
    colors: "from-[#6CACE4] via-white to-[#6CACE4]"
}, {
    img: messiBarca,
    name: "BAR",
    colors: "from-[#004D98] to-[#A50044]"
}, {
    img: messiPsg,
    name: "PSG",
    colors: "from-[#004170] via-[#DA291C] to-[#004170]"
}, {
    img: messiMiami,
    name: "MIAMI",
    colors: "from-[#231F20] via-[#F7B5CD] to-[#231F20]"
},];

export const StatPage = () => {
    const [player, setPlayer] = useState([]);
    const [errorMessage, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentColor, setCurrentColor] = useState(0);

    const playerService = new PlayerService();

    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const [animationTrigger, setAnimationTrigger] = useState(false);


    useEffect(() => {
        playerService.getMessiStats().then((response) => {
            if (response.status === 'ok') {
                const data = response.transactions;
                setPlayer(data);
                setIsLoading(false);
                return data;
            }
        }).catch((error) => {
            setError(error);
            return errorMessage;
        });
    }, []);

    const handleRenderChange = (name: string) => {
        setIsButtonLoading(true);
        setAnimationTrigger(true);
        setTimeout(() => setAnimationTrigger(false), 10); // Reiniciar animación
        switch (name) {
            case 'total':
                setCurrentColor(-1)
                break;
            case 'arg':
                setCurrentColor(0)

                break;
            case 'bar':
                setCurrentColor(1)

                break;
            case 'psg':
                setCurrentColor(2)

                break;
            case 'miami':
                setCurrentColor(3)

                break;

            default:
                break;
        }
        setTimeout(() => setAnimationTrigger(false), 10);
        setIsButtonLoading(false);
    }

    if (isLoading) {
        return (
            <div className="w-full screen-minus-navbar flex justify-center items-center">
                <Spinner color="default" labelColor="foreground" />
            </div>
        );
    }
    return (
        <div className={`w-full screen-minus-navbar flex flex-col bg-gradient-to-r ${currentColor === -1 ? 'bg-gradient-to-b from-orange-500 to-yellow-300' : imgsClubs[currentColor].colors} background-transition`}>
            < div className="flex flex-col m-[2%] gap-4">
                <div className="w-full text-center md:text-left lg:w-auto">
                    <Title as="h2" className={`italic ${currentColor > 0 ? 'text-white' : ''}`} > Estadísticas de Messi</Title>
                </div>
                <div className="flex gap-4 items-center justify-center flex-wrap">
                    <Button
                        onClick={() => handleRenderChange("total")}
                        isLoading={isButtonLoading} color="default"
                        variant="shadow"
                        className="bg-gradient-to-b from-orange-500 to-yellow-300">
                        TOTAL
                    </Button>
                    <Button
                        onClick={() => handleRenderChange("arg")}
                        isLoading={isButtonLoading}
                        variant="shadow"
                        className="bg-[#6CACE4]">
                        ARG
                    </Button>
                    <Button
                        onClick={() => handleRenderChange("bar")}
                        isLoading={isButtonLoading}
                        variant="shadow"
                        className="bg-gradient-to-r from-[#004D98] to-[#A50044] text-white">
                        BAR
                    </Button>
                    <Button
                        onClick={() => handleRenderChange("psg")}
                        isLoading={isButtonLoading} variant="shadow"
                        className="bg-gradient-to-r from-[#004170] via-[#DA291C] to-[#004170] text-white" >
                        PSG
                    </Button>
                    <Button
                        onClick={() => handleRenderChange("miami")}
                        isLoading={isButtonLoading} variant="shadow"
                        className=" bg-gradient-to-r from-[#231F20] from-10% to-[#F7B5CD] to-20%">
                        MIAMI
                    </Button>
                </div>

            </div>
        </div >
    )
}

export const StatContainers = () => {

    const [player, setPlayer] = useState([]);
    const [errorMessage, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const playerService = new PlayerService();
    useEffect(() => {
        playerService.getMessiStats().then((response) => {
            if (response.status === 'ok') {
                const data = response.transactions;
                setPlayer(data);
                setIsLoading(false);
                return data;
            }
        }).catch((error) => {
            setError(error);
            return errorMessage;
        });
    }, []);

    if (isLoading) {
        return (
            <div className="w-full screen-minus-navbar flex justify-center items-center">
                <Spinner color="default" labelColor="foreground" />
            </div>
        );
    }
    return (
        <>
            {player.map((club: MessiStats, index: number) => {

                return (
                    <div className={`flex flex-row items-center justify-center w-full gap-4 bg-gradient-to-r ${imgsClubs[index].colors}`}>
                        <div className="hidden md:flex items-start justify-center w-[50%]">
                            <Image src={imgsClubs[index].img} alt="messi-logo" radius="none" className="h-[10rem] md:h-[20rem] lg:h-[30rem]" isZoomed={true} />
                        </div>
                        <div className="flex items-start justify-center w-[80%] md:w-[50%]">

                            <div className="my-8 sm:my-12 mx-[2%]">
                                <Link
                                    className={`flex items-start justify-center text-4xl font-bold pb-2 ${index === 0 ? 'text-black-700' : 'text-slate-50'}`}
                                    underline="hover"
                                    href={`/estadisticas/${club.club || club.pais}`} >
                                    {club.club || club.pais}
                                </Link>
                                <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                                        <dt className="order-last text-sm md:text-md font-medium text-gray-500">Partidos</dt>

                                        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl"><AnimatedNumber finalNumber={club.partidos_jugados} duration={2000} /></dd>
                                    </div>

                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                                        <dt className="order-last text-sm md:text-md font-medium text-gray-500">Goles</dt>

                                        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl"><AnimatedNumber finalNumber={club.goles} duration={2000} /></dd>
                                    </div>

                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                                        <dt className="order-last text-sm md:text-md font-medium text-gray-500">Asistencias</dt>

                                        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl"><AnimatedNumber finalNumber={club.asistencias} duration={2000} /></dd>
                                    </div>
                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                                        <dt className="order-last text-sm md:text-md font-medium text-gray-500">T. Amarillas</dt>

                                        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl"><AnimatedNumber finalNumber={club.tarjetas_amarillas} duration={2000} /></dd>
                                    </div>
                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                                        <dt className="order-last text-sm md:text-md font-medium text-gray-500">T. Rojas</dt>

                                        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl"><AnimatedNumber finalNumber={club.tarjetas_rojas} duration={2000} /></dd>
                                    </div>
                                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
                                        <dt className="order-last text-sm md:text-md font-medium text-gray-500">G+A/P</dt>

                                        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl">{((club.goles + club.asistencias) / club.partidos_jugados).toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )

}