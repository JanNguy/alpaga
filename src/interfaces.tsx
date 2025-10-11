export interface UserText {
    context: string;
    pathPP: string;
    message: string;
    type: "user" | "assistant";
}

export interface Unit {
    name: string;
    usage: string;
    parameters: string;
    weight: number;
    nb_dl: string;
    t_update: string; //number mais transformer en heure/jour/mois
    likes: number;
}