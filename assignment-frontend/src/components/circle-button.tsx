export const CircleButton = ({
	color = 'default',
	children,
	onClick,
}: {
	color?: 'default' | 'red'	| 'green';
	children?: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<button
			onClick={onClick}
			className={`
				flex items-center justify-center
				rounded-full p-1.5
				cursor-pointer
				${color === 'default' ? 'bg-neutral-600' : ''}
				${color === 'red'     ? 'bg-[var(--color-myred)]' : ''}
				${color === 'green'   ? 'bg-[var(--color-mygreen)]' : ''}
				hover:bg-neutral-700 transition-colors
			`}
		>
			{children}
		</button>
	);
}