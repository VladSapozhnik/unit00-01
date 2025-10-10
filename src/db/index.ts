import {AvailableResolutions} from "../enum/available-resolutions";
import type {VideoResponseDto} from "../types/video-response.type";

export const db: {videos: VideoResponseDto[]} = {
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