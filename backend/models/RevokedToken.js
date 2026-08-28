import mongoose from 'mongoose';

const RevokedTokenSchema = new mongoose.Schema(
    {
        jti: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        reason: {
            type: String,
            default: 'logout',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 604800, // 7 days automatic TTL expiration matching JWT lifespan
        },
    },
    { timestamps: true }
);

const RevokedToken = mongoose.model('RevokedToken', RevokedTokenSchema);

export default RevokedToken;
