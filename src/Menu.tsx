import React, { useState, useRef } from "react";

export default function BottomDrawerMenu() {
	const [translateY, setTranslateY] = useState(300); // 初期位置 (閉じた状態)
	const isDragging = useRef(false); // ドラッグ中かどうかの状態
	const startY = useRef(0); // ドラッグ開始時のY座標

	const handleStart = (clientY: number) => {
		startY.current = clientY;
		isDragging.current = true; // ドラッグを開始
	};

	const handleMove = (clientY: number) => {
		if (!isDragging.current) return;
		const deltaY = clientY - startY.current; // 開始位置からの移動量
		const newTranslateY = Math.min(300, Math.max(0, translateY + deltaY)); // 範囲制限 (0 ～ 300px)
		setTranslateY(newTranslateY);
		startY.current = clientY; // 開始位置を更新
	};

	const handleEnd = () => {
		isDragging.current = false; // ドラッグ終了
		// ドロワーのスナップ (近い位置に移動)
		setTranslateY((prev) => (prev < 150 ? 0 : 300)); // 150px を境界
	};

	return (
		<div
			className="relative h-screen overflow-hidden"
			onMouseDown={(e) => handleStart(e.clientY)}
			onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientY)} // マウス移動中
			onMouseUp={handleEnd} // マウスアップ時
			onTouchStart={(e) => handleStart(e.touches[0].clientY)} // タッチ開始
			onTouchMove={(e) => handleMove(e.touches[0].clientY)} // タッチ移動
			onTouchEnd={handleEnd} // タッチ終了
		>
			{/* ドロワーメニュー */}
			<div
				className="absolute bottom-0 left-0 w-full bg-gray-800 text-white"
				style={{
					height: "300px",
					transform: `translateY(${translateY}px)`,
					transition: isDragging.current ? "none" : "transform 0.1s ease-out", // ドラッグ中は即時反映
				}}>
				<div className="p-4">Menu Content</div>
			</div>

			{/* メインコンテンツ */}
			<div className="h-full bg-gray-100">
				<h1 className="text-center p-4">Main Content</h1>
				<button
					className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setTranslateY((prev) => (prev === 300 ? 0 : 300))}>
					Toggle Menu
				</button>
			</div>
		</div>
	);
}
