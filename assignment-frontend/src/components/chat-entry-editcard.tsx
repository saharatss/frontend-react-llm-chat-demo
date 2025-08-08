import { CircleButton } from "./circle-button";
import Icons from "./icons";
import { motion } from 'framer-motion';

export const ChatEntryEditcard = ({
	cardId,
	oldText,
	newText,
	index,
}: {
	cardId: string;
	oldText: string;
	newText: string;
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
			<div className="w-full flex flex-col items-center justify-start border-neutral-700 border-1 rounded-2xl p-2" key={cardId}>
				<div className="w-full flex items-center justify-between py-2 mb-2 px-3">
					<div className="text-neutral-300">Apply Changes?</div>
					<div className="flex items-center gap-1.5">
						<CircleButton color='red'>
							<Icons.CloseIcon size={14} />
						</CircleButton>
						<CircleButton color='green'>
							<Icons.CheckIcon size={14} />
						</CircleButton>
					</div>
				</div>
				<div className="w-full flex flex-col items-start gap-1">
					<div className="w-full p-3 border-1 rounded-t-lg bg-neutral-800 border-neutral-600">
						<div className="w-full opacity-50">{oldText}</div>
					</div>
					<div className="w-full p-3 border-1 rounded-b-lg bg-neutral-700 border-neutral-600 flex flex-col items-center gap-1">
						<div className="bg-[var(--color-background)] -mt-6 rounded-full p-0.5">
							<Icons.DownArrowIcon />
						</div>
						<div className="w-full text-white">{newText}</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default ChatEntryEditcard;