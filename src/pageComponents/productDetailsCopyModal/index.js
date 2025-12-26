import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeProductDetailsCopyModal } from "./redux/actions";

const ProductDetailsCopyModal = React.lazy(() =>
	import("../../components/ProductDetailsCopyModal")
);

const ProductDetailsCopyModalComponent = () => {
	const dispatch = useDispatch();
	const [enabledModal, setEnabledModal] = useState(false);
	const [authUser, isModalOpen, productDetails] = useSelector((state) => [
		state.auth.user.data,
		state.productDetailsCopyModal.isModalOpen,
		state.productDetailsCopyModal.productDetails,
	]);

	// load modal on DOM only when required
	useEffect(() => {
		if (isModalOpen && !enabledModal) {
			setEnabledModal(true);
		}
	}, [isModalOpen]);

	const handleProductDetailsCopyModalClose = () => {
		dispatch(closeProductDetailsCopyModal());
	};

	return (
		<div>
			<Suspense fallback={null}>
				{enabledModal && (
					<ProductDetailsCopyModal
						isOpen={isModalOpen}
						productDetails={productDetails}
						onClose={handleProductDetailsCopyModalClose}
						userId={authUser.user_id}
					/>
				)}
			</Suspense>
		</div>
	);
};

export default ProductDetailsCopyModalComponent;
