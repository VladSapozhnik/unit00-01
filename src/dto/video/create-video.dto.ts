import type {AvailableResolutions} from "../../enum/available-resolutions";

export type CreateVideoDto = {
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[]
}