import { CircleButton } from "./circle-button";
import Icons from "./icons";

export const ChatTextfield = ({
	value,
	onChange
}: {
	value: string;
	onChange: (newValue: string) => void;
}) => {
	return (
		<div className="
			w-full p-3
			flex items-start justify-start gap-3
			bg-neutral-800 border-neutral-600 border-1 rounded-3xl
		">
			<CircleButton>
				<Icons.PlusIcon size={16} />
			</CircleButton>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				rows={4}
				className="w-full min-h-24 outline-none"
				placeholder="Ask Anything"
			/>
		</div>
	);
}