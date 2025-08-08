import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const PlusIcon = (props: IconSvgProps) => {
	return (<svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" fill="none" xmlns="http://www.w3.org/2000/svg">
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>);
}

export const DownArrowIcon = (props: IconSvgProps) => {
	return (<svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 6V18M12 18L7 13M12 18L17 13" />
	</svg>);
}

export const CloseIcon = (props: IconSvgProps) => {
	return (<svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none" xmlns="http://www.w3.org/2000/svg">
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>);
};

export const CheckIcon = (props: IconSvgProps) => {
	return (<svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none" xmlns="http://www.w3.org/2000/svg">
		<polyline points="20 6 9 17 4 12" />
	</svg>);
};

const Icons = {
	PlusIcon,
	DownArrowIcon,
	CloseIcon,
	CheckIcon,
};

export default Icons;