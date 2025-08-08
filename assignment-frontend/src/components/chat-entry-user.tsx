import { motion } from 'framer-motion';

export const ChatEntryUser = ({
	children,
	index,
}: {
	children?: React.ReactNode;
	index?: number;
}) => {
	return (
		<motion.div
			className="w-full flex items-center justify-start"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{
				duration: 0.3,
				delay: index ? index * 0.1 : 0,
			}}
		>
			<div className="w-full flex items-center justify-end">
				<div className="bg-neutral-800 text-neutral-300 border-neutral-600 border-1 rounded-lg py-2 px-4 max-w-48">{children}</div>
			</div>
		</motion.div>
	);
}

export default ChatEntryUser;