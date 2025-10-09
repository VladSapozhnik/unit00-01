"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = void 0;
const available_resolutions_1 = require("../enum/available-resolutions");
const updateValidator = (data) => {
    const errors = [];
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2 || data.title.trim().length > 40) {
        errors.push({ message: 'Invalid title', field: 'title' });
    }
    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({ message: `Invalid author ${data.author}`, field: 'author' });
    }
    if (!data.availableResolutions) {
        errors.push({
            message: 'availableResolutions is required',
            field: 'availableResolutions',
        });
    }
    else if (data.availableResolutions) {
        if (!Array.isArray(data.availableResolutions)) {
            errors.push({ message: 'Invalid availableResolutions', field: 'availableResolutions' });
        }
        else if (!data.availableResolutions.length) {
            errors.push({ message: 'AvailableResolutions is not empty', field: 'availableResolutions' });
        }
        else {
            const isValidAvailableResolutions = data.availableResolutions.every((resolution) => Object.values(available_resolutions_1.AvailableResolutions).includes(resolution));
            if (!isValidAvailableResolutions) {
                errors.push({ message: 'Invalid resolution values', field: 'availableResolutions' });
            }
        }
    }
    if (data.canBeDownloaded === undefined) {
        errors.push({
            message: 'canBeDownloaded is required',
            field: 'canBeDownloaded',
        });
    }
    else if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== "boolean") {
        errors.push({ message: 'canBeDownloaded must be a boolean', field: 'canBeDownloaded', });
    }
    if (data.minAgeRestriction === undefined) {
        errors.push({
            message: 'minAgeRestriction is required',
            field: 'minAgeRestriction',
        });
    }
    else if (data.minAgeRestriction !== undefined) {
        if (data.minAgeRestriction !== null &&
            (typeof data.minAgeRestriction !== 'number' ||
                data.minAgeRestriction < 1 ||
                data.minAgeRestriction > 18)) {
            errors.push({ message: 'minAgeRestriction must be a number between 1 and 18 or null', field: 'minAgeRestriction', });
        }
    }
    if (typeof data.publicationDate !== 'string' || data.publicationDate.trim().length === 0) {
        errors.push({
            message: 'publicationDate must be a non-empty string in ISO format',
            field: 'publicationDate',
        });
    }
    else {
        const date = new Date(data.publicationDate);
        if (isNaN(date.getTime())) {
            errors.push({ message: 'Invalid date format', field: 'publicationDate', });
        }
    }
    return errors;
};
exports.updateValidator = updateValidator;
