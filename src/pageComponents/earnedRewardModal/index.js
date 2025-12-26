import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EarnedRewardModal = React.lazy(() => import("./EarnedRewardModal"));

export default (props) => {
	const [loadComponent, setLoadComponent] = useState(false);
	const [isModalOpen] = useSelector((state) => [
		state.appState.earnedRewardModal.isOpen,
	]);

	useEffect(() => {
		if (!loadComponent && isModalOpen) {
			setLoadComponent(true);
		}
	}, [isModalOpen]);

	return (
		<Suspense fallback={<></>}>
			{loadComponent && <EarnedRewardModal {...props} />}
		</Suspense>
	);
};
