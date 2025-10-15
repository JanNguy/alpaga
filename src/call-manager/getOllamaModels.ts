import type { Unit } from "../utils/interfaces";
import { getStringModels } from "./getStringModels";
import { getStringDescriptions } from "./getDescModels";
import { ErrorLen } from "../utils/ErrorLen";

function fillDescName(names: string[], descs: string[]): Unit[] {
    const len1 = names.length;
    const len2 = descs.length;
    const units: Unit[] = [];

    if (len1 != len2) {
        ErrorLen(len1, len2);
    }
    for (let i = 0; i != len1; i++) {
        units.push({
            name: names[i],
            desc: descs[i],
            usage: "null",
            parameters: "null",
            weight: 0,
            nb_dl: 0,
            t_update: "",
            likes: 0,
        });
    }
    return units;
}

export async function getOllamaModels(): Promise<Unit[]> {
    const libraryUrl: string = "https://ollama.com/library";
    const models: string[] = await getStringModels(libraryUrl);
    const descs: string[] = await getStringDescriptions(libraryUrl);

    const uni: Unit[] = fillDescName(models, descs);

    return uni;
}
