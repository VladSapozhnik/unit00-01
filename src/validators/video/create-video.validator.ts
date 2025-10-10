import {AvailableResolutions} from "../../enum/available-resolutions";
import type {ValidationError} from "../../types/error.type";
import type {CreateVideoDto} from "../../dto/video/create-video.dto";


export const createVideoValidator = (data: CreateVideoDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title ||  typeof data.title !== 'string' || data.title.trim().length < 2 || data.title.trim().length > 40) {
        errors.push({ message: 'Invalid title', field: 'title',  });
    }

    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({ message: 'Invalid author', field: 'author',  });
    }

    if (!data.availableResolutions) {
        errors.push({
            message: 'availableResolutions is required',
            field: 'availableResolutions',
        });
    } else if (data.availableResolutions) {
        if (!Array.isArray(data.availableResolutions)) {
            errors.push({ message: 'Invalid availableResolutions', field: 'availableResolutions' });
        } else if (!data.availableResolutions.length) {
            errors.push({ message: 'AvailableResolutions is not empty', field: 'availableResolutions' });
        } else {
            const isValidAvailableResolutions: boolean =  data.availableResolutions.every((resolution: string)  => (Object.values(AvailableResolutions) as string[]).includes(resolution));
            if (!isValidAvailableResolutions) {
                errors.push({ message: 'Invalid resolution values', field: 'availableResolutions' });
            }
        }
    }

    return errors;
}