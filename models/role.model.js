const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    role: {
        type: String,
        required: [true, 'Role is required']
    }
})


module.exports = model('Role', RolSchema);