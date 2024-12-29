import { useState, useRef, useEffect, ReactNode } from "react";

interface BottomDrawerMenuProps {
	children: ReactNode; // メニュー内のコンテンツ
	buttonContent: ReactNode; // ボタン内のコンテンツ
}

export default function BottomDrawerMenu({
	children,
	buttonContent,
}: BottomDrawerMenuProps) {
	const [translateY, setTranslateY] = useState(0); // 初期位置 (閉じた状態)
	const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューが開いているかどうか
	const isDragging = useRef(false); // ドラッグ中かどうかの状態
	const startY = useRef(0); // ドラッグ開始時のY座標
	const menuHeight = useRef(0); // メニューの高さ

	// 初期レンダリング時に画面の高さを基にメニューの高さを設定
	useEffect(() => {
		menuHeight.current = window.innerHeight * 0.95; // 画面の95%の高さ
		setTranslateY(menuHeight.current); // 初期状態でメニューを隠す
	}, []);

	useEffect(() => {
		// メニューが開いているときは画面全体のスクロールを無効化
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		// クリーンアップ: コンポーネントがアンマウントされるときにスクロールの設定を戻す
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isMenuOpen]);

	// メニューをドラッグできるように開始
	const handleStart = (clientY: number) => {
		startY.current = clientY;
		isDragging.current = true; // ドラッグを開始
	};

	// ドラッグ移動中の処理
	const handleMove = (clientY: number) => {
		if (!isDragging.current) return;
		const deltaY = clientY - startY.current; // 開始位置からの移動量
		const newTranslateY = Math.min(
			menuHeight.current,
			Math.max(0, translateY + deltaY)
		); // 範囲制限 (0 ～ menuHeight)
		setTranslateY(newTranslateY);
		startY.current = clientY; // 開始位置を更新
	};

	// ドラッグ終了時の処理
	const handleEnd = () => {
		if (!isDragging.current) return;
		isDragging.current = false; // ドラッグ終了

		// スナップ動作: 開く/閉じるの状態を切り替える
		if (translateY > menuHeight.current / 4) {
			setTranslateY(menuHeight.current); // 閉じる
			setIsMenuOpen(false); // メニューを閉じる
		} else {
			setTranslateY(0); // 開いたまま
			setIsMenuOpen(true); // メニューを開く
		}
	};

	// メニューの外側をクリックしたときにメニューを閉じる
	const handleBackgroundClick = () => {
		setTranslateY(menuHeight.current); // メニューを閉じる
		setIsMenuOpen(false); // メニューを閉じている状態にする
	};

	return (
		<>
			<div
				style={{
					overflow: "hidden", // 初期状態でスクロールを無効化
				}}
				className="absolute max-h-screen w-screen top-0 left-0 overflow-y-scroll">
				<div className="z-10">
					{/* メニュー背景部分（メニューが開いているときに表示） */}
					{isMenuOpen && (
						<div
							className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"
							onClick={handleBackgroundClick} // クリックでメニューを閉じる
							style={{
								zIndex: 2, // メニューより下に表示
							}}
						/>
					)}
				</div>
			</div>
			{/* メニュー部分 */}
			<div
				className="absolute bottom-0 left-0 w-[100%] bg-gray-800 text-white z-30 rounded-t-[20px] px-10"
				style={{
					height: `${menuHeight.current}px`,
					transform: `translateY(${translateY}px)`,
					transition: isDragging.current ? "none" : "transform 0.2s ease-out", // ドラッグ中は即時反映
				}}
				// ドラッグイベントをメニュー部分に限定
				onMouseDown={(e) => handleStart(e.clientY)} // ドラッグ開始
				onMouseMove={(e) => {
					if (e.buttons === 1) handleMove(e.clientY); // マウス移動中
				}}
				onMouseUp={handleEnd} // マウスアップ時
				onTouchStart={(e) => handleStart(e.touches[0].clientY)} // タッチ開始
				onTouchMove={(e) => handleMove(e.touches[0].clientY)} // タッチ移動
				onTouchEnd={handleEnd} // タッチ終了
			>
				<div className="overflow-y-scroll h-full">
					<div className="fixed top-5 right-5 w-[100px] h-[1px] bg-gray-500"></div>
					{children} {/* メニューのカスタマイズコンテンツ */}
				</div>
			</div>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded block mt-10 relative z-10"
				onClick={() => {
					setTranslateY(0); // メニューを開く
					setIsMenuOpen(true); // メニューを開いている状態にする
				}}>
				{buttonContent} {/* ボタン内のコンテンツ */}
			</button>
		</>
	);
}
