import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-input-2';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'react-phone-input-2/lib/style.css';
import { AC_LIST_EMPLOYEES, AC_DELETE_EMPLOYEE, AC_UPDATE_EMPLOYEE, AC_VIEW_EMPLOYEE } from '../../../actions/employe';
import ImportedUrl from '../../../utils/api';
import  { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

function Emp() {
   
    const dispatch = useDispatch();
    const Imageapi = ImportedUrl.API.imageretrival;
        const employeeList = useSelector(state => state.employee.employeeList); // Replace with your slice name and state property
     console.log(employeeList)
        const [viewEmployee, setViewEmployee] = useState(null);
        const [empid, setempid] = useState('');
        const [fname, setFname] = useState('');
        const [lname, setLname] = useState('');
        const [dob, setDob] = useState('');
        const [gender, setGender] = useState('');
        const [nationality, setNationality] = useState('');
        const [maritalStatus, setMaritalStatus] = useState('');
        const [profilePicture, setProfilePicture] = useState(null);
        const [profilePicturePreview, setProfilePicturePreview] = useState('');
        const [residentialAddress, setResidentialAddress] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('91');
        const [emailAddress, setEmailAddress] = useState('');
        const [emergencyName, setEmergencyName] = useState('');
        const [relationship, setRelationship] = useState('');
        const [emergencyAddress, setEmergencyAddress] = useState('');
        const [emergencyphone, setEmergencyphone] = useState('91');
        const [finalPhone, setFinalPhone] = useState(null);
        const [EmergencyFinalPhone, setEmergencyFinalPhone] = useState(null);
        const [errorFname, setErrorFname] = useState(false);
        const [errorLname, setErrorLname] = useState(false);
        const [errorDob, setErrorDOB] = useState(false);
        const [errorGender, setErrorGender] = useState(false);
        const [errorNationality, setErrorNationality] = useState(false);
        const [errorMaritalstatus, setErrorMartialstatus] = useState(false);
        const [errorProfilepicture, setErrorProfilepicture] = useState(false);
        const [errorResidentialaddress, setErrorResidentialaddress] = useState(false);
        const [errorEmailaddress, setErrorEmailaddress] = useState(false);
        const [errorName, setErrorName] = useState(false);
        const [errorRelation, setErrorRelation] = useState(false);
        const [errorEmergencyAddress, setErrorEmergencyAddress] = useState(false);
        const [errorSamemobilenumber, setErrorSamemobilenumber] = useState(false);
        const [phoneNumberError, setPhoneNumberError] = useState('');
        const [EmergencyphoneNumberError, setEmergencyPhoneNumberError] = useState('');
     
    const [errorFnameregex, setErrorFnameregex] = useState(false);
    const [errorLnameregex, setErrorLnameregex] = useState(false);
    const [errorFuturedob, setErrorFuturedob] = useState(false);
    const [errorEmailaddressregex, setErrorEmailaddressregex] = useState(false);
    const [errorNameregex, setErrorNameregex] = useState(false);
 
    const validatePhoneNumber = (inputPhoneNumber) => {
        if (!inputPhoneNumber) {
            setPhoneNumberError('Mobile number is required');
            return;
        }
        try {
            const phoneNumberObject = parsePhoneNumberFromString(`+${inputPhoneNumber}`);
            if (phoneNumberObject && phoneNumberObject.isValid()) {
                const formattedNumber = phoneNumberObject.formatInternational();
                setFinalPhone(formattedNumber);
                setPhoneNumberError('');
            } else {
                setFinalPhone('');
                setPhoneNumberError('Invalid phone number');
            }
        } catch (error) {
            setFinalPhone('enter the phone number');
          
        }
    };
    
    const validateEmergencyPhoneNumber = (inputPhoneNumber) => {
        if (!inputPhoneNumber) {
         
            setEmergencyFinalPhone('Emergency Mobile number is required');
            return;
        }
        try {
            const phoneNumberObject = parsePhoneNumberFromString(`+${inputPhoneNumber}`);
            const formattedNumber = phoneNumberObject.formatInternational();
            if (phoneNumberObject && phoneNumberObject.isValid()) {
                 
                setEmergencyFinalPhone(formattedNumber);
                setEmergencyPhoneNumberError('');
            } else {
                setEmergencyFinalPhone('');
                setEmergencyPhoneNumberError('Invalid phone number');
            }  
        } catch (error) {
            setEmergencyFinalPhone('enter the phone number');
           
        }
    };
    
    const handlePhoneInputChange = (value) => {
        setPhoneNumber(value);
        if (value) {
            if (value === emergencyphone) {
                setErrorSamemobilenumber(true); 
            } else {
                setErrorSamemobilenumber(false); 
            }
            validatePhoneNumber(value); 
        } else {
            setPhoneNumberError('Phone number is required');
        }
    };
    
    const handleEmergencyPhoneInputChange = (value) => {
        setEmergencyphone(value);
        if (value) {
            if (value === phoneNumber) {
                setErrorSamemobilenumber(true); 
            } else {
                setErrorSamemobilenumber(false); 
            }
            validateEmergencyPhoneNumber(value); 
        } else {
            setEmergencyPhoneNumberError('Emergency Mobile number is required');
        }
    };
    
    const Genderocour = (event) => {
        
        if(event.target.value){
            setErrorGender(false);
        } else {
            setErrorGender(true);
        }
        setGender(event.target.value);
    };

    const Martialchange = (event) => {
        if(event.target.value){ 
            setErrorMartialstatus(false);
        } else {
            setErrorMartialstatus(true);
        }
        setMaritalStatus(event.target.value);
    };
    const Relations = (event) => { 
        if(event.target.value){
            setErrorRelation(false);
        } else {
            setErrorRelation(true);
        }
        setRelationship(event.target.value);
    };
    const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
    "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", 
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", 
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland", "Ethiopia", 
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", 
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", 
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", 
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
    "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", 
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

useEffect(() => {
    fetchemp()
    console.log(employeeList.length)
    },[]);
    const fetchemp = async () => {
        try {
            await   AC_LIST_EMPLOYEES()(dispatch); 
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

   

    const handleDeleteEmployee = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch( AC_DELETE_EMPLOYEE(id));
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Employe has been deleted.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Employe is safe :)",
                    icon: "error"
                });
            }
        });
    };

    const handleEditEmployee = async (id) => {
        setempid(id);
        try {
            const data =await dispatch(AC_VIEW_EMPLOYEE(id));
            setFname(data.firstname);
            setLname(data.lastname);
            setDob(data.dob);
            setNationality(data.nationality);
            setGender(data.gender);
            setMaritalStatus(data.maritial);
            setResidentialAddress(data.address);
            setPhoneNumber(data.phone);
            setEmergencyphone(data.emergencyphone);
            setEmailAddress(data.emailid);
            setEmergencyName(data.emergencyname);
            setEmergencyAddress(data.emergencyaddress);
            setRelationship(data.relation);
            setFinalPhone(data.phone);
            setEmergencyFinalPhone(data.emergencyphone);
            setProfilePicture(data.dp);
            setProfilePicturePreview(Imageapi+data.dp);
            
            console.log(Imageapi+data.dp)
        } catch (error) {
            console.error('Error fetching employee details:', error);
         
        }
    };
   const handleViewEmployee = (id) => {
        const employee = employeeList.find(emp => emp._id === id);
        setViewEmployee(employee);
       
    };
    const handleCloseButton = () => {
        resetForm();
    };
    const handleDataChange = (event) => {
        const { id, value, files } = event.target;
        const Firstnameregex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
        const Lastnameregex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
        const currentDate = new Date();
        const Emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const Nameregex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

        switch (id) {
            case 'firstName':
                if (value) {
                    setErrorFname(false);
                    if (value.match(Firstnameregex)) {
                        setErrorFnameregex(false);
                    } else {
                        setErrorFnameregex(true);
                    }
                } else {
                    setErrorFname(true);
                    setErrorFnameregex(false);
                }
                setFname(value);
                break;
            case 'lastName':
                if (value) {
                    setErrorLname(false);
                    if (value.match(Lastnameregex)) {
                        setErrorLnameregex(false);
                    } else {
                        setErrorLnameregex(true);
                    }
                } else {
                    setErrorLname(true);
                    setErrorLnameregex(false);
                }
                setLname(value);
                break;
            case 'dob':
                if (value) {
                    const selectedDate = new Date(value);
                    setErrorDOB(false);
                    if (selectedDate <= currentDate) {
                        setErrorFuturedob(false);
                    } else {
                        setErrorFuturedob(true);
                    }
                } else {
                    setErrorDOB(true);
                    setErrorFuturedob(false);
                }
                setDob(value);
                break;
            case 'nationality':
                if (value) {
                    setErrorNationality(false);
                } else {
                    setErrorNationality(true);
                }
                setNationality(value);
                break;
            case 'residentialAddress':
                if (value) {
                    setErrorResidentialaddress(false);
                } else {
                    setErrorResidentialaddress(true);
                }
                setResidentialAddress(value);
                break;
            case 'emailAddress':
                if (value) {
                    setErrorEmailaddress(false);
                    if (value.match(Emailregex)) {
                        setErrorEmailaddressregex(false);
                    } else {
                        setErrorEmailaddressregex(true);
                    }
                } else {
                    setErrorEmailaddress(true);
                    setErrorEmailaddressregex(false);
                }
                setEmailAddress(value);
                break;
            case 'emergencyName':
                if (value) {
                    setErrorName(false);
                    if (value.match(Nameregex)) {
                        setErrorNameregex(false);
                    } else {
                        setErrorNameregex(true);
                    }
                } else {
                    setErrorName(true);
                    setErrorNameregex(false);
                }
                setEmergencyName(value);
                break;
            case 'relationship':
                if (value) {
                    setErrorRelation(false);
                } else {
                    setErrorRelation(true);
                }
                setRelationship(value);
                break;
            case 'emergencyAddress':
                if (value) {
                    setErrorEmergencyAddress(false);
                } else {
                    setErrorEmergencyAddress(true);
                }
                setEmergencyAddress(value);
                break;
            case 'profilePicture':
                if (files.length > 0) {
                    setProfilePicture(files[0]);
                    setProfilePicturePreview(URL.createObjectURL(files[0]));
                    setErrorProfilepicture(false);
                } else {
                    setProfilePicture(null);
                    setProfilePicturePreview('');
                    setErrorProfilepicture(true);
                }
                break;
            default:
                break;
        }
    };
    const resetForm = () => {
        setFname('');
        setLname('');
        setDob('');
        setNationality('');
        setGender('');
        setMaritalStatus('');
        setResidentialAddress('');
        setPhoneNumber('91');
        setEmergencyphone('91')
        setEmailAddress('');
        setEmergencyName('');
        setEmergencyAddress('');
        setRelationship('');
        setProfilePicture(null);
        setProfilePicturePreview('');
        setFinalPhone(null);
        setEmergencyFinalPhone(null);
        setErrorFname(false);
        setErrorLname(false);
        setErrorDOB(false);
        setErrorGender(false);
        setErrorNationality(false);
        setErrorMartialstatus(false);
        setErrorProfilepicture(false);
        setErrorResidentialaddress(false);
        setErrorEmailaddress(false);
        setErrorName(false);
        setErrorRelation(false);
        setErrorEmergencyAddress(false);
        setErrorSamemobilenumber(false);
        setPhoneNumberError('');
        setEmergencyPhoneNumberError('');
    };
    const Getdata = () => {
        if (fname) {
            setErrorFname(false);
        } else {
            setErrorFname(true);
        }
    
        if (lname) {
            setErrorLname(false);
        } else {
            setErrorLname(true);
        }
    
        if (dob) {
            setErrorDOB(false);
        } else {
            setErrorDOB(true);
        }
    
        if (gender) {
            setErrorGender(false);
        } else {
            setErrorGender(true);
        }
    
        if (nationality) {
            setErrorNationality(false);
        } else {
            setErrorNationality(true);
        }
    
        if (maritalStatus) {
            setErrorMartialstatus(false);
        } else {
            setErrorMartialstatus(true);
        }
    
        if (profilePicture) {
            setErrorProfilepicture(false);
        } else {
            setErrorProfilepicture(true);
        }
    
        if (residentialAddress) {
            setErrorResidentialaddress(false);
        } else {
            setErrorResidentialaddress(true);
        }
    
        if (emailAddress) {
            setErrorEmailaddress(false);
        } else {
            setErrorEmailaddress(true);
        }
    
        if (emergencyName) {
            setErrorName(false);
        } else {
            setErrorName(true);
        }
    
        if (relationship) {
            setErrorRelation(false);
        } else {
            setErrorRelation(true);
        }
    
        if (emergencyAddress) {
            setErrorEmergencyAddress(false);
        } else {
            setErrorEmergencyAddress(true);
        }
    
        if (emergencyphone) {
            setEmergencyPhoneNumberError(' ');
        } else {
            setEmergencyPhoneNumberError('Please enter emergency phone number');
        }
    
        if (phoneNumber) {
            setPhoneNumberError(' ');
        } else {
            setPhoneNumberError('Please enter phone number');
        }
    
        if (finalPhone == null) {
            setPhoneNumberError('Please enter phone number');
        } else {
            setPhoneNumberError('');
        }
    
        if (EmergencyFinalPhone == null) {
            setEmergencyPhoneNumberError('Please enter phone number');
        } else {
            setEmergencyPhoneNumberError('');
        }
    
        if (phoneNumberError) {
            setPhoneNumberError('Invalid phone number');
        }
    
        if (EmergencyphoneNumberError) {
            setEmergencyPhoneNumberError('Invalid phone number');
            setErrorSamemobilenumber(false);
        }
    
        if (
            !errorFname &&
            !errorLname &&
            !errorDob &&
            !errorGender &&
            !errorNationality &&
            !errorMaritalstatus &&
            !errorProfilepicture &&
            !errorResidentialaddress &&
            !errorEmailaddress &&
            !errorName &&
            !errorRelation &&
            !errorEmergencyAddress &&
            !errorSamemobilenumber &&
            !errorFnameregex &&
            !errorLnameregex &&
            !errorFuturedob &&
            !errorEmailaddressregex &&
            !errorNameregex &&
            !phoneNumberError &&
            !EmergencyphoneNumberError &&
            finalPhone !== null &&
            EmergencyFinalPhone !== null
        ) {
            console.log('Form submitted successfully with validated data:', {
                fname,
                lname,
                dob,
                gender,
                nationality,
                maritalStatus,
                profilePicture,
                residentialAddress,
                emailAddress,
                emergencyName,
                relationship,
                emergencyAddress,
                finalPhone,
                EmergencyFinalPhone,
            });
    
            const formData = new FormData();
            formData.append('id', empid);
            formData.append('firstname', fname);
            formData.append('lastname', lname);
            formData.append('dob', dob);
            formData.append('nationality', nationality);
            formData.append('gender', gender);
            formData.append('maritial', maritalStatus);
            formData.append('address', residentialAddress);
            formData.append('phone', finalPhone);
            formData.append('emailid', emailAddress);
            formData.append('emergencyname', emergencyName);
            formData.append('emergencyaddress', emergencyAddress);
            formData.append('relation', relationship);
            formData.append('emergencyphone', EmergencyFinalPhone);
            formData.append('dp', profilePicture);
    
            dispatch(AC_UPDATE_EMPLOYEE(empid,formData))
                .then(() => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Employee information has been updated.',
                        icon: 'success',
                    });
                    resetForm();
                    document.getElementById('closeMordalButton').click();
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to update employee information.',
                        icon: 'error',
                    });
                });
        } else {
            console.log('Some fields are empty or invalid');
            alert("Fill the required fields!");
        }
    };
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const handleDownload = (id) => {
        setSelectedEmployeeId(id);
       
        const modal = new window.bootstrap.Modal(document.getElementById('downloadModal'));
        modal.show();
    };
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const employee = employeeList.find(emp => emp._id === selectedEmployeeId);
        console.log("employe",employee)
        if (employee) {

           
            doc.text(`Employee Details: ${employee.firstname} ${employee.lastname}`, 10, 10); 
            doc.text(`Name: ${employee.firstname} ${employee.lastname}`, 10, 20);
            doc.text(`Date of Birth: ${employee.dob}`, 10, 30);
            doc.text(`Nationality: ${employee.nationality}`, 10, 40);
            doc.text(`Gender: ${employee.gender}`, 10, 50);
            doc.text(`Residential Address: ${employee.address}`, 10, 60);
            doc.text(`Email: ${employee.emailid}`, 10, 70);
            doc.text(`Phone: ${employee.phone}`, 10, 80);
            doc.text(`Emergency Contact Name: ${employee.emergencyname}`, 10, 90);
            doc.text(`Relationship: ${employee.relation}`, 10, 100);
            doc.text(`Emergency Address: ${employee.emergencyaddress}`, 10, 110);
            doc.text(`Emergency Phone: ${employee.emergencyphone}`, 10, 120);
    
            doc.save(`${employee.firstname} ${employee.lastname}.pdf`);
           }
        }

    const handleDownloadExcel = () => {
      
      
            const employee = employeeList.find(emp => emp._id === selectedEmployeeId);
          
            if (employee) {
             
              const wsData = [
         
                { Field: 'Name::', Value: `${employee.firstname} ${employee.lastname}` },
                { Field: 'Date of Birth', Value: employee.dob },
                { Field: 'Nationality', Value: employee.nationality },
                { Field: 'Gender', Value: employee.gender },
                { Field: 'Residential Address', Value: employee.address },
                { Field: 'Email', Value: employee.emailid },
                { Field: 'Phone', Value: employee.phone },
                { Field: 'Emergency Contact Name', Value: employee.emergencyname },
                { Field: 'Relationship', Value: employee.relation },
                { Field: 'Emergency Address', Value: employee.emergencyaddress },
                { Field: 'Emergency Phone', Value: employee.emergencyphone },
              ];
          
           
              const ws = XLSX.utils.json_to_sheet(wsData);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Employee Details');
          
             
              XLSX.writeFile(wb, `${employee.firstname}_${employee.lastname}_details.xlsx`);
            }
    }

    return (
        <>
            {/*     EMPLOYEE Tabel*/}
                <div class="page-header">
                    <div>
                <h3 class="page-title" style={{display:'inline'}}> EMPLOYEE'S -- </h3>
                <h3 class="page-title" style={{display:'inline'}}> {employeeList.length} </h3>
                </div>

               
          
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Employee</li>
                    </ol>
                </nav>
            </div>
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div className='d-flex justify-content-between mb-4'>
                            <h4 class="card-title">List Employes</h4>
                         <Link to='/addemp'> <button type="button" class="btn btn-gradient-primary btn-fw" >Add Employee</button></Link>   
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                   
                                    <th> Name</th>
                                    <th>Date of Birth</th>
                                    <th>Nationality</th>
                                    <th>Marital Status</th>
                                    <th>Actions</th>

                                 
                                </tr>
                            </thead>
                            <tbody>
                            {employeeList && employeeList.length > 0 && employeeList.map((employee)=> (
                                    <tr key={employee._id}>
                                  
                                        <td>{employee.firstname + ' '+employee.lastname}</td>
                                        <td>{employee.dob}</td>
                                        <td>{employee.nationality}</td>
                                        <td>{employee.maritial}</td>
                                    
                                        <td>
                                              <i class="mdi mdi-pencil-box" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => handleEditEmployee(employee._id)}/>
                                              <i class="mdi mdi-delete" onClick={() => handleDeleteEmployee(employee._id)}/>
                                              <i class="mdi mdi-eye"  data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => handleViewEmployee(employee._id)}/>
                                              <i className="mdi mdi-download" onClick={() => handleDownload(employee._id)} />
                                              
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

              {/*     UPDATE_EMPLOYEE */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='mortalclose' aria-label="Close" onClick={handleCloseButton}></button>
                        </div>
                        <div className="modal-body">
                                    
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-4'> Personal Details </h5>
                                        <div className="form-group">
                                            <label >First Name<code>*</code></label>
                                            <input type="text" className="form-control" id="firstName" placeholder="First Name" value={fname} onChange={handleDataChange} />
                                            {errorFname && <code style={{ color: 'red' }}>First Name is required</code>}
                                            {errorFnameregex && <code style={{ color: 'red' }}>firstname is in valid</code>}

                                        </div>
                                        <div className="form-group">
                                            <label >Last Name<code>*</code></label>
                                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lname} onChange={handleDataChange} />
                                            {errorLname && <code style={{ color: 'red' }}>Last Name is required</code>}
                                            {errorLnameregex && <code style={{ color: 'red' }}>Lastname is in valid</code>}

                                        </div>
                                        <div className="form-group">
                                            <label >Date of Birth<code>*</code></label>
                                            <input type="date" className="form-control" id="dob" value={dob} onChange={handleDataChange} />
                                            {errorDob && <code style={{ color: 'red' }}>Date of birth is required</code>}
                                            {errorFuturedob && <code style={{ color: 'red' }}>Valid date required</code>}

                                        </div>
                                        <div className="form-group">
                                        <label>Gender<code>*</code></label>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <div className="form-check">
                                                    <input type="radio" id="genderMale" name="gender" value="male" onChange={Genderocour} checked={gender === 'male'} />
                                                    <label className="ml-2" htmlFor="genderMale">Male</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" id="genderFemale" name="gender" value="female" onChange={Genderocour} checked={gender === 'female'} />
                                                    <label className="ml-2" htmlFor="genderFemale">Female</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="radio" id="genderOther" name="gender" value="other" onChange={Genderocour} checked={gender === 'other'} />
                                                    <label className="ml-2" htmlFor="genderOther">Other</label>
                                                </div>
                                            </div>
                                          
                                            {errorGender && <code style={{ color: 'red' }}>Gender is required</code>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nationality">Nationality</label>
                                        <input className="form-control" list="countries"  id="nationality" value={nationality}   onChange={handleDataChange}  placeholder='Nationality' />
                                        <datalist id="countries">
                                            {countries.map((country, index) => (
                                                <option key={index} value={country} />
                                            ))}
                                        </datalist>
                                            {errorNationality && <code style={{ color: 'red' }}>Nationality is required</code>}
                                        </div>
                                        <div className="form-group">
                                            <label >Marital Status<code>*</code></label>
                                            <select className="form-select pr-3 pl-3" style={{ fontSize: '13px', paddingLeft: '17px', padding: '12px', border: 'none' }} onChange={Martialchange} value={maritalStatus} aria-label="Marital Status">
                                                <option value="">Select Marital Status</option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                                <option value="divorced">Divorced</option>
                                                <option value="widowed">Widowed</option>
                                                <option value="separated">Separated</option>
                                                <option value="domesticPartnership">Domestic Partnership</option>
                                            </select>
                                            {errorMaritalstatus && <code style={{ color: 'red' }}>Marital status is required</code>}
                                            
                                        </div>
                                        <div className="form-group">
                                        <label>Profile Picture<code>*</code></label>
                                        <input type="file" className="form-control" id="profilePicture" onChange={handleDataChange} />
                                        {errorProfilepicture && <code style={{ color: 'red' }}>Profile picture is required</code>}
                                        {profilePicturePreview && (
                                            <img
                                                className="mt-3"
                                                src={profilePicturePreview}
                                                alt="Profile Preview"
                                                style={{ width: '200px', height: '200px', borderRadius: '100%' }}
                                            />
                                        )}
                                        </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-4'>Contact Information</h5>
                                        <div className="form-group">
                                            <label >Residential Address<code>*</code></label>
                                            <input type="text" className="form-control" id="residentialAddress" placeholder="Residential Address" value={residentialAddress} onChange={handleDataChange} />
                                            {errorResidentialaddress && <code style={{ color: 'red' }}>Residential address is required</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number<code>*</code></label>
                                            <div style={{ display: 'flex'}}>        
                                            <PhoneInput
                                                country={'in'}
                                                value={phoneNumber}
                                                onChange={handlePhoneInputChange} placeholder='xxxxx-xxxxx'
                                            inputStyle={{ width: '100%' , height:'46px', border:'none' }} /> 
                                            </div>
                                            {phoneNumberError && <code style={{ color: 'red' }}>{phoneNumberError}</code>}

                                        </div>
                                        <div className="form-group">
                                            <label>Email Address<code>*</code></label>
                                            <input type="email" className="form-control" id="emailAddress" placeholder="Email Address" value={emailAddress} onChange={handleDataChange} />
                                            {errorEmailaddress && <code style={{ color: 'red' }}>Email adress is required</code>}
                                            {errorEmailaddressregex && <code style={{ color: 'red' }}>Valid Email adress is required</code>}


                                        </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-3'>Emergency Contacts</h5>
                                        <div className="form-group">
                                            <label >Name<code>*</code></label>
                                            <input type="text" className="form-control" id="emergencyName" placeholder="Name" value={emergencyName} onChange={handleDataChange} />
                                            {errorName && <code style={{ color: 'red' }}>Name is required</code>}
                                            {errorNameregex && <code style={{ color: 'red' }}>Valid Name is required</code>}


                                        </div>
                                        <div className="form-group">
                                            <label >Relationship<code>*</code></label>
                                            <select className="form-select pr-3 pl-3" style={{ fontSize: '13px', paddingLeft: '17px', padding: '12px', border: 'none' }} onChange={Relations} value={relationship} aria-label="Relation">
                                                <option value="">Select Relation</option>
                                                <option value="father">Father</option>
                                                <option value="mother">Mother</option>
                                                <option value="spouse">Spouse</option>
                                                <option value="son">Son</option>
                                                <option value="daughter">Daughter</option>
                                                <option value="brother">Brother</option>
                                                <option value="sister">Sister</option>
                                                <option value="friend">Friend</option>
                                                <option value="colleague">Colleague</option>
                                                <option value="Guardian">Guardian</option>

                                            </select>
                                            {errorRelation && <code style={{ color: 'red' }}>Relation is required</code>}
                                        </div>
                                        <div className="form-group">
                                        <label>Emergency Phone Number<code>*</code></label>
                                            <div style={{ display: 'flex' }}>
                                            <PhoneInput
                                            country={'in'}
                                            value={emergencyphone}
                                            onChange={handleEmergencyPhoneInputChange}
                                            placeholder='xxxxx-xxxxx'
                                            inputStyle={{ width: '100%' , height:'46px', border:'none' }} />
                                            </div>
                                            {EmergencyphoneNumberError && <code style={{ color: 'red' }}>{EmergencyphoneNumberError}</code>}<br/>
                                            {errorSamemobilenumber && <code style={{ color: 'red' }}>Mobile Number and emergency Mobile number cannot be same</code>} </div>
                                         <div className="form-group">
                                            <label htmlFor="emergencyAddress">Address<code>*</code></label>
                                            <input type="text" className="form-control" id="emergencyAddress" placeholder="Address" value={emergencyAddress} onChange={handleDataChange} />
                                            {errorEmergencyAddress && <code style={{ color: 'red' }}>Emergency Address is required</code>}

                                        </div>
                                    </div>
                                </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='closeMordalButton' >Close</button>
                                <button type="button" className="btn btn-primary" onClick={Getdata}>Save changes</button>
                            </div>
                     
                    </div>
                </div>
            </div>
             {/*     VIEW_EMPLOYEE */}

            <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="viewModalLabel">View Employee</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeViewModalButton"></button>
            </div>
            <div className="modal-body">
                {viewEmployee && (
                    <div>
                        <div className="card mb-3">
                            <div className="card-header">
                                <h5>Personal Information</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>ID:</strong> {viewEmployee._id}</p>
                                        <p><strong>Name:</strong> {viewEmployee.firstname} {viewEmployee.lastname}</p>
                                        <p><strong>Date of Birth:</strong> {viewEmployee.dob}</p>
                                        <p><strong>Nationality:</strong> {viewEmployee.nationality}</p>
                                        <p><strong>Gender:</strong> {viewEmployee.gender}</p>
                                    </div>
                                    <div className="col-md-6">
                                        {viewEmployee.dp && (
                                            <div>
                                                <p><strong>Profile Picture:</strong></p>
                                                <img src={Imageapi + viewEmployee.dp} alt="Profile" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-header">
                                <h5>Contact Information</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Residential Address:</strong> {viewEmployee.address}</p>
                                <p><strong>Email Address:</strong> {viewEmployee.emailid}</p>
                                <p><strong>Phone Number:</strong> {viewEmployee.phone}</p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-header">
                                <h5>Emergency Contact Information</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Emergency Contact Name:</strong> {viewEmployee.emergencyname}</p>
                                <p><strong>Relationship:</strong> {viewEmployee.relation}</p>
                                <p><strong>Emergency Address:</strong> {viewEmployee.emergencyaddress}</p>
                                <p><strong>Emergency Phone Number:</strong> {viewEmployee.emergencyphone}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
         </div>
  {/* Download Modal */}
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

export default Emp;