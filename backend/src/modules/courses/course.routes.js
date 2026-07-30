const router =
require('express').Router();

const auth =
require('../../middlewares/auth');

const resolveWorkspace =
require('../../middlewares/resolveWorkspace');

const workspaceRole =
require('../../middlewares/workspaceRole');

const activeSubscription =
require('../../middlewares/activeSubscription');

const canManageCourse =
require('../../middlewares/canManageCourse');

const controller =
require('./course.controller');

router.post(

    '/',

    auth,

    resolveWorkspace,

    workspaceRole(
        'owner',
        'manager',
        'teacher'
    ),

    activeSubscription,

    controller.create

);

router.put(

    '/:id',

    auth,

    resolveWorkspace,

    workspaceRole(
        'owner',
        'manager',
        'teacher'
    ),

    activeSubscription,

    canManageCourse,

    controller.update

);

router.delete(

    '/:id',

    auth,

    resolveWorkspace,

    workspaceRole(
        'owner',
        'manager',
        'teacher'
    ),

    activeSubscription,

    canManageCourse,

    controller.remove

);

module.exports = router;