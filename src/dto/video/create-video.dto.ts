import type {AvailableResolutions} from "../../enum/available-resolutions";

export type CreateVideoDto = {
    /**
     * body crated video
     */
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[]
}