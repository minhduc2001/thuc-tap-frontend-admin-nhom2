export interface ApiResponse<T> {
	success?: boolean;
	errorCode?: string;
	statusCode?: number;
	message?: string;
	data?: T | null;
}

export interface ApiListResponse<T> {
	success?: boolean;
	errorCode?: string;
	statusCode?: number;
	message?: string;
	data?: {
		results: T | null;
		meta: Metadata;
	};
}
