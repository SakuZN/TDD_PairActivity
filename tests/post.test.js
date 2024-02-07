const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            title: 'My first test post',
            content: 'Random content',
            author: 'stswenguser'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;
    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    // ==================================== END OF CREATE TEST CASE

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });


        it('should return the updated post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            updatePostStub = sinon.stub(PostModel, 'update').yields(null, expectedResult);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.update, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: expectedResult.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: expectedResult.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: expectedResult.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            updatePostStub = sinon.stub(PostModel, 'update').yields(error);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.update, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    // ==================================== END OF UPDATE TEST CASE

    describe('findPost', () => {

        var findPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            findPostStub.restore();
        });

        it('should return the post object given the id', () => {
            // Arrange
            const postID = '507asdghajsdhjgasd';
            expectedResult = {
                _id: postID,
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
            };

            req = {
                params: {
                    id: postID
                }
            };

            findPostStub = sinon.stub(PostModel, 'findIDPost').yields(null, expectedResult);

            // Act
            PostController.findPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.findIDPost, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ _id: postID }));
            sinon.assert.calledWith(res.json, sinon.match({ title: expectedResult.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: expectedResult.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: expectedResult.author }));
        });

        //Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            const postID = '507asdghajsdhjgasd';
            req = {
                params: {
                    id: postID
                }
            };

            findPostStub = sinon.stub(PostModel, 'findIDPost').yields(error);

            // Act
            PostController.findPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.findIDPost, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    })
});