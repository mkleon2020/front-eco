import {useState} from "react";
import {Form,Button} from 'semantic-ui-react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import {loginApi,resetPassword} from "../../../api/user"; 
export default function LoginForm(props){
	
const {ShowRegisterForm,onCloseModal} = props;

const [loading,setLoading] = useState(false);

const {login} = useAuth();

const formik = useFormik({
	initialValues:initialValues(),
	//para las validaciones
	validationSchema:Yup.object(validationSchema),
	onSubmit:async (FormData) => {
		setLoading(true);
		const response = await loginApi(FormData);
		if(response?.jwt){
			login(response.jwt);
			onCloseModal();
		}else{
			toast.error("El email o la clave son incorrectas");
		}
		setLoading(false);
	},
});

const resetPassword = () =>{

	formik.setErrors({});
	const validateEmail = Yup.string().email().required();

	if(!validateEmail.isValidSync(formik.values.identifier)){
		formik.setErrors({identifier:true});
	}else{
		resetPassword(formik.values.identifier);
	}

}

	return(
		<Form className="login-form" onSubmit={formik.handleSubmit} >
			<Form.Input name="identifier" type="text" placeholder="Email" onChange={formik.handleChange} error={formik.errors.identifier} />
			<Form.Input name="password" type="password" placeholder="Clave" onChange={formik.handleChange} error={formik.errors.password} />
			<div className="actions">
					<Button type="button"  basic onClick={ShowRegisterForm}>
						Registrarse
					</Button>
					<div>
						<Button type="submit" className="submit" basic loading={loading}>
							Ingresar
						</Button>
						<Button type="submit" onClick={resetPassword}>
							Haz olvidado la contrasena?
						</Button>
					</div>
					
				</div>		
		</Form>
		);
	}


	function initialValues(){
		return{
			identifier:"",
			password:"",
		}

	}
	function validationSchema(){
		return{
			identifier:Yup.string().email(true).required(true),
			password:Yup.string().required(true)
		}
	}
