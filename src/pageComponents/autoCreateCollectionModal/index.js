import React, { Suspense } from "react";
import { useSelector } from "react-redux";

const AutoCreateCollectionModal = React.lazy(() =>
	import("./AutoCreateCollectionModal")
);

const AutoCreateCollectionModalComponent = () => {
	const [isOpen, data] = useSelector((state) => [
		state.autoCreateCollectionModal.isOpen,
		state.autoCreateCollectionModal.data,
	]);

	return (
		<Suspense fallback={<></>}>
			<AutoCreateCollectionModal
				isOpen={isOpen}
				collectionData={data}
				isShareCollectionEnable={data.isShareCollectionEnable}
			/>
		</Suspense>
	);
};

export default React.memo(AutoCreateCollectionModalComponent);
