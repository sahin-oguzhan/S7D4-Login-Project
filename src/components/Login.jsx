import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";


const initialData = {
    email: "",
    password: "",
    terms: false,
}

export const errorMessages = {
    email: "Lütfen geçerli bir mail adresi giriniz",
    password: "Şifre en az 1 büyük harf, 1 küçük harf, 1 özel karakter, 1 rakam içermeli ve 8 karakterden uzun olmalı",
}

export default function Login() {

const [formData, setFormData] = useState(initialData);
const [isValid, setIsValid] = useState(false);
const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
});

const history = useHistory();

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

function handleChange(event) {
    let {name, checked, value, type} = event.target;
    value = type === "checkbox" ? checked : value;
    setFormData({...formData, [name]: value})

    if (name === "email"){
      if(validateEmail(value)){
        setErrors({...errors, [name]: false})
      } else {
        setErrors({...errors, [name]: true})
      }
    }

    if (name === "password"){
      if(validatePassword.test(value)){
        setErrors({...errors, [name]: false})
      } else {
        setErrors({...errors, [name]: true})
      }
    }

    if (name === "terms"){
      if (checked){
        setErrors({...errors, [name]: false})
      } else {
        setErrors({...errors, [name]: true})
      }
    }
}

function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
     history.push("/success");
    }
    setFormData(initialData);
}

useEffect(() => {
  if (validateEmail(formData.email) && validatePassword.test(formData.password) && formData.terms){
    setIsValid(true);
  } else {
    setIsValid(false);
  }
}, [formData])
    
    return (
<Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="email">
      Email:
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Email adresinizi giriniz"
      type="email"
      value={formData.email}
      onChange={handleChange}
      invalid={errors.email}
      data-cy="form-email"
    />
    {errors.email && (<FormFeedback data-cy="form-error-message">
      {errorMessages.email}
    </FormFeedback>)}
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Şifre:
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Şifrenizi giriniz"
      type="password"
      value={formData.password}
      onChange={handleChange}
      invalid={errors.password}
      data-cy="form-password"
    />
    {errors.password && (<FormFeedback data-cy="form-error-message">
      {errorMessages.password}
    </FormFeedback>)}
  </FormGroup>
  <FormGroup check>
    <Input type="checkbox" name="terms" id="terms" onChange={handleChange} invalid={errors.terms} data-cy="form-terms"/>
    <Label for="terms" check>
      Şartları kabul ediyorum.
    </Label>
  </FormGroup>
  <FormGroup className="text-center">
  <Button disabled={!isValid} className="button" data-cy="form-button">
    Kayıt Ol
  </Button>
  </FormGroup>
</Form>
    )
}