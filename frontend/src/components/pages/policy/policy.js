import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AC_LIST_POLICIES, AC_DELETE_POLICY, AC_UPDATE_POLICY, AC_VIEW_POLICY } from '../../../actions/policy';
import ImportedUrl from '../../../utils/api';
import Swal from 'sweetalert2';
import  { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

function Policy() {
    const dispatch = useDispatch();
    const policyList = useSelector(state => state.policy.policyList);

    // Form fields state
    const [viewPolicy, setViewPolicy] = useState(null);
    const [id, setId] = useState('');
    const [policyName, setPolicyName] = useState('');
    const [policyDescription, setPolicyDescription] = useState('');
    const [policyCategory, setPolicyCategory] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [policyDocument, setPolicyDocument] = useState(null);
    const [policyDocumentName, setPolicyDocumentName] = useState('');
    const [policyOwner, setPolicyOwner] = useState('');
    const [policyApprover, setPolicyApprover] = useState('');
    const [versionNumber, setVersionNumber] = useState('');
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState('');
    const docapi = ImportedUrl.API.policyret;

    // Error state
    const [policyNameError, setPolicyNameError] = useState('');
    const [policyDescriptionError, setPolicyDescriptionError] = useState('');
    const [policyCategoryError, setPolicyCategoryError] = useState('');
    const [effectiveDateError, setEffectiveDateError] = useState('');
    const [policyDocumentError, setPolicyDocumentError] = useState('');
    const [policyOwnerError, setPolicyOwnerError] = useState('');
    const [policyApproverError, setPolicyApproverError] = useState('');
    const [versionNumberError, setVersionNumberError] = useState('');
    const [statusError, setStatusError] = useState('');

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            await dispatch(AC_LIST_POLICIES());
        } catch (error) {
            console.error('Error fetching policies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value, files } = e.target;

        switch (id) {
            case 'policyName':
                setPolicyNameError(value ? '' : 'Enter the policy name.');
                setPolicyName(value);
                break;
            case 'policyDescription':
                setPolicyDescriptionError(value ? '' : 'Enter the policy description.');
                setPolicyDescription(value);
                break;
            case 'policyCategory':
                setPolicyCategoryError(value ? '' : 'Select a policy category.');
                setPolicyCategory(value);
                break;
            case 'effectiveDate':
                setEffectiveDateError(value ? '' : 'Select an effective date.');
                setEffectiveDate(value);
                break;
            case 'expirationDate':
                setExpirationDate(value);
                break;
            case 'policyDocument':
                setPolicyDocumentError(files[0] ? '' : 'Please upload a policy document.');
                setPolicyDocument(files[0]);
                setPolicyDocumentName(files[0] ? files[0].name : '');
                break;
            case 'policyOwner':
                setPolicyOwnerError(value ? '' : 'Enter the policy owner.');
                setPolicyOwner(value);
                break;
            case 'policyApprover':
                setPolicyApproverError(value ? '' : 'Enter the policy approver.');
                setPolicyApprover(value);
                break;
            case 'versionNumber':
                setVersionNumberError(value ? '' : 'Enter the version number.');
                setVersionNumber(value);
                break;
            case 'status':
                setStatusError(value ? '' : 'Select a status.');
                setStatus(value);
                break;
            case 'comments':
                setComments(value);
                break;
            default:
                break;
        }
    };

    const handleCloseButton = () => {
        resetForm();
    };

    const resetForm = () => {
        setPolicyName('');
        setPolicyDescription('');
        setPolicyCategory('');
        setEffectiveDate('');
        setExpirationDate('');
        setPolicyDocument(null);
        setPolicyDocumentName('');
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
    };

    const handleSubmit = async (id) => {
        if (!policyName) setPolicyNameError('Enter the policy name.');
        if (!policyDescription) setPolicyDescriptionError('Enter the policy description.');
        if (!policyCategory) setPolicyCategoryError('Select a policy category.');
        if (!effectiveDate) setEffectiveDateError('Select an effective date.');
        if (!policyOwner) setPolicyOwnerError('Enter the policy owner.');
        if (!policyApprover) setPolicyApproverError('Enter the policy approver.');
        if (!versionNumber) setVersionNumberError('Enter the version number.');
        if (!status) setStatusError('Select a status.');

        if (
            policyName &&
            policyDescription &&
            policyCategory &&
            effectiveDate &&
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
                await dispatch(AC_UPDATE_POLICY(id, formData));
                Swal.fire({
                    title: 'Success',
                    text: 'Policy information has been updated.',
                    icon: 'success',
                });
                resetForm();
                fetchPolicies();
                document.getElementById('closeMordalButton').click();
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update policy information.',
                    icon: 'error',
                });
            }
        } else {
            alert("Please fill in the required fields!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this policy?")) {
            try {
                await dispatch(AC_DELETE_POLICY(id));
                fetchPolicies();
            } catch (error) {
                console.error('Error deleting policy:', error);
            }
        }
    };

    const handleUpdate = async (id) => {
        try {
            const data = await dispatch(AC_VIEW_POLICY(id));

            const formattedEffectiveDate = data.EffectiveDate ? new Date(data.EffectiveDate).toISOString().split('T')[0] : '';
            const formattedExpirationDate = data.ExpirationDate ? new Date(data.ExpirationDate).toISOString().split('T')[0] : '';

            setId(data._id);
            setPolicyName(data.PolicyName);
            setPolicyDescription(data.PolicyDescription);
            setPolicyCategory(data.PolicyCategory);
            setEffectiveDate(formattedEffectiveDate);
            setExpirationDate(formattedExpirationDate);
            setPolicyOwner(data.PolicyOwner);
            setPolicyApprover(data.PolicyApprover);
            setVersionNumber(data.VersionNumber);
            setStatus(data.Status);
            setPolicyDocumentName(data.PolicyDocument ? data.PolicyDocument.split('/').pop() : '');
            setComments(data.Comments);
        } catch (error) {
            console.error('Error fetching policy details:', error);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active':
                return 'badge badge-gradient-success';
            case 'inactive':
                return 'badge badge-gradient-danger';
            case 'underReview':
                return 'badge badge-gradient-warning text-dark';
            default:
                return '';
        }
    };

    const handleView = (id) => {
        const policy = policyList.find(pol => pol._id === id);
        setViewPolicy(policy);
    };
    const handleDownload = (id) => {
        setId(id); // Make sure to set the selected policy ID
        const modal = new window.bootstrap.Modal(document.getElementById('downloadModal'));
        modal.show();
    };
    
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const policy = policyList.find(pol => pol._id === id); // Use policyList and selectedPolicyId
    
        if (policy) {
            doc.text(`Policy Details: ${policy.PolicyName}`, 10, 10); 
            doc.text(`Name: ${policy.PolicyName}`, 10, 20);
            doc.text(`Description: ${policy.PolicyDescription}`, 10, 30);
            doc.text(`Category: ${policy.PolicyCategory}`, 10, 40);
            doc.text(`Effective Date: ${policy.EffectiveDate}`, 10, 50);
            doc.text(`Expiration Date: ${policy.ExpirationDate}`, 10, 60);
            doc.text(`Owner: ${policy.PolicyOwner}`, 10, 70);
            doc.text(`Approver: ${policy.PolicyApprover}`, 10, 80);
            doc.text(`Version: ${policy.VersionNumber}`, 10, 90);
            doc.text(`Status: ${policy.Status}`, 10, 100);
            doc.text(`Comments: ${policy.Comments}`, 10, 110);
    
            doc.save(`${policy.PolicyName}.pdf`);
        }
    };
    
    const handleDownloadExcel = () => {
        const policy = policyList.find(pol => pol._id === id); // Use policyList and selectedPolicyId
    
        if (policy) {
            const wsData = [
                { Field: 'Policy Name:', Value: policy.PolicyName },
                { Field: 'Description', Value: policy.PolicyDescription },
                { Field: 'Category', Value: policy.PolicyCategory },
                { Field: 'Effective Date', Value: policy.EffectiveDate },
                { Field: 'Expiration Date', Value: policy.ExpirationDate },
                { Field: 'Owner', Value: policy.PolicyOwner },
                { Field: 'Approver', Value: policy.PolicyApprover },
                { Field: 'Version', Value: policy.VersionNumber },
                { Field: 'Status', Value: policy.Status },
                { Field: 'Comments', Value: policy.Comments },
            ];
    
            const ws = XLSX.utils.json_to_sheet(wsData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Policy Details');
    
            XLSX.writeFile(wb, `${policy.PolicyName}_details.xlsx`);
        }
    };
    return (
        <>
            <div className="page-header">
                <div>
                    <h3 className="page-title" style={{ display: 'inline' }}>POLICIES</h3>
                </div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Forms</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Policy</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-between mb-4'>
                            <h4 className="card-title">List Policies</h4>
                            <Link to='/addpolicy'>
                                <button type="button" className="btn btn-primary btn-fw">Add Policy</button>
                            </Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Policy Name</th>
                                        <th>Policy Owner</th>
                                        <th>EffectiveDate</th>
                                        <th>ExpirationDate</th>
                                        <th>status</th>
                                        <th>document</th>
                                        <th>actions</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {policyList.map((policy, index) => (
                                        <tr key={policy._id}>
                                            <td>{index + 1}</td>
                                            <td>{policy.PolicyName}</td>
                                            <td>{policy.PolicyOwner}</td>
                                            <td>{new Date(policy.EffectiveDate).toLocaleDateString()}</td>
                                            <td>{new Date(policy.ExpirationDate).toLocaleDateString()}</td>
                                            <td>
                                                <label className={getStatusBadgeClass(policy.Status)}>{policy.Status}</label>
                                            </td>
                                            <td>
                                            <a href={`${docapi}${policy.PolicyDocument}`} target="_blank" rel="noopener noreferrer">
                                                <i className="mdi mdi-arrow-down"></i>
                                            </a>
                                            </td>
                                            <td>
                                            <i class="mdi mdi-eye" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => handleView(policy._id)}></i>
                                            <i class="mdi mdi-pencil-box" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleUpdate(policy._id)}></i>
                                                <i class="mdi mdi-delete" onClick={() => handleDelete(policy._id)}></i>
                                                <i className="mdi mdi-download" onClick={() => handleDownload(policy._id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Policy Modal */}
            <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewModalLabel">View Policy</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {viewPolicy && (
                                <div>
                                    <h5>Policy Name: {viewPolicy.PolicyName}</h5>
                                    <p>Description: {viewPolicy.PolicyDescription}</p>
                                    <p>Category: {viewPolicy.PolicyCategory}</p>
                                    <p>Effective Date: {new Date(viewPolicy.EffectiveDate).toLocaleDateString()}</p>
                                    <p>Expiration Date: {new Date(viewPolicy.ExpirationDate).toLocaleDateString()}</p>
                                    <p>Owner: {viewPolicy.PolicyOwner}</p>
                                    <p>Approver: {viewPolicy.PolicyApprover}</p>
                                    <p>Version Number: {viewPolicy.VersionNumber}</p>
                                    <p>Status: {viewPolicy.Status}</p>
                                    <p>Comments: {viewPolicy.Comments}</p>
                                    {viewPolicy.PolicyDocument && (
                                         <a href={`${docapi}${viewPolicy.PolicyDocument}`} target="_blank" rel="noopener noreferrer">document</a>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* update Policy Modal */}
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Update Policy</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeMordalButton"></button>
                        </div>
                        <div className="modal-body">
                            <form encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="policyName">Policy Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${policyNameError ? 'is-invalid' : ''}`}
                                        id="policyName"
                                        value={policyName}
                                        onChange={handleInputChange}
                                    />
                                    {policyNameError && <div className="invalid-feedback">{policyNameError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="policyDescription">Policy Description</label>
                                    <textarea
                                        className={`form-control ${policyDescriptionError ? 'is-invalid' : ''}`}
                                        id="policyDescription"
                                        value={policyDescription}
                                        onChange={handleInputChange}
                                    ></textarea>
                                    {policyDescriptionError && <div className="invalid-feedback">{policyDescriptionError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="policyCategory">Policy Category</label>
                                    <select
                                        className={`form-control ${policyCategoryError ? 'is-invalid' : ''}`}
                                        id="policyCategory"
                                        value={policyCategory}
                                        onChange={handleInputChange}
                                    >
                                         <option value="">Select Policy Category</option>
                                                <option value="employeeConduct">Employee Conduct</option>
                                                <option value="dataSecurity">Data Security</option>
                                                <option value="leavePolicy">Leave Policy</option>
                                    </select>
                                    {policyCategoryError && <div className="invalid-feedback">{policyCategoryError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="effectiveDate">Effective Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${effectiveDateError ? 'is-invalid' : ''}`}
                                        id="effectiveDate"
                                        value={effectiveDate}
                                        onChange={handleInputChange}
                                    />
                                    {effectiveDateError && <div className="invalid-feedback">{effectiveDateError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="expirationDate">Expiration Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="expirationDate"
                                        value={expirationDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="policyDocument">Policy Document</label>
                                    <input
                                        type="file"
                                        className={`form-control ${policyDocumentError ? 'is-invalid' : ''}`}
                                        id="policyDocument"
                                        onChange={handleInputChange}
                                    />
                                    {policyDocumentError && <div className="invalid-feedback">{policyDocumentError}</div>}
                                    {policyDocumentName && <p>Uploaded: {policyDocumentName}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="policyOwner">Policy Owner</label>
                                    <input
                                        type="text"
                                        className={`form-control ${policyOwnerError ? 'is-invalid' : ''}`}
                                        id="policyOwner"
                                        value={policyOwner}
                                        onChange={handleInputChange}
                                    />
                                    {policyOwnerError && <div className="invalid-feedback">{policyOwnerError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="policyApprover">Policy Approver</label>
                                    <input
                                        type="text"
                                        className={`form-control ${policyApproverError ? 'is-invalid' : ''}`}
                                        id="policyApprover"
                                        value={policyApprover}
                                        onChange={handleInputChange}
                                    />
                                    {policyApproverError && <div className="invalid-feedback">{policyApproverError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="versionNumber">Version Number</label>
                                    <input
                                        type="text"
                                        className={`form-control ${versionNumberError ? 'is-invalid' : ''}`}
                                        id="versionNumber"
                                        value={versionNumber}
                                        onChange={handleInputChange}
                                    />
                                    {versionNumberError && <div className="invalid-feedback">{versionNumberError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        className={`form-control ${statusError ? 'is-invalid' : ''}`}
                                        id="status"
                                        value={status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="underReview">Under Review</option>
                                    </select>
                                    {statusError && <div className="invalid-feedback">{statusError}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="comments">Comments</label>
                                    <textarea
                                        className="form-control"
                                        id="comments"
                                        value={comments}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseButton}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmit(id)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="downloadModal" tabIndex="-1" aria-labelledby="downloadModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="downloadModalLabel">Download Options</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <button type="button" className="btn btn-primary m-2" data-bs-dismiss="modal" id='closeMordalButton' onClick={handleDownloadPdf}>
                                <i className="bi bi-file-earmark-pdf me-2"></i>Download PDF
                            </button>
                            <button type="button" className="btn btn-secondary m-2 " data-bs-dismiss="modal" id='closeMordalButton' onClick={handleDownloadExcel}>
                                <i className="bi bi-file-earmark-excel me-2" ></i>Download Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Policy;
