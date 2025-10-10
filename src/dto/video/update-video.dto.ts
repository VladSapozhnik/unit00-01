import type {AvailableResolutions} from "../../enum/available-resolutions";

export type UpdateVideoDto = {
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[]
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    publicationDate: string,
}
