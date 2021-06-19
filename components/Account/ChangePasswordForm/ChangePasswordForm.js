import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {updatePasswordApi} from "../../../api/user";

 export default function ChangePasswordForm(props){
	const {user, logout, setReloadUser} = props;
	const [loading, setLoading ] = useState(false);
	const formik = useFormik({
		initialValues:initialValues(),
		validationSchema:Yup.object(validationSchema()),
		onSubmit: async (formData) =>{
			setLoading(true);
			const response = await updatePasswordApi(user.id,formData.password, logout );
			
			if(!response){
				toast.error("Error al actualizar el password");
			}else{
				logout();
			}
			setLoading(false);
			
		}
	});
	
	 return(
		 <div className="change-password-form">
			<h4>
				Cambia tu Clave
			</h4>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group widths="equal" >
					<Form.Input name="password" type="password" placeholder="Tu Nuevo Password" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
					<Form.Input name="repeatpassword" type="password" placeholder="Confirma tu nuevo Password"  onChange={formik.handleChange} value={formik.values.repeatpassword} error={formik.errors.repeatpassword}/>
				</Form.Group>
				<Button className="submit" loading={loading} > Actualizar</Button>
			</Form>
		 </div>
	 );
 }

 function initialValues (){
	return {
		password:"", 
		repeatpassword:"", 
	};
}

function validationSchema(){
	return{
		password:Yup.string().required(true).oneOf([Yup.ref("repeatpassword")],true),
		repeatpassword:Yup.string().required(true).oneOf([Yup.ref("password")],true)
	}
}

 