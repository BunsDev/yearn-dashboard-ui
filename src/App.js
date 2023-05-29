import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NestProviders from './context/NestProviders';
import {RPCProviderContextApp} from './context/useRpcProvider';
import AuthProvider from './context/useAuth';
import VaultsProvider from './context/useVaults';
import FavoritesProvider from './context/useFavorites';
import SmsProvider from './context/useSms';
import Chrome from './components/Chrome';
import GithubCallback from './components/GithubCallback';
import Sandbox from './components/Sandbox';
import Vaults from './components/Vaults';
import Vault from './components/Vault';
import Risk from './components/Risk';
import RiskGroup from './components/Risk/Group';
import Status from './components/Status';
import SimulatorStatusProvider from './context/useSimulator/SimulatorStatusProvider';
import BlocksProvider from './context/useSimulator/BlocksProvider';
import ProbesProvider from './context/useSimulator/ProbesProvider';
import SimulatorProvider from './context/useSimulator';
import {PowertoolsProvider} from './components/Powertools';
import {FilterProvider as VaultsFilterProvider} from './components/Vaults/Filter/useFilter';
import {FilterProvider as RiskFilterProvider} from './components/Risk/Filter/Provider';

const Providers = NestProviders([
	[RPCProviderContextApp],
	[BrowserRouter],
	[AuthProvider],
	[FavoritesProvider],
	[VaultsProvider],
	[VaultsFilterProvider],
	[SmsProvider],
	[SimulatorStatusProvider],
	[BlocksProvider],
	[ProbesProvider],
	[SimulatorProvider],
	[RiskFilterProvider],
	[PowertoolsProvider],
	[Chrome]
]);

function App() {
	return <Providers>
		<Routes>
			<Route path={'/'} exact={true} element={<Vaults />} />
			<Route path={'/vault/:address'} element={<Vault />} />
			<Route path={'/risk/*'} element={<Risk />} />
			<Route path={'/risk/:group'} element={<RiskGroup />} />
			<Route path={'/sandbox/*'} element={<Sandbox />} />
			<Route path={'/status/*'} element={<Status />} />
			<Route path={'/github/callback'} exact={true} element={<GithubCallback />} />
		</Routes>
	</Providers>;
}

export default App;
