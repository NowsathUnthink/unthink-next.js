import React, { Suspense, useEffect, useState } from "react";

const AuraChatSettingModal = React.lazy(() => import("./AuraChatSettingModal"));

export default (props) => {
	const [loadComponent, setLoadComponent] = useState(false);

	useEffect(() => {
		if (!loadComponent && props.isOpen) {
			setLoadComponent(true);
		}
	}, [props.isOpen]);

	return (
		<Suspense fallback={<></>}>
			{loadComponent && <AuraChatSettingModal {...props} />}
		</Suspense>
	);
};
