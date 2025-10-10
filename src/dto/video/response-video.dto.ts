import {AvailableResolutions} from "../../enum/available-resolutions";

export type ResponseVideoDto = {
    /**
     * response successfully created video
     */
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolutions[]
}
