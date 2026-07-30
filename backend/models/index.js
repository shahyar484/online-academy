const sequelize = require('../src/config/database');

const User = require('./User');
const OtpCode = require('./OtpCode');

const Workspace = require('./Workspace');
const Academy = require('./Academy');
const Membership = require('./Membership');
const SubscriptionPlan = require('./SubscriptionPlan');
const Subscription = require('./Subscription');
const Course = require('./Course');
const Enrollment = require('./Enrollment');
const Session = require('./Session');
const Attendance = require('./Attendance');


// ======================
// User ↔ Workspace
// ======================

User.hasMany(Workspace, {
    foreignKey: 'ownerId',
    as: 'ownedWorkspaces'
});

Workspace.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'owner'
});


// ======================
// Workspace ↔ Academy
// ======================

Workspace.hasOne(Academy, {
    foreignKey: 'workspaceId',
    as: 'academy'
});

Academy.belongsTo(Workspace, {
    foreignKey: 'workspaceId',
    as: 'workspace'
});


// ======================
// User ↔ Membership
// ======================

User.hasMany(Membership, {
    foreignKey: 'userId',
    as: 'memberships'
});

Membership.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});


// ======================
// Workspace ↔ Membership
// ======================

Workspace.hasMany(Membership, {
    foreignKey: 'workspaceId',
    as: 'members'
});

Membership.belongsTo(Workspace, {
    foreignKey: 'workspaceId',
    as: 'workspace'
});


// ======================
// Inviter ↔ Membership
// ======================

User.hasMany(Membership, {
    foreignKey: 'invitedBy',
    as: 'invitedMembers'
});

Membership.belongsTo(User, {
    foreignKey: 'invitedBy',
    as: 'inviter'
});

Workspace.hasMany(Subscription, {
    foreignKey: 'workspaceId',
    as: 'subscriptions'
});

Subscription.belongsTo(Workspace, {
    foreignKey: 'workspaceId',
    as: 'workspace'
});

SubscriptionPlan.hasMany(Subscription, {
    foreignKey: 'subscriptionPlanId',
    as: 'subscriptions'
});

Subscription.belongsTo(SubscriptionPlan, {
    foreignKey: 'subscriptionPlanId',
    as: 'plan'
});

Workspace.hasMany(Course, {

    foreignKey: 'workspaceId',

    as: 'courses'

});

Course.belongsTo(Workspace, {

    foreignKey: 'workspaceId',

    as: 'workspace'

});

Membership.hasMany(Course, {

    foreignKey: 'membershipId',

    as: 'courses'

});

Course.belongsTo(Membership, {

    foreignKey: 'membershipId',

    as: 'teacher'

});

Course.hasMany(Enrollment, {

    foreignKey: 'courseId',

    as: 'enrollments'

});

Enrollment.belongsTo(Course, {

    foreignKey: 'courseId',

    as: 'course'

});

Membership.hasMany(Enrollment, {

    foreignKey: 'membershipId',

    as: 'enrollments'

});

Enrollment.belongsTo(Membership, {

    foreignKey: 'membershipId',

    as: 'student'

});

Course.hasMany(

    Session,

    {

        foreignKey: 'courseId',

        as: 'sessions'

    }

);

Session.belongsTo(

    Course,

    {

        foreignKey: 'courseId',

        as: 'course'

    }

);

Session.hasMany(

    Attendance,

    {

        foreignKey:'sessionId',

        as:'attendances'

    }

);

Attendance.belongsTo(

    Session,

    {

        foreignKey:'sessionId',

        as:'session'

    }

);

Enrollment.hasMany(

    Attendance,

    {

        foreignKey:'enrollmentId',

        as:'attendances'

    }

);

Attendance.belongsTo(

    Enrollment,

    {

        foreignKey:'enrollmentId',

        as:'enrollment'

    }

);



module.exports = {

    sequelize,

    User,

    OtpCode,

    Workspace,

    Academy,

    Membership,

    SubscriptionPlan,

    Subscription,

    Course,

    Enrollment,

    Session,

    Attendance,

};