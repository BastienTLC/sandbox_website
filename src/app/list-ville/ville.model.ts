export class VilleModel {
    rank: number;
    ville: string;
    description: string;
    population: number;
    superficie: number;
    code_postal: string;
    departement: string;
    region: string;
    population_evolution: Array<{annee: number, population: number}>;

    constructor(rank: number,ville: string, description: string, population: number, superficie: number, code_postal: string, departement: string, region: string, population_evolution: Array<{annee: number, population: number}>) {
        this.rank = rank
        this.ville = ville;
        this.description = description;
        this.population = population;
        this.superficie = superficie;
        this.code_postal = code_postal;
        this.departement = departement;
        this.region = region;
        this.population_evolution = population_evolution;
    }
}
