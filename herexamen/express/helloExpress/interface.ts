export interface thisIsMe {
    name: string;
    age: number;
    profilePic: string;
}

export interface PokemonSprites{
    front_shiny: string;
    back_shiny: string;
}


export interface pokemon {
    name: string;
    id: number;
    weight: number;
    sprites: PokemonSprites;
}