const router =
require('express').Router();

const controller =
require('./attendance.controller');

const auth =
require('../../middlewares/auth');

const resolveWorkspace =
require('../../middlewares/resolveWorkspace');

const workspaceRole =
require('../../middlewares/workspaceRole');

const activeSubscription =
require('../../middlewares/activeSubscription');

const canManageAttendance =
require('../../middlewares/canManageAttendance');

const canManageSession =
require('../../middlewares/canManageSession');

const ROLES =
require('../../constants/roles');

router.get(

    '/session/:id',

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

    controller.listBySession

);

router.patch(

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

    canManageAttendance,

    controller.update

);

module.exports = router;