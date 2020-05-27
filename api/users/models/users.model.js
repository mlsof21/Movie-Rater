const userSchema = new userSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

const userModel = mongoose.model('Users', userSchema);