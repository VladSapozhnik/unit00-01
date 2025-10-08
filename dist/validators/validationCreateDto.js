"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateDto = void 0;
const index_1 = require("../index");
const validationCreateDto = (data) => {
    const errors = [];
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2 || data.title.trim().length > 40) {
        errors.push({ message: 'Invalid title', field: 'title', });
    }
    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({ message: 'Invalid author', field: 'author', });
    }
    if (!data.availableResolutions) {
        errors.push({
            message: 'availableResolutions is required',
            field: 'availableResolutions',
        });
    }
    else if (data.availableResolutions) {
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
    return errors;
};
exports.validationCreateDto = validationCreateDto;
