import React from 'react';

const Homepage = React.lazy(() => import('../pages/Homepage'));
const AudioBookpage = React.lazy(() => import('../pages/AudioBookPage'));
const EditAudioBook = React.lazy(() => import('../pages/EditAudioBook'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const AuthorPage = React.lazy(() => import('../pages/AuthorPage'));
const SupportPage = React.lazy(() => import('../pages/SupportPage'));
const SupportDetailPage = React.lazy(
	() => import('../pages/RequestDetailPage'),
);

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
		path: 'audio-book/create',
		component: EditAudioBook,
	},
	{
		path: 'audio-book/edit/:id',
		component: EditAudioBook,
	},
	{
		path: 'profile',
		component: ProfilePage,
	},
	{
		path: 'author',
		component: AuthorPage,
	},
	{
		path: 'support',
		component: SupportPage,
	},
	{
		path: '/support/:id',
		component: SupportDetailPage,
	},
	{
		path: '*',
		component: PageNotFound,
	},
];
