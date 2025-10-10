import type {AvailableResolutions} from "../../enum/available-resolutions";

export type UpdateVideoDto = {
    /**
     * data for updating a successfully found video
     */
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[]
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    publicationDate: string,
}
