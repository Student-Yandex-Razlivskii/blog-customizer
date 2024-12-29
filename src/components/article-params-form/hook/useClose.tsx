import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	overlayRef: React.RefObject<HTMLDivElement>;
};

export const useClose = ({ isOpen, onClose, overlayRef }: TUseClose) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !overlayRef.current?.contains(target)) {
				isOpen && onClose();
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, overlayRef]);
};
