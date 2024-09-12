var POLICYSCHEMA = {
    PolicyName: String,
    PolicyDescription: String,
    PolicyCategory: String,
    EffectiveDate: Date,
    ExpirationDate: Date,
    PolicyDocument: String,
    PolicyOwner: String,
    PolicyApprover: String,
    VersionNumber: Number,
    Status: String,
    Comments: String,




    isDeleted: Boolean
}
module.exports = POLICYSCHEMA;