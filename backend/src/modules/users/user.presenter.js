const presentUser = (user) => ({

    id: user.id,
    mobile: user.mobile,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt

});

module.exports = {
    presentUser
};