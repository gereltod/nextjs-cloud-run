//getServerSideProps in Next13
import { use } from "react"

async function getCharacters() {
	return await (await fetch("https://test-app-lkcqmqcklq-uc.a.run.app/api/reference", { cache: "no-store" })).json();
}

export default function Serverpage() {
	const characters = use(getCharacters());
	console.log(characters)
	return (
		<div>
			<h2>Server Fetching (getServerSideProps)</h2>
			{characters?.map((c) => {
				return (
					<ul key={c.list_id}>
						<li>{c.list_name}</li>
					</ul>
				)
			})}
		</div>
	)
}

