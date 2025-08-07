import mongoose from "mongoose";

const CredentialSchema = new mongoose.Schema({
    userId:       {type: String, unique: true, required: true},
    email:        {type: String, unique: true, required: true},
    password:     {type: String, required: true},
    createdAt:    {type: Date, default: Date.now},
});

export default mongoose.model("Credential", CredentialSchema);