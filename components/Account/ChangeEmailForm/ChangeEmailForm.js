import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {updateEmailApi} from "../../../api/user";

 export default function ChangeEmailForm(props){
	 const {user, logout, setReloadUser} = props;
	 const [loading, setLoading ] = useState(false);

	const formik = useFormik({
		initialValues:initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) =>{
			setLoading(true);
			const response = await updateEmailApi(user.id,formData.email, logout );
			
			if(!response || response?.statusCode === 400){
				toast.error("Error al actualizar el email");
			}else{
				setReloadUser(true);
				toast.success("Datos actualizados");
				formik.handleReset();
			}
			setLoading(false);
		}
	});
	 return(
		 <div className="change-email-form">
			<h4>
				Cambia tu E-mail <span> (Tu e-mail actual: {user.email})</span>
			</h4>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group widths="equal" >
					<Form.Input name="email" placeholder="Tu Nuevo Email" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
					<Form.Input name="repeatemail" placeholder="Confirma tu nuevo Email"  onChange={formik.handleChange} value={formik.values.repeatemail} error={formik.errors.repeatemail}/>
				</Form.Group>
				<Button className="submit"  loading={loading}> Actualizar</Button>
			</Form>
		 </div>
	 );
 }

 function initialValues (){
	 return {
		 email:"", 
		 repeatemail:"", 
	 };
 }

 function validationSchema(){
	 return{
		 email:Yup.string().email(true).required(true).oneOf([Yup.ref("repeatemail")],true),
		 repeatemail:Yup.string().email(true).required(true).oneOf([Yup.ref("email")],true)
	 }
 }