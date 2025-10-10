import {AvailableResolutions} from "../enum/available-resolutions";
import type {ResponseVideoDto} from "../dto/video/response-video.dto";

export const db: {videos: ResponseVideoDto[]} = {
    videos: [
        {
            "id": 1,
            "title": "Как проходить проверку API автоматизированными тестами",
            "author": "it-incubator",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2025-10-07T08:06:59.355Z",
            "publicationDate": "2025-10-07T08:06:59.355Z",
            "availableResolutions": [
                AvailableResolutions.P240
            ],
        }
    ]
};