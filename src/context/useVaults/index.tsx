import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import * as Comlink from 'comlink';
import * as ySeafood from './types';
import {api} from './worker';
import {hydrateBigNumbersRecursively} from '../../utils/utils';
import useLocalStorage from 'use-local-storage';
import {useErrorHandler} from '../useErrorHandler';

interface IVaultsContext {
	loading: boolean,
	cachetime: Date,
	vaults: ySeafood.Vault[],
	refresh: () => void
}

/* eslint-disable @typescript-eslint/no-empty-function */
const	VaultsContext = createContext<IVaultsContext>({
	loading: false,
	cachetime: new Date(0),
	vaults: [],
	refresh: () => {}
});

export const useVaults = () => useContext(VaultsContext);

export default function VaultsProvider({children}: {children: ReactNode}) {
	const {handleError} = useErrorHandler();
	const [loading, setLoading] = useState(false);
	const [cachetime, setCachetime] = useLocalStorage<Date>('context/usevaults/cachetime', new Date(0), {
		parser: str => new Date(JSON.parse(str))
	});
	const [vaults, setVaults] = useState<ySeafood.Vault[]>([]);

	const worker = useMemo(() => {
		const worker = new Worker(new URL('./worker.ts', import.meta.url));
		worker.onmessage = (m: MessageEvent) => {
			if(m.data?.value?.isError) {
				handleError(m.data.value.value);
			}
		};
		return Comlink.wrap<typeof api>(worker);
	}, [handleError]);

	const callbacks = useMemo(() => {
		return {
			startRefresh: () => {
				setLoading(true);
			},
			cacheReady: (date: Date, vaults: ySeafood.Vault[]) => {
				hydrateBigNumbersRecursively(vaults);
				setCachetime(date);
				setLoading(false);
				setVaults(vaults);
			}
		};
	}, [setCachetime]);

	useEffect(() => {
		if(process.env.NODE_ENV === 'development') {
			worker.ahoy().then(result => console.log(result));
		}
		worker.start({refreshInterval: 5 * 60 * 1000}, Comlink.proxy(callbacks));
	}, [worker, callbacks]);

	const refresh = useCallback(async () => {
		worker.refresh(Comlink.proxy(callbacks));
	}, [worker, callbacks]);

	return <VaultsContext.Provider value={{
		loading,
		cachetime,
		vaults,
		refresh
	}}>{children}</VaultsContext.Provider>;
}
