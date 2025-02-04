export class Film {
    id?: number;
    name: string;
    category: string;
    imgLink: string;
    price: number;
    year: string;
    classification: string;
    star: string;
    episodios: string;
    description?: string;

    constructor(id: number,
        name: string,
        category: string,
        imgLink: string,
        price: number,
        year: string,
        classification: string,
        star: string,
        episodios: string,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.imgLink = imgLink;
        this.price = price;
        this.year = year;
        this.classification = classification;
        this.star = star;
        this.episodios = episodios;
        this.description = description;
    }
}