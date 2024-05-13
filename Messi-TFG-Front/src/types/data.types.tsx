interface Titulo {
    año: number;
    nombre: string;
}

export interface MessiStats {
    nombre: string;
    pais: string;
    club?: string; 
    partidos_jugados: number;
    goles: number;
    asistencias: number;
    tarjetas_amarillas: number;
    tarjetas_rojas: number;
    debut: Date;
    titulos?: Titulo[]; 
}
