import { LoginPage } from "./components/LoginPage";
import { PokedexHomepage } from "./components/Pokedex";
import { useState } from "react";

function App() {
	const [page] = useState('homepage')
	switch (page) {
		case `login`:
			return (
				<LoginPage />
			)
		case `homepage`:
			return (
				<PokedexHomepage />
			);
	}
}

export default App;