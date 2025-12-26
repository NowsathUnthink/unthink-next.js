import React from "react";
import About from "../pageComponents/staticHomePage/About";
import Footer from "../pageComponents/staticHomePage/Footer";
import Header from "../pageComponents/staticHomePage/Header";
import { ROUTES } from "../constants/codes";

// export { getServerData } from "../helper/serverUtils";

const AboutPageContainer = ({ path }) => {
	return (
		<div className='static_page_bg'>
			<Header
				currentPath={path}
				signInRedirectPath={ROUTES.TRY_FOR_FREE_PAGE}
			/>
			<About />
			<Footer />
		</div>
	);
};

export default AboutPageContainer;
