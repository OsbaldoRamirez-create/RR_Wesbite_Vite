import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import '../Styles/QuoteStyles.css';

export default function Quote() {
    const [formData, setFormData] = useState({
        name: '', 
        phone: '', 
        subject: '', 
        email: '', 
        description: ''
    });
    const [errs, setErrs] = useState({});
    const [captchaValue, setCaptchaValue] = useState('');
    const recaptchaRef = useRef();
/*     const [message, setMessages] = useState(''); */
    const validateForm = (name, value)=>{
        let newErrs = {...errs};
        switch(name){
            case 'name':
                if(value.length < 3){
                    newErrs.name = 'Name must be at least 3 characters long';
                }else if(!/^[a-zA-Z][a-zA-Z\s'-]*$/.test(value)){
                    newErrs.name = 'Name must only contain letters and No leading spaces';
                }
                else{
                    delete newErrs.name;
                }
                break;
            case 'phone': {
                //phone validation for 10 digits or xxx-xxx-xxxx format(.e.g US numbers)
                const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
                if(!phoneRegex.test(value)){
                    newErrs.phone = 'Number must be 10 digits long or xxx-xxx-xxxx format';
                }else{
                    delete newErrs.phone;
                }
                break;
            }
            case 'email': {
                //email validation for almost all email formats
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if(!emailRegex.test(value)){
                    newErrs.email = 'Please enter a valid email (e.g. example@gmail.com)';
                }else{
                    delete newErrs.email;
                }
                break;
            }
            case 'description': {
                const scriptRegex = /<script|javascript:/i; //prevent script injection
                if (scriptRegex.test(value) || value.length < 5) { //description must be longer than 5 characters
                    newErrs.description = 'Please enter a valid message or longer message';
                }else{
                    delete newErrs.description;
                } 
                break;
            }
            default:
                break;
        }
        setErrs(newErrs);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        validateForm(name,value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!captchaValue){
            alert('Please complete the reCAPTCHA');
            return;
        }

        Object.keys(formData).forEach((key)=>{
            validateForm(key, formData[key]);
        });
        try{
            const response = await fetch('/send-quote', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...formData, captcha_Value: captchaValue}),
            });
            const result = await response.json();
            if(response.ok){
                alert("Your quote was sent successfully! We'll get back to you soon");
                //clear form
                setFormData({name: '', phone: '', email: '', subject:'', description: ''});
                recaptchaRef.current.reset();
                setCaptchaValue('');
            }
            else{
                alert(result.error || 'Submission failed');
            }
        }
        catch(error){
                console.error(error);
                alert('An error occurred. Please try again later. Possibly to many requests');
            }
    };



  return (
<div className="quote-container">
        <h1> Request a Consultation</h1>
        <form id="landscaping-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <div className="form-class">
                    {errs.name && <p className='error'>{errs.name}</p>}
                    <input type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name*" 
                    required
                    className={errs.name ? 'input-error':''}/>
                    
                </div>
                <div className="form-class">
                    {errs.phone && <p className='error'>{errs.phone}</p>}
                    <input type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Phone Number*" 
                    required 
                    className={errs.phone ? 'input-error':''}/>
                </div>
                <div className="form-class">
                    {errs.email && <p className='error'>{errs.email}</p>}
                    <input type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email*" 
                    required
                    className={errs.email ? 'input-error':''}
                    />
                </div>
                <div className="form-class">
                    <select id='subject' name='subject' value={formData.subject} onChange={handleChange} required>
                    <option value='' disabled >Select a Service*</option>
                    <option value='Yard Maintenance'>Yard Maintenance</option>
                    <option value='Fencing'>Fencing</option>
                    <option value='Irrigation Systems'>Irrigation Systems</option>
                    <option value='Tree Work'>Tree Work</option>
                    <option value='Landscaping'>Landscaping</option>
                    <option value='Sod Installation'>Sod Installation</option>
                    <option value='Mulching and Planting'>Mulching and Planting</option>
                    <option value='Other'>Other</option>

                    </select>
                    <h4> *Free quotes only in the Bay Area CA all other locations subject to a fee depending on location</h4> 

                </div>
                </div>
            <div className="description-container">
                <div className="form-class">
                    {errs.description && <p className='error'>{errs.description}</p>}
                    <textarea id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Description:" 
                    required
                    className={errs.description ? 'input-error':''}></textarea>
                </div>
            </div>

            <div className="recaptcha">
            <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
            /> 
            
            </div>
        <div className="btn-container">
        <button type="submit"> Submit</button>
        </div>
    </form>
{/*     {message && <p>{message}</p>}*/}    
    </div>  
    )
}

