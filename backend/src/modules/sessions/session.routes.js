const router =
require('express').Router();

const controller =
require('./session.controller');

const auth =
require('../../middlewares/auth');

const resolveWorkspace =
require('../../middlewares/resolveWorkspace');

const workspaceRole =
require('../../middlewares/workspaceRole');

const activeSubscription =
require('../../middlewares/activeSubscription');

const canManageSession =
require('../../middlewares/canManageSession');

const canManageSessionCreation =
require('../../middlewares/canManageSessionCreation');

const canViewCourseSessions =
require('../../middlewares/canViewCourseSessions');

const ROLES =
require('../../constants/roles');

router.post(

    '/',

    auth,

    resolveWorkspace,

    workspaceRole(

        ROLES.OWNER,

        ROLES.MANAGER,

        ROLES.ASSISTANT,

        ROLES.TEACHER

    ),

    activeSubscription,

    canManageSessionCreation,

    controller.create

);

router.get(

    '/course/:courseId',

    auth,

    resolveWorkspace,

    workspaceRole(

        ROLES.OWNER,

        ROLES.MANAGER,

        ROLES.ASSISTANT,

        ROLES.TEACHER,

        ROLES.STUDENT

    ),

    activeSubscription,

    canViewCourseSessions,

    controller.list

);

router.get(

    '/:id',

    auth,

    resolveWorkspace,

    workspaceRole(

        ROLES.OWNER,

        ROLES.MANAGER,

        ROLES.ASSISTANT,

        ROLES.TEACHER,

        ROLES.STUDENT

    ),

    activeSubscription,

    canManageSession,

    controller.getById

);

router.put(

    '/:id',

    auth,

    resolveWorkspace,

    workspaceRole(

        ROLES.OWNER,

        ROLES.MANAGER,

        ROLES.ASSISTANT,

        ROLES.TEACHER

    ),

    activeSubscription,

    canManageSession,

    controller.update

);

router.delete(

    '/:id',

    auth,

    resolveWorkspace,

    workspaceRole(

        ROLES.OWNER,

        ROLES.MANAGER,

        ROLES.ASSISTANT,

        ROLES.TEACHER

    ),

    activeSubscription,

    canManageSession,

    controller.remove

);

module.exports = router;