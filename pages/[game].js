import React, {useState,useEffect} from "react";
import { useRouter } from "next/router";
import Basiclayout from "../layouts/BasicLayout"; 
import { getGameByUrlApi } from "../api/game";



export default function Game(){
	const [game,setGame] = useState(null);
	const {query} = useRouter();

	useEffect(() => {
		(async () => {
		 const response = await getGameByUrlApi(query.game);
		 setGame(response);
		})()
	  },[query]);
	return (
		<Basiclayout className="game">
			<h1>Estamos en game</h1>
		</Basiclayout>
	);
}

