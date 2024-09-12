import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios';
import { AC_CLEAR_DEPARTMENT, AC_HANDLECHANGE_DEPARTMENT, AC_LIST_DEPARTMENT, AC_VIEW_DEPARTMENT} from '../../../actions/Department';
import ImportedUrl from '../../../utils/api';
import { Error, Success } from '../../../utils/Swalalermsg';




function Listdepartment(props) {
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [modelType, setModelType] = useState('Add');
    const dispatch = useDispatch();
    const fetchDepartments = async () => {
        try {
            await AC_LIST_DEPARTMENT()(dispatch); // Call AC_LIST_DEPARTMENT and pass dispatch
        } catch (error) {
            console.error('Error fetching DEPARTMENTs:', error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Access entire state 
    const listDepartmentReducer = useSelector((state) => state.departmentReducer);
    const data = {
        listdepartment: listDepartmentReducer.listdepartment,
        name: listDepartmentReducer.department && listDepartmentReducer.department.name,
        description: listDepartmentReducer.department && listDepartmentReducer.department.description,
    }
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'name') {
            if (value) {
                setNameError(false)
            } else {
                setNameError(true)
            }
        }
        if (name === 'description') {
            if (value) {
                setDescriptionError(false)
            } else {
                setDescriptionError(true)
            }
        }
        dispatch(AC_HANDLECHANGE_DEPARTMENT(name, value))
    }
    const handleClick = () => {
        let data = listDepartmentReducer.department;
        let valid = 1;
        if (!data.name) {
            setNameError(true);
            valid = 0
        }
        if (!data.description) {
            setDescriptionError(true);
            valid = 0
        }

        if (valid) {
            if (modelType === 'Add') {
                axios.post(ImportedUrl.API.addDepartment, data)
                    .then(res => {
                        AC_CLEAR_DEPARTMENT()(dispatch);
                        AC_LIST_DEPARTMENT()(dispatch);
                        Success('Department added successfully');
                        document.getElementById('closeModel').click();
                    })
                    .catch(err => {
                        let error = err.response?.status
                        if (error == 409) {
                            Error('Data is already exists!')
                        }
                    })
            } else {
                axios.post(ImportedUrl.API.updateDepartment + `/${data._id}`, data)
                    .then(res => {
                        AC_CLEAR_DEPARTMENT()(dispatch);
                        AC_LIST_DEPARTMENT()(dispatch);
                        Success('Department updated successfully')
                        document.getElementById('closeModel').click();
                    })
                    .catch(err => {
                        let error = err.response?.status
                        if (error == 409) {
                            Error('Data is already exists!')
                        }
                    })
            }
        }
    }
    const handleView = (ID) => {
        setModelType('View');
        dispatch(AC_VIEW_DEPARTMENT(ID));
    }
    const handleUpdate = (ID) => {
        setModelType('Edit');
        dispatch(AC_VIEW_DEPARTMENT(ID));
    }
    const handleClose = () => {
        AC_CLEAR_DEPARTMENT()(dispatch);
    }
    const handleStatus = (ID, Modal) => {
        Swal.fire({
            title: "Are you sure to change status?",
            // text: "You won't be able to revert this!",
            icon: "name",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(ImportedUrl.API.statusChange + `/${ID}/${Modal}`)
                    .then(res => {
                        AC_LIST_DEPARTMENT()(dispatch);
                        Swal.fire({
                            title: "Staus changed!",
                            text: "Your status has been updated.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        throw err;
                    })
            }
        });
    }
    const handleDelete = (ID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(ImportedUrl.API.softDeleteDepartment + `/${ID}`)
                    .then(res => {
                        AC_LIST_DEPARTMENT()(dispatch);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(err => {
                        throw err;
                    })

            }
        });
    }
    return (
        <>
            <div class="page-header">
                <h3 class="page-title"> DEPARTMENT's </h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Form elements</li>
                    </ol>
                </nav>
            </div>
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div className='d-flex justify-content-between mb-4'>
                            <h4 class="card-title">List Department</h4>
                            <button type="button" class="btn btn-gradient-primary btn-fw" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setModelType('Add')}>Add Department</button>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.listdepartment && data.listdepartment.length > 0 ? data.listdepartment.map(data => {
                                    return <tr key={data._is}>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td ><label style={{ cursor: "pointer" }} class={`badge ${data.status === true ? 'badge-success' : 'badge-danger'}`} onClick={() => handleStatus(data._id, 'departments')}>{data.status === true ? 'Active' : 'Inactive'}</label></td>
                                        <td>
                                            <i class="mdi mdi-eye" onClick={() => handleView(data._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                                            <i class="mdi mdi-pencil-box" onClick={() => handleUpdate(data._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" ></i>
                                            <i class="mdi mdi-delete" onClick={() => handleDelete(data._id)}></i>
                                        </td>
                                    </tr>
                                }) :
                                    // <tr><td >No record to</td></tr>
                                    null
                                }

                            </tbody>
                        </table>
                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">{modelType} Department</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                                    </div>
                                    {modelType === 'View' ?
                                        <div class="modal-body">
                                            <h5>{data.name}</h5>
                                            <p>{data.description}</p>
                                        </div>
                                        :
                                        <>
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Name<code>*</code></label>
                                                    <input type="text" name='name' value={data.name} onChange={handleChange} class="form-control" id="exampleInputUsername1" placeholder="Name" autoComplete='off' />
                                                    <code style={{ display: nameError ? 'block' : 'none' }}>Name is required</code>
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleTextarea1">Description<code>*</code></label>
                                                    <textarea class="form-control" id="exampleTextarea1" value={data.description} onChange={handleChange} rows="6" name='description' placeholder="Description"></textarea>
                                                    <code style={{ display: descriptionError ? 'block' : 'none' }}>Description is required</code>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" id='closeModel' data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                                <button type="button" class="btn btn-primary" onClick={() => handleClick()}>{modelType === 'Add' ? 'Save' : 'Update'} </button>
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listdepartment;