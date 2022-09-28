import React, {useEffect, useState} from 'react';
import {TbCopy, TbCheck} from 'react-icons/tb';
import useScrollOverpass from '../../context/useScrollOverpass';
import {useChrome} from '../Chrome';
import {Button} from '../controls';
import CloseDialog from '../controls/Dialog/Close';
import {useSimulator} from './SimulatorProvider';
import {useVault} from './VaultProvider';

export default function Code() {
	const {setHeader} = useChrome();
	const {vault} = useVault();
	const {debtRatioUpdates} = useSimulator();
	const [linesOfCode, setLinesOfCode] = useState(['@sign']);
	const [copied, setCopied] = useState(false);
	const {showClassName} = useScrollOverpass();

	useEffect(() => {
		setHeader(false);
	}, [setHeader]);

	useEffect(() => {
		const lines = ['@sign'];
		const updates = [];

		vault.strategies.forEach(strategy => {
			const debtRatioUpdate = debtRatioUpdates[strategy.address];
			if(debtRatioUpdate !== undefined) {
				const delta =  debtRatioUpdate - strategy.debtRatio;
				updates.push({
					address: strategy.address,
					name: strategy.name,
					debtRatio: debtRatioUpdate,
					delta
				});
			}
		});

		if(updates.length) {
			updates.sort((a, b) => a.delta > b.delta ? 1 : -1);
			lines.push('def auto_debt_adjust():');
			lines.push('\tstrategies=[]');
			lines.push('');
			lines.push(`\t# ${vault.name}`);
			lines.push(`\tvault = safe.contract("${vault.address}")`);
			updates.forEach(update => {
				lines.push('');
				lines.push(`\t# ${update.name}`);
				lines.push(`\t# Change debt ratio by ${update.delta > 0 ? '+' : ''}${update.delta} bps`);
				lines.push(`\tstrategy = safe.contract("${update.address}")`);
				lines.push(`\tvault.updateStrategyDebtRatio(strategy, ${update.debtRatio})`);
				lines.push('\tstrategies.append(strategy)');
			});
			lines.push('');
			lines.push('\tharvest_n_check_many(safe, strategies)');
			lines.push('');
			lines.push('');
			lines.push('/robowoofy fn=auto_debt_adjust send=true');
			lines.push('');
		}

		setLinesOfCode(lines);
	}, [vault, debtRatioUpdates, setLinesOfCode]);

	function onCopyCode() {
		try {
			navigator.clipboard.writeText(linesOfCode.join('\n'));
		} finally {
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2500);
		}
	}

	return <div className={'pt-8 pb-32 overflow-x-auto'}>
		<CloseDialog onClick={() => setHeader(true)} />
		{linesOfCode.map((line, index) => 
			<div key={index} className={'flex items-center'}>
				<div className={'ml-2 mr-4 w-8 min-w-[2rem] text-right dark:text-secondary-400/60'}>{''}{index + 1}</div>
				<div className={'whitespace-nowrap'}>
					{Array.from(line).filter(c => c === '\t').map((_, index) => <span key={index}>&emsp;</span>)}
					{line.replace('\t', '')}
				</div>
			</div>
		)}

		<div className={`
			fixed bottom-0 z-10
			w-full px-4 py-4
			flex flex-col items-center gap-4
			border-t border-white dark:border-secondary-900
			${showClassName}`}>
			<Button icon={copied ? TbCheck : TbCopy} onClick={onCopyCode} className={'w-full'} />
		</div>
	</div>;
}