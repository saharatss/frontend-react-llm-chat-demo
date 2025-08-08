import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export const ChatEntryAgent = ({
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
			<div className="text-neutral-300 px-4 max-w-110">
				<ReactMarkdown
					components={{
						ol: ({ children }) => (<ol className="list-decimal pl-6 space-y-1 py-2">{children}</ol>),
						li: ({ children }) => (<li className="leading-relaxed">{children}</li>),
					}}
				>
					{typeof children === 'string' ? children : 'N/A'}
				</ReactMarkdown>
			</div>
		</motion.div>
	);
};

export default ChatEntryAgent;
