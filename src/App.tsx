import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'reset-css';

import ChordSelectFretboard from './containers/ChordSelectFretboard';

const GlobalStyle = createGlobalStyle`
  body {
	background-color: #202832;
	margin: 0;
	min-height: 100vh;
    min-width: 100vw;
    font-family: sans-serif;
  }
`;

const Wrapper = styled.div`
	width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
`;

export const App: React.FC<{}> = () => (
	<Wrapper>
		<GlobalStyle />
		<ChordSelectFretboard />
	</Wrapper>
);
