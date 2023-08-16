/// <reference types="react-scripts" />

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

type MenuItem = Required<MenuProps>['items'][number];

type AutoCompleteOption = { value: string; label: string; reset: Coin };

interface AsyncWrapperProps {
	loading: boolean;
	fulfilled: boolean;
	error?: unknown;
	children: React.JSX;
}

interface HelmetProps {
	title: string;
	description: string;
}

interface IGenre {
	id: number;
	name: string;
}

interface Query {
	limit?: number;
	page?: number;
	search?: string;
	filter?: string;
}

interface Metadata {
	itemsPerPage?: number;
	totalItems?: number;
	totalPages?: number;
	currentPage?: number;
}

interface ErrorResponse {
	message?: string;
	errorCode?: string;
}
