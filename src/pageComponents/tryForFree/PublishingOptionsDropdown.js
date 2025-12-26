import React from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";

import {
	PUBLISHING_OPTION_EXPORT_PRODUCTS_CSV,
	PUBLISHING_OPTION_PAGE,
} from "../../constants/codes";

const publishingOptions = [
	{
		key: PUBLISHING_OPTION_PAGE,
		label: "Single page",
		value: PUBLISHING_OPTION_PAGE,
	},
	{
		key: PUBLISHING_OPTION_EXPORT_PRODUCTS_CSV,
		label: "CSV Export",
		value: PUBLISHING_OPTION_EXPORT_PRODUCTS_CSV,
	},
];

const PublishingOptionsDropdown = ({
	handleSelectPublishingOption,
	currentView,
	STEPS,
	selectedOption,
	showSelectedMark = false,
	hiddenPublishingOptions = [],
	isDisabled = false,
}) => {
	const onSelectOption = (e) => {
		if (e) {
			handleSelectPublishingOption(e.key);
		}
	};

	const publishingOptionsMenu = (
		<Menu
			onClick={onSelectOption}
			style={{ width: "fit-content" }}
			className='bg-indigo-103 rounded-lg min-w-40 ml-auto'>
			{publishingOptions
				.filter((i) => !hiddenPublishingOptions.includes(i.value))
				.map((item) => (
					<Menu.Item key={item.key} className='text-white hover:text-current'>
						<span>
							{showSelectedMark && selectedOption === item.value ? (
								<CheckOutlined className='mr-2' />
							) : (
								""
							)}
							<span>{item.label}</span>
						</span>
					</Menu.Item>
				))}
		</Menu>
	);

	return (
		<Dropdown overlay={publishingOptionsMenu} disabled={isDisabled}>
			<button
				className={`${
					isDisabled
						? "bg-indigo-105 border-indigo-105"
						: "bg-indigo-103 border-indigo-103"
				} text-xs md:text-sm z-10 rounded-xl py-2.5 px-3.5 h-full font-bold text-white max-w-s-1 whitespace-nowrap border-2`}>
				Publishing options <DownOutlined className='ml-1' />
			</button>
		</Dropdown>
	);
};

export default React.memo(PublishingOptionsDropdown);
