const mongoose = require('mongoose');
// importing schemas to create model
const importedSchema = require('../schemas/faqschema');
const importedDepartmentSchema = require('../schemas/departmentschema');
const importedDocumentSchema = require('../schemas/documentschema');
const importedAllowanceSchema = require('../schemas/allowanceschema');
const importedAssetSchema = require('../schemas/assetinventroryschema');
const importedPolicySchema = require('../schemas/policyschema');




// Creating schema
const FaqSchema = mongoose.Schema(importedSchema, { timestamps: true, versionKey: false });
const DepartmentSchema = mongoose.Schema(importedDepartmentSchema, { timestamps: true, versionKey: false });
const DocumentSchema = mongoose.Schema(importedDocumentSchema, { timestamps: true, versionKey: false });
const AllowanceSchema = mongoose.Schema(importedAllowanceSchema, { timestamps: true, versionKey: false })
const AssetSchema = mongoose.Schema(importedAssetSchema , { timestamps: true, versionKey: false });
const PolicySchema = mongoose.Schema(importedPolicySchema , { timestamps: true, versionKey: false });

// Creating models
const FaqModel = mongoose.model('faqs', FaqSchema);
const DepartmentModel = mongoose.model('departments', DepartmentSchema);
const DocumentModel = mongoose.model('documents', DocumentSchema);
const AllowanceModel = mongoose.model('allowances', AllowanceSchema);
const AssetModel = mongoose.model('assets',AssetSchema);
const PolicyModel = mongoose.model('policys',PolicySchema);



module.exports = {
  faqs: FaqModel,
  departments: DepartmentModel,
  documents: DocumentModel,
  allowances: AllowanceModel,
  assets : AssetModel,
  policy: PolicyModel
} 
