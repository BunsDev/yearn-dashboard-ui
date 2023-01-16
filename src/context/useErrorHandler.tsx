import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';

interface CurrentError {
	error: Error | undefined,
	dismissed: boolean,
	reported: boolean
}

interface Context {
	currentError: CurrentError,
	handleError: (error: Error) => void,
	dismiss: () => void,
}

/* eslint-disable @typescript-eslint/no-empty-function */
const	ErrorHandlerContext = createContext<Context>({
	currentError: {
		error: undefined,
		dismissed: false,
		reported: false
	},
	handleError: (error: Error) => {},
	dismiss: () => {}
});

export const useErrorHandler = () => useContext(ErrorHandlerContext);

export default function ErrorHandlerProvider({children} : {children: ReactNode}) {
	const [currentError, setCurrentError] = useState<CurrentError>(
		{error: undefined, dismissed: false, reported: false});

	const handleError = useCallback((error: Error) => {
		setCurrentError({error, dismissed: false, reported: false});
	}, [setCurrentError]);

	const dismiss = useCallback(() => {
		setCurrentError(current => {
			return {...current, dismissed: true};
		});
	}, [setCurrentError]);

	useEffect(() => {
		window.onerror = (message, file, line, column, errorObject) => {
			handleError(errorObject as Error);
		};
	}, [handleError]);

	return <ErrorHandlerContext.Provider value={{
		currentError, 
		handleError, 
		dismiss}}>
		{children}
	</ErrorHandlerContext.Provider>;
}
