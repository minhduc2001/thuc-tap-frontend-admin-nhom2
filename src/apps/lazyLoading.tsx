import React from 'react';

const Homepage = React.lazy(() => import('../pages/Homepage'));
const AudioBookpage = React.lazy(() => import('../pages/AudioBookPage'));
const EditAudioBook = React.lazy(() => import('../pages/EditAudioBook'));

const PageNotFound = React.lazy(() => import('../pages/404'));

export const PUBLIC_ROUTES = [
	{
		path: '/',
		component: Homepage,
	},
	{
		path: 'audio-book',
		component: AudioBookpage,
	},
	{
		path: 'audio-book/edit/:id',
		component: EditAudioBook,
	},
	{
		path: '*',
		component: PageNotFound,
	},
];
