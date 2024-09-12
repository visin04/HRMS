import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { AC_ADD_POLICY } from '../../../actions/policy';

function AddPolicy() {
    const dispatch = useDispatch();
    const [policyName, setPolicyName] = useState('');
    const [policyDescription, setPolicyDescription] = useState('');
    const [policyCategory, setPolicyCategory] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [policyDocument, setPolicyDocument] = useState(null);
    const [policyOwner, setPolicyOwner] = useState('');
    const [policyApprover, setPolicyApprover] = useState('');
    const [versionNumber, setVersionNumber] = useState('');
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState('');

    const [policyNameError, setPolicyNameError] = useState('');
    const [policyDescriptionError, setPolicyDescriptionError] = useState('');
    const [policyCategoryError, setPolicyCategoryError] = useState('');
    const [effectiveDateError, setEffectiveDateError] = useState('');
    const [policyDocumentError, setPolicyDocumentError] = useState('');
    const [policyOwnerError, setPolicyOwnerError] = useState('');
    const [policyApproverError, setPolicyApproverError] = useState('');
    const [versionNumberError, setVersionNumberError] = useState('');
    const [statusError, setStatusError] = useState('');

    const handleInputChange = (e) => {
        const { id, value, type, files } = e.target;

        switch (id) {
            case 'policyName':
                setPolicyNameError(!value ? 'Enter the policy name.' : '');
                setPolicyName(value);
                break;

            case 'policyDescription':
                setPolicyDescriptionError(!value ? 'Enter the policy description.' : '');
                setPolicyDescription(value);
                break;

            case 'policyCategory':
                setPolicyCategoryError(!value ? 'Select a policy category.' : '');
                setPolicyCategory(value);
                break;

            case 'effectiveDate':
                setEffectiveDateError(!value ? 'Select an effective date.' : '');
                setEffectiveDate(value);
                break;

            case 'expirationDate':
                setExpirationDate(value);
                break;

            case 'policyDocument':
                setPolicyDocumentError(!files[0] ? 'Please upload a policy document.' : '');
                setPolicyDocument(files[0]);
                break;

            case 'policyOwner':
                setPolicyOwnerError(!value ? 'Enter the policy owner.' : '');
                setPolicyOwner(value);
                break;

            case 'policyApprover':
                setPolicyApproverError(!value ? 'Enter the policy approver.' : '');
                setPolicyApprover(value);
                break;

            case 'versionNumber':
                setVersionNumberError(!value ? 'Enter the version number.' : '');
                setVersionNumber(value);
                break;

            case 'status':
                setStatusError(!value ? 'Select a status.' : '');
                setStatus(value);
                break;

            case 'comments':
                setComments(value);
                break;

            default:
                break;
        }
    };

    const resetForm = () => {
        setPolicyName('');
        setPolicyDescription('');
        setPolicyCategory('');
        setEffectiveDate('');
        setExpirationDate('');
        setPolicyDocument(null);
        setPolicyOwner('');
        setPolicyApprover('');
        setVersionNumber('');
        setStatus('');
        setComments('');

        setPolicyNameError('');
        setPolicyDescriptionError('');
        setPolicyCategoryError('');
        setEffectiveDateError('');
        setPolicyDocumentError('');
        setPolicyOwnerError('');
        setPolicyApproverError('');
        setVersionNumberError('');
        setStatusError('');
        document.getElementById('policyDocument').value=''
    };

    const handleSubmit = async () => {
        // Validation checks
        if (!policyName) setPolicyNameError('Enter the policy name.');
        if (!policyDescription) setPolicyDescriptionError('Enter the policy description.');
        if (!policyCategory) setPolicyCategoryError('Select a policy category.');
        if (!effectiveDate) setEffectiveDateError('Select an effective date.');
        if (!policyDocument) setPolicyDocumentError('Please upload a policy document.');
        if (!policyOwner) setPolicyOwnerError('Enter the policy owner.');
        if (!policyApprover) setPolicyApproverError('Enter the policy approver.');
        if (!versionNumber) setVersionNumberError('Enter the version number.');
        if (!status) setStatusError('Select a status.');

        // Ensure all required fields are valid before submitting
        if (
            policyName &&
            policyDescription &&
            policyCategory &&
            effectiveDate &&
            policyDocument &&
            policyOwner &&
            policyApprover &&
            versionNumber &&
            status
        ) {
            const formData = new FormData();
            formData.append('PolicyName', policyName);
            formData.append('PolicyDescription', policyDescription);
            formData.append('PolicyCategory', policyCategory);
            formData.append('EffectiveDate', effectiveDate);
            formData.append('ExpirationDate', expirationDate);
            formData.append('PolicyDocument', policyDocument);
            formData.append('PolicyOwner', policyOwner);
            formData.append('PolicyApprover', policyApprover);
            formData.append('VersionNumber', versionNumber);
            formData.append('Status', status);
            formData.append('Comments', comments);

            try {
                const result = await dispatch(AC_ADD_POLICY(formData));
                console.log(result)
                if (result.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Policy added successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    resetForm();
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Policy already exists",
                        showConfirmButton: true
                    });
                }
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "An unexpected error occurred",
                    showConfirmButton: true
                });
            }
        }
    };

    return (
        <>
            <div className="page-header">
                <h3 className="page-title"> Policy Management </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/policy">Policies</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Policy</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="card">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="staticBackdropLabel">Add Policy</h4>
                                </div>
                                <div className="modal-body">
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-4'>Policy Details</h5>
                                        <div className="form-group">
                                            <label>Policy Name<code>*</code></label>
                                            <input type="text" className="form-control" id="policyName" placeholder="Policy Name" value={policyName} onChange={handleInputChange} />
                                            {policyNameError && <p className='text-danger'>{policyNameError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Policy Description<code>*</code></label>
                                            <textarea className="form-control" id="policyDescription" placeholder="Policy Description" value={policyDescription} onChange={handleInputChange} rows="4" />
                                            {policyDescriptionError && <p className='text-danger'>{policyDescriptionError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Policy Category<code>*</code></label>
                                            <select className="form-select" id="policyCategory" onChange={handleInputChange} value={policyCategory} style={{   fontSize: "13px",
 }}>
                                                <option value="">Select Policy Category</option>
                                                <option value="employeeConduct">Employee Conduct</option>
                                                <option value="dataSecurity">Data Security</option>
                                                <option value="leavePolicy">Leave Policy</option>
                                            </select>
                                            {policyCategoryError && <p className='text-danger'>{policyCategoryError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Effective Date<code>*</code></label>
                                            <input type="date" className="form-control" id="effectiveDate" value={effectiveDate} onChange={handleInputChange} />
                                            {effectiveDateError && <p className='text-danger'>{effectiveDateError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Expiration Date</label>
                                            <input type="date" className="form-control" id="expirationDate" value={expirationDate} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Policy Document<code>*</code></label>
                                            <input type="file" className="form-control" id="policyDocument" accept='.pdf' onChange={handleInputChange} />
                                            {policyDocumentError && <p className='text-danger'>{policyDocumentError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Policy Owner<code>*</code></label>
                                            <input type="text" className="form-control" id="policyOwner" placeholder="Policy Owner" value={policyOwner} onChange={handleInputChange} />
                                            {policyOwnerError && <p className='text-danger'>{policyOwnerError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Policy Approver<code>*</code></label>
                                            <input type="text" className="form-control" id="policyApprover" placeholder="Policy Approver" value={policyApprover} onChange={handleInputChange} />
                                            {policyApproverError && <p className='text-danger'>{policyApproverError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Version Number<code>*</code></label>
                                            <input type="number" className="form-control" id="versionNumber" placeholder="Version Number" value={versionNumber} onChange={handleInputChange} />
                                            {versionNumberError && <p className='text-danger'>{versionNumberError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Status<code>*</code></label>
                                            <select className="form-select" id="status" onChange={handleInputChange} value={status} style={{   fontSize: "13px"}}>
                                                <option value="">Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="underReview">Under Review</option>
                                            </select>
                                            {statusError && <p className='text-danger'>{statusError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Comments</label>
                                            <textarea className="form-control" id="comments" placeholder="Comments" value={comments} onChange={handleInputChange} rows="3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddPolicy;
