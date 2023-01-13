import React, {useRef} from 'react';
import {BsX} from 'react-icons/bs';
import useKeypress from 'react-use-keypress';
import {useDebouncedCallback} from 'use-debounce';
import ScrollContainer from 'react-indiana-drag-scroll';
import useScrollOverpass from '../../context/useScrollOverpass';
import {BiggerThanSmallScreen, SmallScreen} from '../../utils/breakpoints';
import {useFilter} from './useFilter';
import Chips from './Chips';
import {Input, LabeledNumber, SmallIconButton} from '../controls';

const SearchBox = React.forwardRef(
	function SearchBox(props, ref) {
		return <Input _ref={ref}
			type={'text'}
			defaultValue={props.query}
			placeholder={'/ Filter by name'}
			onChange={(e) => {props.debounceQuery(e.target.value);}} 
			className={`
			w-full py-2 px-3 rounded-lg leading-tight border
			bg-secondary-300 border-transparent text-primary-900
			dark:bg-secondary-900/80 dark:border-secondary-800 dark:text-primary-200
			focus:border-selected-400 focus:dark:border-selected-600 focus:ring-0`} />;
	}
);

export default function Filter({showVaultCount = false}) {
	const queryElement = useRef();
	const {query, setQuery, filter} = useFilter();
	const debounceQuery = useDebouncedCallback(value => {setQuery(value);}, 250);
	const {overpassClassName} = useScrollOverpass();

	useKeypress(['/'], () => {
		setTimeout(() => {
			queryElement.current.select();
		}, 0);
	});

	function clearQuery() {
		setQuery('');
		queryElement.current.value = '';
	}

	return <>
		<SmallScreen>
			<div className={`sticky top-0 z-10 py-4 ${overpassClassName}`}>
				<div className={'flex items-center justify-between'}>
					<div className={'w-1/5'}></div>
					<div className={'w-3/5 relative flex items-center justify-center'}>
						<SearchBox ref={queryElement} query={query} debounceQuery={debounceQuery} />
						{query && <SmallIconButton icon={BsX} onClick={clearQuery} className={'absolute right-2'} />}
					</div>
					<div className={'w-1/5 text-center text-xs'}>
						{showVaultCount && <LabeledNumber number={filter.length} label={'Vaults'} />}
					</div>
				</div>
				<div className={'mt-4 px-4'}>
					<ScrollContainer className={'flex items-center w-full'}>
						<Chips></Chips>
					</ScrollContainer>
				</div>
			</div>
		</SmallScreen>
		<BiggerThanSmallScreen>
			<div className={`sticky top-0 z-10 pl-4 pr-8 py-2 flex items-center gap-3 ${overpassClassName}`}>
				<div className={'relative flex items-center justify-center'}>
					<SearchBox ref={queryElement} query={query} debounceQuery={debounceQuery} />
					{query && <SmallIconButton icon={BsX} onClick={clearQuery} className={'absolute right-2'} />}
				</div>
				<div className={'w-full flex items-center justify-between'}>
					<Chips></Chips>
					<div className={'text-2xl flex items-center gap-2'}>
						{showVaultCount && <LabeledNumber number={filter.length} label={'Vaults'} />}
					</div>
				</div>
			</div>
		</BiggerThanSmallScreen>
	</>;
}