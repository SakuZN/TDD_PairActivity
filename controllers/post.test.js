const postController = require('./postController');
const postModel = require('../models/post');
const { validationResult } = require('express-validator');

jest.mock('express-validator');
jest.mock('../models/post');

describe('Post Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            session: { user: 'userId' },
            flash: jest.fn(), // Mock flash function
            redirect: jest.fn(), // Mock redirect function
            params: {id: ''},
        };

        res = {
            render: jest.fn(),
            redirect: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    validationResult.mockImplementation(() => ({
        isEmpty: () => false,
        array: () => [{ msg: 'Test Error Message' }],
    }));

    //TODO: Test case for Delete and Edit server side logic
    describe('Delete Post', () => {
        it('should redirect to home (/) if post is deleted', async () => {
            // Arrange
            req.params = { id: 'postId' };
            postModel.deleteById.mockImplementation((id, next) => next(null, {}));

            // Act
            await postController.deletePost(req, res);

            // Assertions
            expect(postModel.deleteById).toHaveBeenCalledWith('postId', expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/');
        });

        it('should handle errors during post deletion', async () => {
            // Arrange
            req.params = { id: 'postId' };
            const errorMessage = 'Error deleting post';
            postModel.deleteById.mockImplementation((id, next) => next(new Error(errorMessage)));

            // Act
            await postController.deletePost(req, res);

            // Assertions
            expect(postModel.deleteById).toHaveBeenCalledWith('postId', expect.any(Function));
            expect(req.flash).toHaveBeenCalledWith('error_msg', errorMessage);
            expect(res.redirect).toHaveBeenCalledWith('/');
        });

        it('should handle non-existent post during deletion', async () => {
            // Arrange
            req.params = { id: 'nonExistentId' };
            const errorMessage = 'Post not found';
            postModel.deleteById.mockImplementation((id, next) => next({ notFound: true }));

            // Act
            await postController.deletePost(req, res);

            // Assertions
            expect(postModel.deleteById).toHaveBeenCalledWith('nonExistentId', expect.any(Function));
            expect(req.flash).toHaveBeenCalledWith('error_msg', errorMessage);
            expect(res.redirect).toHaveBeenCalledWith('/');
        });
    });

    describe('Edit Post', () => {});
});
