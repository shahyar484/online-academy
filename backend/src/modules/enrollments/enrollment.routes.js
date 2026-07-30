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

const canManageEnrollment =
require('../../middlewares/canManageEnrollment');

const controller =
require('./enrollment.controller');

const canEnrollStudent =
require('../../middlewares/canEnrollStudent');

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

    canEnrollStudent,

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

        ROLES.TEACHER

    ),

    activeSubscription,

    controller.list

);

router.delete(

    '/:id',

    auth,

    resolveWorkspace,

    workspaceRole(

        ROLES.OWNER,

        ROLES.MANAGER,

        ROLES.ASSISTANT,

    ),
   

    activeSubscription,

    canManageEnrollment,

    controller.remove

);

module.exports = router;