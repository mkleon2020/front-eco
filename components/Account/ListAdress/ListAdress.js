import React, {useState,useEffect} from "react";
import {Grid, Button} from "semantic-ui-react";
import { map,size } from "lodash";
import useAuth from "../../../hooks/useAuth";
import {getAdresses, deleteAdress} from "../../../api/address";



export default function ListAdress(props){
	const {reloadAddresses, setReloadAddresses, openModal} = props;
	const [addresses,setAddresses] = useState(null);
	const {auth,logout } = useAuth();
	console.log(props);
	useEffect(() => {
		(async ()=> {
			const response = await getAdresses(auth.idUser, logout);
			setAddresses( response || []);
			setReloadAddresses(false);
			
		})();
	},[reloadAddresses]);

	if(!addresses) return null;
	return(
		<div className="list-address">
			{size(addresses) === 0 ? (
				<h1>No hay ninguna direccion creada</h1>
			) : (
				<Grid>
					{map(addresses, (address) => (
						<Grid.Column key={address.id}	mobile={16} tablet={8} computer={4}>
							<Address address={address} logout={logout} setReloadAddresses={setReloadAddresses} openModal={openModal} />
						</Grid.Column>
					))}
				</Grid>
			)}
		</div>
	);

	
}

function Address(props){
	const {address, logout, setReloadAddresses, openModal} = props;
	const [loadingDelete,setLoadingDelete] = useState(false);

	 const deleteAddress =  async () => {
		setLoadingDelete(true);
		const response = await deleteAdress(address._id, logout);
		if(response) setReloadAddresses(true);
		setLoadingDelete(false);
	 }
	return(
		<div className="address">
			<p>{address.title}</p>
			<p>{address.name}</p>
			<p>{address.adress}</p>
			<p>{address.state} - {address.city} - {address.postalcode}</p>
			<p>{address.phone}</p>
			<div className="actions">
				<Button primary onClick={() => openModal(`Editar: ${address.title}`, address)}>Editar</Button>
				<Button onClick={deleteAddress}  loading={loadingDelete}>Eliminar</Button>
			</div>
		</div>
	);
}

 

