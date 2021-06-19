import {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function Auth(props){
	const {onCloseModal, setTitleModal} = props;
	const [showLogin,setShowLogin] = useState(true);

	const ShowLoginForm = () =>{
		setTitleModal("Iniciar Sesión");
		setShowLogin(true);
	} 
	const ShowRegisterForm = () => {
		setTitleModal("Registro");
		setShowLogin(false); 
	} 

	return  showLogin ? <LoginForm ShowRegisterForm={ShowRegisterForm} onCloseModal={onCloseModal}/> : <RegisterForm ShowLoginForm={ShowLoginForm}/>;
}

