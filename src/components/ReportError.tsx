import React, {useState} from 'react';
import useLocalStorage from 'use-local-storage';
import {useErrorHandler} from '../context/useErrorHandler';
import {Button} from './controls';
import Notification from './Notification';
import SpeechBubble from './SpeechBubble';

export default function ReportError() {
	const {currentError, dismiss} = useErrorHandler();
	const [neverReport, setNeverReport] = useLocalStorage('components/ReportError/neverReport', false);

	if(!currentError.error || currentError.dismissed || neverReport) return <></>;

	return <Notification>
		<SpeechBubble text={'Whoa, an error occurred!'} />
		<div className={'w-full sm:w-fit flex items-center justify-end gap-2 sm:gap-4 text-sm'}>
			<Button label={'Report'} onClick={() => {return;}}></Button>
			<Button label={'Not now'} onClick={dismiss}></Button>
			<Button label={'Not ever'} onClick={() => {
				setNeverReport(true);
			}}></Button>
		</div>
	</Notification>;
} 