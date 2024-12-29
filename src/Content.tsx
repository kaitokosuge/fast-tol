import BottomDrawerMenu from "./BottomDrawerMenu";

export default function Content() {
	const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<>
			{dummy.map((num: number) => (
				<div key={num} className="mt-10">
					<BottomDrawerMenu
						// ボタン内に表示する内容
						buttonContent={
							<div>
								<div className="p-4 text-xl">buttonのコンテンツ</div>
								<div>{num}開くkkkkkk</div>
							</div>
						}>
						{/* メニューコンテンツ */}
						<div className="p-4 text-xl">メニューのコンテンツ</div>
						<div className="p-4">
							<img
								src="path/to/icon.png"
								alt="アイコン"
								className="w-10 h-10"
							/>
							<h3>タイトル</h3>
							<p className="h-[1000px]">
								{num}メニュー内に表示したい情報を追加できますkkk。
							</p>
						</div>
					</BottomDrawerMenu>
				</div>
			))}
		</>
	);
}
