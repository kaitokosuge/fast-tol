import "./App.css";
import DrawerMenu from "./Menu";

function App() {
	// const postVscode = async () => {
	// 	const res = await fetch("", {
	// 		body: JSON.stringify({ text: "vscode" }),
	// 	});
	// 	if (res.ok) {
	// 		console.log("送信成功");
	// 	}
	// 	console.log("送信失敗");
	// };

	// const handleClickOption = async (value: string) => {
	// 	if (value === "vscode") await postVscode();
	// };
	return (
		<div>
			{/* <button onClick={() => handleClickOption("vscode")}>vscode再起動</button> */}
			<DrawerMenu />
		</div>
	);
}

export default App;
