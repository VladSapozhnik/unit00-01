import request from "supertest";
import {app, HTTP_STATUS} from "../../src";

const exempleVideo = {
    "title": "Как проходить проверку API автоматизированными тестами",
    "author": "it-incubator",
    "availableResolutions": [
        "P144"
    ]
}

describe('/videos', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(HTTP_STATUS.NOT_CONTENT_204);
    })

    it("should return status 200 and empty array", async () => {
        await request(app).get('/videos').expect(HTTP_STATUS.OK_200, [])
    });

    it("should return 400 and not create video if request body attribute is empty", async () => {
        await request(app).post('/videos').send({...exempleVideo, title: ""}).expect(HTTP_STATUS.BAD_REQUEST_400);

        await request(app).get("/videos").expect(HTTP_STATUS.OK_200, []);
    })

    let createVideoBody: any = null;

    it("should create video with correct input data", async () => {
        const createdVideo = await request(app).post('/videos').send(exempleVideo).expect(HTTP_STATUS.CREATED_201);

        createVideoBody = createdVideo.body;
        expect(createVideoBody).toEqual({
            id: expect.any(Number),
            title: "Как проходить проверку API автоматизированными тестами",
            author: "it-incubator",
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [
                "P144"
            ]
        })

        await request(app).get('/videos').expect(HTTP_STATUS.OK_200, [createVideoBody]);
    })

    // it("should return 404 for non-existent video id", async () => {
    //     await request(app).get('/videos/' + -100).expect(HTTP_STATUS.NOT_FOUND_404)
    // })

    it("should return 200 and get video by id", async () => {
        const videoId: number = Number(createVideoBody.id);

        await request(app).get(`/videos/${videoId}`).expect(HTTP_STATUS.OK_200, createVideoBody);
    })

    it("should return 404 for non-existent video deletion", async () => {
        await request(app).delete('/videos/' + -100).expect(HTTP_STATUS.NOT_FOUND_404)
    })

    it('should delete video with correct input data', async () => {
        const videoId: number = Number(createVideoBody.id);

        await request(app).delete(`/videos/${videoId}`).expect(HTTP_STATUS.NOT_CONTENT_204);

        await request(app).get(`/videos/${videoId}`).expect(HTTP_STATUS.NOT_FOUND_404);
    })
})