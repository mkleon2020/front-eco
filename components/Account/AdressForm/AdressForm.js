import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";



export default function ChangePasswordForm(){

	const formik = useFormik({
		initialValues:initialValues(),
		validationSchema:Yup.object(validationSchema()),
		onSubmit:  (formData) => {
			console.log(formData);
		}
	});

	return(
		<Form onSubmit={formik.handleSubmit}>
			<Form.Input name="title" type="text" label="Titulo de la direccion" placeholder="Titulo de la direccion" onChange={formik.handleChange} value={formik.values.title} error={formik.errors.title}   />
				<Form.Group widths="equal" >
					<Form.Input name="name" type="text" label="Nombre y apellidos" placeholder="Nombre y apellidos" onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name} />
					<Form.Input name="adress" type="text" label="Direccion" placeholder="Direccion" onChange={formik.handleChange} value={formik.values.adress} error={formik.errors.adress}/>
				</Form.Group>
				<Form.Group widths="equal" >
					<Form.Input name="city" type="text" label="Ciudad" placeholder="Ciudad" onChange={formik.handleChange} value={formik.values.city} error={formik.errors.city}/>
					<Form.Input name="state" type="text" label="Estado/Provincia" placeholder="Estado/Provincia" onChange={formik.handleChange} value={formik.values.state} error={formik.errors.state}/>
				</Form.Group>
				<Form.Group widths="equal" >
					<Form.Input name="postalcode" type="text" label="Codigo postal" placeholder="Codigo postal" onChange={formik.handleChange} value={formik.values.postalcode} error={formik.errors.postalcode}/>
					<Form.Input name="phone" type="text" label="Numero de telefono" placeholder="Numero de telefono" onChange={formik.handleChange} value={formik.values.phone} error={formik.errors.phone}/>
				</Form.Group>
				<div className="actions">
					<Button className="submit" > Crear Direccion</Button>
				</div>
				
			</Form>
	);
}

function initialValues(){
	return{
		title:"",
		name:"",
		adress:"",
		city:"",
		state:"",
		postalcode:"",
		phone:"",
	
	}
}
function validationSchema(){
	return {
		title:Yup.string().required(true),
		name:Yup.string().required(true),
		adress:Yup.string().required(true),
		city:Yup.string().required(true),
		state:Yup.string().required(true),
		postalcode:Yup.string().required(true),
		phone:Yup.string().required(true),
	}
}