import {useState,useEffect} from "react";
import {Container, Grid, Menu, Icon} from 'semantic-ui-react';
import Link from "next/link";
import {map} from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hooks/useAuth";
import {getMeApi} from "../../../api/user";
import {getPlatformApi} from "../../../api/platform";

export default function MenuWeb(){
	const [platforms,setPlatforms] = useState([]);
const [showModal,setShowModal] = useState(false);
const [titleModal, setTitleModal] = useState("Iniciar Sesión");
const [user,setUser] = useState(undefined);
const {logout,auth} = useAuth();

useEffect(() => {
	(async ()=> {
		const response = await getMeApi(logout);
		setUser(response);
	})();
},[auth]);

useEffect(() => {
	(async ()=> {
		const response = await getPlatformApi();
		setPlatforms(response || []);
		console.log(response);
	})();
},[]);
const onShowModal = () => setShowModal(true);
const onCloseModal = () => setShowModal(false);

	return (
		<div className="menu">
			<Container>
				<Grid>
					<Grid.Column className="menu__left" width={6}>
						<MenuPlataforms platforms={platforms}/>
					</Grid.Column>
					<Grid.Column className="menu__right" width={10}>
						{user !== undefined &&(
							<MenuOption onShowModal={onShowModal} user={user} logout={logout}/>
						)}
						
						
					</Grid.Column>
				</Grid>
			</Container>
			<BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small">
				<Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}/>
			</BasicModal>
		</div>
	);
}

function MenuPlataforms(props){

	const {platforms} = props;
	return(
		<Menu>
			{map (platforms, (platform) => (
				<Link href={`/games/${platform.url}`} key={platform._id}>
					<Menu.Item as="a" name={platform.url}>
						{platform.title}
					</Menu.Item>
				</Link>
			))}
			
		</Menu>
	);
}
function MenuOption(props){
	const {onShowModal,user,logout} = props;
	return(
		<Menu>
		{user ? (
			<>
			<Link href="/orders">
				<Menu.Item as="a">
					<Icon name="game" />
					Mis pedidos
				</Menu.Item>	
			</Link>
			<Link href="/wishlist">
				<Menu.Item as="a">
					<Icon name="heart outline" />
					Lista de deseos
				</Menu.Item>	
			</Link>
			<Link href="/account">
				<Menu.Item as="a">
					<Icon name="user outline" />
					{user.name} {user.lastname}
				</Menu.Item>	
			</Link>
			<Link href="/cart">
				<Menu.Item as="a" className="m-0">
					<Icon name="cart" />
				</Menu.Item>	
			</Link>
			
			<Menu.Item onClick={logout}  className="m-0">
			<Icon name="power off" />
			</Menu.Item>
			</>


		): (
			
			<Menu.Item onClick={onShowModal}>
				<Icon name="user outline"/>
				Mi cuenta
			</Menu.Item>

		)}
		</Menu>
		
	);
}