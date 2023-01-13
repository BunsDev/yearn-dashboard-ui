import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import VaultProvider, {useVault} from './VaultProvider';
import {useChrome} from '../Chrome';
import Header from './Header';
import Summary from './Summary';
import Toolbar from './Toolbar';
import Strategy from './Strategy';
import SimulatorProvider, {useSimulator} from './SimulatorProvider';
import Code from './Code';
import Loading from '../Loading';
import Events from './Events';
import SimulatorStatus from './SimulatorStatus';
import {SmallScreen} from '../../utils/breakpoints';

function Layout() {
	const location = useLocation();
	const {setDialog} = useChrome();
	const {loading, vault, token} = useVault();
	const {engaged, debtRatioUpdates, strategyResults} = useSimulator();

	useEffect(() => {
		if(location.hash === '#code') {
			setDialog({component: Code, args: {vault, debtRatioUpdates}});
		} else if(location.hash.startsWith('#harvest-events')) {
			setDialog({component: Events, args: {vault, token, strategyResults}});
		} else {
			setDialog(null);
		}
	}, [location, setDialog, vault, token, debtRatioUpdates, strategyResults]);

	if(loading) return <div className={`
		absolute w-full h-screen flex items-center justify-center`}>
		<Loading />
	</div>;

	return <div>
		<Header />
		<div className={'grid grid-cols-1 sm:grid-cols-2'}>
			<Summary className={'sm:sticky sm:top-20 sm:z-0'} />
			<div className={'flex flex-col gap-2 pb-20 sm:pt-6'}>
				{vault.withdrawalQueue.map((strategy, index) => 
					<Strategy key={index} strategy={strategy} />
				)}
			</div>
		</div>

		{engaged && <motion.div className={`
		fixed z-10 bottom-[4.5rem] sm:bottom-0 w-full p-4
		flex justify-end
		backdrop-blur-md shadow`}
		transition={{ease: 'easeIn', duration: .1}}
		initial={{y: '50%'}}
		animate={{y: '0%'}}>
			<div className={'w-full sm:w-1/2 sm:px-8'}>
				<SimulatorStatus />
			</div>
		</motion.div>}

		<SmallScreen>
			<Toolbar />
		</SmallScreen>
	</div>;
}

export default function Vault() {
	return <VaultProvider>
		<SimulatorProvider>
			<Layout></Layout>
		</SimulatorProvider>
	</VaultProvider>;
}