export interface ChatEntry {
	sender: 'user' | 'agent';
	type: 'text' | 'editcard';
	content: string | EditcardContent;
}

export interface EditcardContent {
	cardId: string;
	oldText: string;
	newText: string;
}