const { Text, Relationship, DateTimeUtc } = require('@keystonejs/fields');
const {
    AuthedRelationship,
} = require('@keystonejs/fields-authed-relationship');
const { atTracking } = require('@keystonejs/list-plugins');
const { access } = require('../access.js');

module.exports = {
    fields: {
        body: { type: Text },
        createdAt: {
            type: DateTimeUtc,
            format: 'dd/MM/yyyy HH:mm O',
            access: {
                read: access.userIsAdminOrOwner,
                update: false,
                create: false,
                delete: false,
            },
            defaultValue: () => new Date(),
        },
        creator: {
            type: AuthedRelationship,
            ref: 'User',
            many: false,
            isRequired: false,
        },
        task: {
            type: Relationship,
            ref: 'Task',
            many: false,
        },
    },
    labelResolver: (item) =>
        `${item.task} - ${item.body.slice(0, 25)}... - ${item.createdAt}`,
    // List-level access controls
    access: {
        read: access.userIsAdminOrOwner,
        update: access.userIsAdminOrOwner,
        create: access.userExists,
        delete: access.userIsAdminOrOwner,
    },
};
