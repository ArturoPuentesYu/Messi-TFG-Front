import messiBarca from "../assets/Messi-barca.png";
import messiArgentina from "../assets/Messi-argentina.png";
import messiMiami from "../assets/Messi-miami.png";
import messiPsg from "../assets/messi-psg-t.png";
import AnimatedNumber from '../utils/animated-number';
import { useEffect, useState } from 'react';
import { MessiStats } from "../types/data.types";
import { PlayerService } from "../services/data.service";
import { Button, Image, Spinner } from "@nextui-org/react";
import { Title } from "rizzui";

const imgsClubs = [{
    img: messiArgentina,
    name: "ARG",
    colors: "bg-gradient-to-r from-[#6CACE4] via-white to-[#6CACE4]"
}, {
    img: messiBarca,
    name: "BAR",
    colors: "bg-gradient-to-r from-[#004D98] to-[#A50044]"
}, {
    img: messiPsg,
    name: "PSG",
    colors: "bg-gradient-to-r from-[#004170] via-[#DA291C] to-[#004170]"
}, {
    img: messiMiami,
    name: "MIAMI",
    colors: "bg-gradient-to-r from-[#231F20] via-[#F7B5CD] to-[#231F20]"
}];

const initialStats = {
    partidos_jugados: 0,
    goles: 0,
    asistencias: 0,
    tarjetas_amarillas: 0,
    tarjetas_rojas: 0,
    num_titulos: 0,
    goles_partidos: '0',
    asists_partidos: '0',
    gol_asist_partidos: '0',
};

const labelMap: { [key: string]: string } = {
    partidos_jugados: 'Partidos Jugados',
    goles: 'Goles',
    asistencias: 'Asistencias',
    tarjetas_amarillas: 'Tarjetas Amarillas',
    tarjetas_rojas: 'Tarjetas Rojas',
    num_titulos: 'Títulos',
    goles_partidos: 'Goles/Partido',
    asists_partidos: 'Asistencias/Partido',
    gol_asist_partidos: 'G+A/Partido',
};

const StatItem = ({ labelKey, value }: { labelKey: string, value: number | string }) => (
    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center bg-slate-50">
        <dt className="order-last text-sm md:text-md font-medium text-gray-500">{labelMap[labelKey]}</dt>
        <dd className="text-2xl font-extrabold text-stone-800 md:text-5xl">
            {typeof value === 'number' ? <AnimatedNumber finalNumber={value} duration={2000} /> : value}
        </dd>
    </div>
);


