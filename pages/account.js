import React, {useState,useEffect} from 'react';
import {Icon} from "semantic-ui-react";
import {useRouter} from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import {getMeApi} from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm  from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AdressForm from "../components/Account/AdressForm/AdressForm";
import ListAdress from '../components/Account/ListAdress/ListAdress';


export default function account() {
  const [user,setUser] = useState(undefined);
  const {auth, logout, setReloadUser} = useAuth();
 
  const router = useRouter();

  useEffect(() => {
    
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  },[auth]);

  if(user === undefined) return null;
  if(!auth && !user){
    router.replace("/");
    return null;
  }
  return (
   
    <BasicLayout className="account">
      <Configuration user={user} logout={logout} setReloadUser={setReloadUser}/>
      <Adresses/>
    </BasicLayout>
   
  )
}

function Configuration(props){
  const {user, logout, setReloadUser} = props;
  return (
    <div className="account_configuration">
    <div className="title">Configuracion</div>
    <div className="data">
      <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />
      <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
      <ChangePasswordForm user={user} logout={logout} setReloadUser={setReloadUser} />
    </div>
  </div>
  );
 
}

function Adresses(){
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("");
   const [FormModal, setFormModal] = useState(null);
   const [reloadAddresses, setReloadAddresses] = useState(false);

    const openModal = (title, address) => {
      setTitleModal(title);
      setFormModal(<AdressForm setShowModal={setShowModal} setReloadAddresses={setReloadAddresses} newAddress={ address ?  false : true } address = {address || null }/>);
      setShowModal(true);
    }
  return(
    <div className="account_adresses">
      <div className="title"> 
        Direcciones <Icon name="plus" link  onClick={() => openModal("Nueva direccion")}/>
      </div>
      <div className="data">
        <ListAdress reloadAddresses={reloadAddresses} setReloadAddresses={setReloadAddresses} openModal={openModal} />
      </div>
      <BasicModal  show={showModal} setShow={setShowModal} title={titleModal}>
        {FormModal}
      </BasicModal>
    </div>
  );
}