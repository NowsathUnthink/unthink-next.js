import React, { useMemo, useState } from "react";
import { useRouter } from 'next/router'; const navigate = (path) => useRouter().push(path);
import { useDispatch } from "react-redux";

import { MenuOutlined } from "@ant-design/icons";
import searchIcon from "../../images/swiftly-styled/Aura - Search.svg";
import userIcon from "../../images/swiftly-styled/User.svg";

import useTheme from "../../hooks/chat/useTheme";
import { setShowChatModal } from "../../hooks/chat/redux/actions";
import { PATH_ROOT, STORE_USER_NAME_SWIFTLYSTYLED } from "../../constants/codes";
import { current_store_name, is_store_instance } from "../../constants/config";

const SwiftlyMobileHeader = ({ showProfileIcon, setShowMenu }) => {
	const dispatch = useDispatch();
	const { themeCodes } = useTheme();

	const isSwiftlyStyledInstance = useMemo(
		() =>
			is_store_instance && current_store_name === STORE_USER_NAME_SWIFTLYSTYLED,
		[]
	);

	return (
		<>
			<div
				className='banner'
				style={{ background: themeCodes.header.announcement_bar_bg }}>
				EVERY OUTFIT HAS A LOVE STORY – LET’S CREATE YOURS TOGETHER!
			</div>
			<div
				className='flex items-center justify-between py-2 px-4 text-white'
				style={{ height: "78.11px", background: themeCodes.header.header_bg }}>
				<div className='search-icon'>
					<img
						src={searchIcon}
						alt='searchIcon'
						onClick={() => dispatch(setShowChatModal(true))}
					/>
				</div>

				<div>
					<span
						className='logo cursor-pointer'
						onClick={() => navigate(PATH_ROOT)}>
						{
							isSwiftlyStyledInstance ? "SwiftlyStyled" : "DoTheLook"
						}
					</span>
				</div>

				<div className='flex'>
					{showProfileIcon ? (
						<img
							src={userIcon}
							alt='userIcon'
							className='cursor-pointer pr-1 pl-2 h-6 w-auto'
							style={{ filter: "invert(1)" }}
							onClick={() => setShowMenu(true)}
						/>
					) : null}
				</div>
			</div>
		</>
	);
};

export default SwiftlyMobileHeader;
