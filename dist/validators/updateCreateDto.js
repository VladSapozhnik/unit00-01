"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateDto = void 0;
const index_1 = require("../index");
const validateUpdateDto = (data) => {
    const errors = [];
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2 || data.title.trim().length > 40) {
        errors.push({ message: 'Invalid title', field: 'title' });
    }
    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({ message: 'Invalid author', field: 'author' });
    }
    if (data.availableResolutions) {
        if (!Array.isArray(data.availableResolutions)) {
            errors.push({ message: 'Invalid author', field: 'availableResolutions' });
        }
        else {
            const isValidAvailableResolutions = data.availableResolutions.every((resolution) => Object.values(index_1.AvailableResolutions).includes(resolution));
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
    if (!data.publicationDate) {
        errors.push({
            message: 'publicationDate is required',
            field: 'publicationDate',
        });
    }
    else if (data.publicationDate !== undefined) {
        const date = new Date(data.publicationDate);
        if (isNaN(date.getTime())) {
            errors.push({ message: 'Invalid date', field: 'publicationDate', });
        }
    }
    return errors;
};
exports.validateUpdateDto = validateUpdateDto;