export const StatPage = () => {
    const [player, setPlayer] = useState<MessiStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentColor, setCurrentColor] = useState(-1);
    const [newColor, setNewColor] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [totalMessi, setTotalMessi] = useState(initialStats);
    const [objStats, setObjStats] = useState(initialStats);
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const playerService = new PlayerService();

    useEffect(() => {
        playerService.getMessiStats().then((response) => {
            if (response.status === 'ok') {
                const data = response.transactions;
                setPlayer(data);
                const result = data.reduce((totals: { partidos_jugados: any; goles: any; asistencias: any; tarjetas_amarillas: any; tarjetas_rojas: any; num_titulos: any; }, player: { partidos_jugados: any; goles: any; asistencias: any; tarjetas_amarillas: any; tarjetas_rojas: any; titulos: string | any[]; }) => ({
                    partidos_jugados: totals.partidos_jugados + player.partidos_jugados,
                    goles: totals.goles + player.goles,
                    asistencias: totals.asistencias + player.asistencias,
                    tarjetas_amarillas: totals.tarjetas_amarillas + player.tarjetas_amarillas,
                    tarjetas_rojas: totals.tarjetas_rojas + player.tarjetas_rojas,
                    num_titulos: totals.num_titulos + (player.titulos?.length || 0),
                }), initialStats);

                const calc = {
                    ...result,
                    goles_partidos: (result.goles / result.partidos_jugados).toFixed(2),
                    asists_partidos: (result.asistencias / result.partidos_jugados).toFixed(2),
                    gol_asist_partidos: ((result.goles + result.asistencias) / result.partidos_jugados).toFixed(2),
                };
                setTotalMessi(calc);
                setObjStats(calc);
                setIsLoading(false);
            }
        }).catch(() => {
            setIsLoading(false);
        });
    }, []);

    const setObject = (index: number) => {
        const selectedPlayer = player[index];
        const calc = {
            partidos_jugados: selectedPlayer.partidos_jugados,
            goles: selectedPlayer.goles,
            asistencias: selectedPlayer.asistencias,
            tarjetas_amarillas: selectedPlayer.tarjetas_amarillas,
            tarjetas_rojas: selectedPlayer.tarjetas_rojas,
            num_titulos: selectedPlayer.titulos?.length || 0,
            goles_partidos: (selectedPlayer.goles / selectedPlayer.partidos_jugados).toFixed(2),
            asists_partidos: (selectedPlayer.asistencias / selectedPlayer.partidos_jugados).toFixed(2),
            gol_asist_partidos: ((selectedPlayer.goles + selectedPlayer.asistencias) / selectedPlayer.partidos_jugados).toFixed(2),
        };
        setObjStats(calc);
    };

    const handleRenderChange = (name: string) => {
        setIsButtonLoading(true);
        setIsAnimating(true);

        let newColorClass = 'bg-gradient-to-r from-orange-500 to-yellow-300';
        let newIndex = -1;

        const clubIndex = imgsClubs.findIndex(club => club.name.toLowerCase() === name);
        if (clubIndex !== -1) {
            newColorClass = imgsClubs[clubIndex].colors;
            newIndex = clubIndex;
            setObject(newIndex);
        } else {
            setObjStats(totalMessi);
        }

        setNewColor(newColorClass);

        setTimeout(() => {
            setCurrentColor(newIndex);
            setIsAnimating(false);
            setIsButtonLoading(false);
        }, 500);  // Duration of the animation
    };

    if (isLoading) {
        return (
            <div className="w-full screen-minus-navbar flex justify-center items-center">
                <Spinner color="default" labelColor="foreground" />
            </div>
        );
    }

    return (
        <div className={`relative w-full screen-minus-navbar flex flex-col ${currentColor === -1 ? 'bg-gradient-to-b from-orange-500 to-yellow-300' : imgsClubs[currentColor].colors}`}>
            {isAnimating && <div className={`overlay absolute inset-0 ${newColor}`}></div>}
            <div className="flex flex-col m-[2%] gap-4">
                <div className="w-full text-center md:text-left lg:w-auto">
                    <Title as="h2" className={`italic ${currentColor > 0 ? 'text-white' : ''}`}> Estadísticas de Messi</Title>
                </div>
                <div className="flex gap-4 items-center justify-center flex-wrap">
                    <Button
                        onClick={() => handleRenderChange("total")}
                        isLoading={isButtonLoading} color="default"
                        variant="shadow"
                        className="bg-gradient-to-b from-orange-500 to-yellow-300">
                        TOTAL
                    </Button>
                    {imgsClubs.map((club) => (
                        <Button
                            key={club.name}
                            onClick={() => handleRenderChange(club.name.toLowerCase())}
                            isLoading={isButtonLoading}
                            variant="shadow"
                            className={club.colors}>
                            {club.name}
                        </Button>
                    ))}
                </div>
            <div className="flex h-full items-center justify-center">
                <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3 w-full">
                {Object.entries(objStats).map(([key, value]) => (
                    <StatItem key={key} labelKey={key} value={value} />
                ))}
                </dl>
            </div>

            </div>
        </div>
    );
};


export const StatContainers = () => {

    const [player, setPlayer] = useState<MessiStats[]>([]);
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
                    <div className={`flex flex-row items-center justify-center w-full gap-4 ${imgsClubs[index].colors}`}>
                        <div className="hidden md:flex items-start justify-center w-[50%]">
                            <Image src={imgsClubs[index].img} alt="messi-logo" radius="none" className="h-[10rem] md:h-[20rem] lg:h-[30rem]" isZoomed={true} />
                        </div>
                        <div className="flex items-start justify-center w-[80%] md:w-[50%]">

                            <div className="my-8 sm:my-12 mx-[2%]">
                                <h1
                                    className={`flex items-start justify-center text-4xl font-bold pb-2 ${index === 0 ? 'text-black-700' : 'text-slate-50'}`}
                                    >
                                    {club.club || club.pais}
                                </h1>
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