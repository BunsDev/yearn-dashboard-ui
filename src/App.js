import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import ErrorHandlerProvider from './context/useErrorHandler';

function App() {

	return (
		<ErrorHandlerProvider>
			<RPCProviderContextApp>
				<BrowserRouter>
					<AuthProvider>
						<VaultsProvider>
							<FavoritesProvider>
								<SmsProvider>
									<Chrome>
										<button onClick={() => {throw new Error('💥 BOOM 💥');}} className={'absolute z-50 bg-red-400'}>{'🤠 howdy pawtna!'}</button>
										<Routes>
											<Route path={'/'} exact={true} element={<Vaults />} />
											<Route path={'/vault/:address'} element={<Vault />} />
											<Route path={'/sandbox/*'} element={<Sandbox />} />
											<Route path={'/github/callback'} exact={true} element={<GithubCallback />} />
										</Routes>
									</Chrome>
								</SmsProvider>
							</FavoritesProvider>
						</VaultsProvider>
					</AuthProvider>
				</BrowserRouter>
			</RPCProviderContextApp>
		</ErrorHandlerProvider>
	);
}

export default App;
