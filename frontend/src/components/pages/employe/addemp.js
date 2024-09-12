import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'react-phone-input-2/lib/style.css';
import Swal from 'sweetalert2';
import { AC_ADD_EMPLOYEE } from '../../../actions/employe';
import { Link } from 'react-router-dom';

function Addemp() {
    const dispatch = useDispatch();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState(null);
    const [nationality, setNationality] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emergencyName, setEmergencyName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [emergencyphone, setEmergencyphone] = useState('');
    const [emergencyAddress, setEmergencyAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [finalPhone, setFinalPhone] = useState(null);
    const [EmergencyFinalphone, setEmergencyFinalPhone] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [EmergencyphoneNumberError, setEmergencyPhoneNumberError] = useState('');
   
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
const Datachange = (event) => {
    const { id, value, files } = event.target;
    const Firstnameregex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    const Lastnameregex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    const currentDate = new Date();
    const Emailregex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
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
                if (value.match(Nameregex)) {
                    setErrorNationality(false);
                } else {
                    setErrorNationality(true);
                }
            } else {
                setErrorNationality(false);
                setErrorNationality("enter valid Nationality");
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
            const files = event.target.files;
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
        setProfilePicturePreview(null);
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
        document.getElementById('profilePicture').value = '';
    };

    const Getdata = async() => {
        if(fname){
            setErrorFname(false);
        } else {
            setErrorFname(true);
        }
        
        if(lname){
            setErrorLname(false);
        } else {
            setErrorLname(true);
        }
        
        if(dob){
            setErrorDOB(false);
        } else {
            setErrorDOB(true);
        }
        
        if(gender){
            setErrorGender(false);
        } else {
            setErrorGender(true);
        }
        
        if(nationality){
            setErrorNationality(false);
        } else {
            setErrorNationality(true);
        }
        
        if(maritalStatus){
            setErrorMartialstatus(false);
        } else {
            setErrorMartialstatus(true);
        }
        
        if(profilePicture){
            setErrorProfilepicture(false);
        } else {
            setErrorProfilepicture(true);
        }
        
        if(residentialAddress){
            setErrorResidentialaddress(false);
        } else {
            setErrorResidentialaddress(true);
        }
        
        if(emailAddress){
            setErrorEmailaddress(false);
        } else {
            setErrorEmailaddress(true);
        }
        
        if(emergencyName){
            setErrorName(false);
        } else {
            setErrorName(true);
        }
        
        if(relationship){
            setErrorRelation(false);
        } else {
            setErrorRelation(true);
        }
        
        if(emergencyAddress){
            setErrorEmergencyAddress(false);
        } else {
            setErrorEmergencyAddress(true);
        }
        
        if(emergencyphone){
            setEmergencyPhoneNumberError('');
        } else {
            setEmergencyPhoneNumberError('Please enter emergency phone number');
        }
        
        if(phoneNumber){
            setPhoneNumberError('');
        } else {
            setPhoneNumberError('Please enter phone number');
        }
        
        if(finalPhone == null){
            setPhoneNumberError('Please enter phone number');
        } else {
            setPhoneNumberError('');
        }
        
        if(EmergencyFinalphone == null){
            setEmergencyPhoneNumberError('Please enter phone number');
        } else {
            setEmergencyPhoneNumberError('');
        }
        
        if(phoneNumberError){
            setPhoneNumberError('Please enter phone number');
            setPhoneNumber('91');
        }
        
        if(EmergencyphoneNumberError){
            setEmergencyPhoneNumberError('Please enter phone number');
            setErrorSamemobilenumber(false);
            setEmergencyphone('91');
        }
        
        if (!errorFname && !errorLname && !errorDob && !errorGender && !errorNationality && !errorMaritalstatus &&
            !errorProfilepicture && !errorResidentialaddress && !errorEmailaddress && !errorName && !errorRelation &&
            !errorEmergencyAddress && !errorSamemobilenumber &&
            !errorFnameregex && !errorLnameregex && !errorFuturedob && !errorEmailaddressregex && !errorNameregex &&
            !phoneNumberError && !EmergencyphoneNumberError && finalPhone !== null && EmergencyFinalphone !== null ) {
            
            console.log('Form submitted successfully with validated data:', {
                fname, lname, dob, gender, nationality, maritalStatus,
                profilePicture, residentialAddress, emailAddress,
                emergencyName, relationship, emergencyAddress,
                finalPhone, EmergencyFinalphone
            });
        
            try {
                console.log('Form submitted successfully with validated data:', {
                    fname, lname, dob, gender, nationality, maritalStatus,
                    profilePicture, residentialAddress, emailAddress,
                    emergencyName, relationship, emergencyAddress,
                    finalPhone, EmergencyFinalphone
                });
    
                const formData = new FormData();
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
                formData.append('relation', relationship);
                formData.append('emergencyphone', EmergencyFinalphone);
                formData.append('emergencyaddress', emergencyAddress);
                formData.append('dp', profilePicture);
                console.log(formData);
    
                const result = await dispatch(AC_ADD_EMPLOYEE(formData));
               console.log(result)
                if (result.success == true) {
                    console.log('sssssssssssss')
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Employee added successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    console.log('nnnnnnnnn')
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title:'user Already exist' ,
                        showConfirmButton: true
                    });
                }
                resetForm();
            } catch (error) {
                console.error('Error adding employee:', error.message);
                resetForm();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: 'An unexpected error occurred',
                    showConfirmButton: true
                });
            }
        } else {
            alert("Fill the required fields!");
            console.log('Validation failed. Please correct errors before submitting.');
        }
    };
    return (
        <>
         <div class="page-header">
                <h3 class="page-title"> Employee   </h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/emp">Employee</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Add employee</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="card">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="staticBackdropLabel">Add Employee</h4>
                                </div>
                                <div className="modal-body">
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-4'> Personal Details </h5>
                                        <div className="form-group">
                                            <label>First Name<code>*</code></label>
                                            <input type="text" className="form-control" id="firstName" placeholder="First Name" value={fname} onChange={Datachange} />
                                            {errorFname && <code style={{ color: 'red' }}>First Name is required</code>}
                                            {errorFnameregex && <code style={{ color: 'red' }}>First name is invalid</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name<code>*</code></label>
                                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lname} onChange={Datachange} />
                                            {errorLname && <code style={{ color: 'red' }}>Last Name is required</code>}
                                            {errorLnameregex && <code style={{ color: 'red' }}>Last name is invalid</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Date of Birth<code>*</code></label>
                                            <input type="date" className="form-control" id="dob" value={dob} onChange={Datachange} />
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
                                            <input className="form-control" list="countries" id="nationality" value={nationality} onChange={Datachange} placeholder='Nationality' />
                                            <datalist id="countries">
                                                {countries.map((country, index) => (
                                                    <option key={index} value={country} />
                                                ))}
                                            </datalist>
                                            {errorNationality && <code style={{ color: 'red' }}>Nationality is required</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Marital Status<code>*</code></label>
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
                                            <input type="file" className="form-control" id="profilePicture" onChange={Datachange} style={{ background: 'white' }} accept="image/*" />
                                            {profilePicturePreview && <img src={profilePicturePreview} alt="Profile Preview" className="img-fluid" style={{ marginTop: '10px', maxWidth: '20%', height: '140px' }} />}
                                            {errorProfilepicture && <code style={{ color: 'red' }}>Profile picture is required</code>}
                                        </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-4'>Contact Information</h5>
                                        <div className="form-group">
                                            <label>Residential Address<code>*</code></label>
                                            <input type="text" className="form-control" id="residentialAddress" placeholder="Residential Address" value={residentialAddress} onChange={Datachange} />
                                            {errorResidentialaddress && <code style={{ color: 'red' }}>Residential address is required</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number<code>*</code></label>
                                            <div style={{ display: 'flex'}}>
                                                <PhoneInput
                                                    country={'in'}
                                                    value={phoneNumber}
                                                    onChange={handlePhoneInputChange}
                                                    placeholder='xxxxx-xxxxx'
                                                    inputStyle={{ width: '100%', height:'46px', border:'none' }}
                                                />
                                            </div>
                                            {phoneNumberError && <code style={{ color: 'red' }}>{phoneNumberError}</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address<code>*</code></label>
                                            <input type="email" className="form-control" id="emailAddress" placeholder="Email Address" value={emailAddress} onChange={Datachange} />
                                            {errorEmailaddress && <code style={{ color: 'red' }}>Email address is required</code>}
                                            {errorEmailaddressregex && <code style={{ color: 'red' }}>Valid Email address is required</code>}
                                        </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <h5 className='mb-3'>Emergency Contacts</h5>
                                        <div className="form-group">
                                            <label>Name<code>*</code></label>
                                            <input type="text" className="form-control" id="emergencyName" placeholder="Name" value={emergencyName} onChange={Datachange} />
                                            {errorName && <code style={{ color: 'red' }}>Name is required</code>}
                                            {errorNameregex && <code style={{ color: 'red' }}>Valid Name is required</code>}
                                        </div>
                                        <div className="form-group">
                                            <label>Relationship<code>*</code></label>
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
                                                <option value="guardian">Guardian</option>
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
                                                    inputStyle={{ width: '100%', height:'46px', border:'none' }}
                                                />
                                            </div>
                                            {EmergencyphoneNumberError && <code style={{ color: 'red' }}>{EmergencyphoneNumberError}</code>}<br/>
                                            {errorSamemobilenumber && <code style={{ color: 'red' }}>Mobile Number and emergency Mobile number cannot be the same</code>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emergencyAddress">Address<code>*</code></label>
                                            <input type="text" className="form-control" id="emergencyAddress" placeholder="Address" value={emergencyAddress} onChange={Datachange} />
                                            {errorEmergencyAddress && <code style={{ color: 'red' }}>Emergency Address is required</code>}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={Getdata}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</>
    );
}

export default Addemp;