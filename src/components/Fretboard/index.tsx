import * as React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

import String from './String';

const Container = styled.div`
    padding: 10px;
    background: #444;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    margin: 10px 0;
`;

interface StringType {
    letter: string;
    octave: string;
}

interface FretBoardProps {
    frets?: number;
    strings?: StringType[];
    labels?: any;
    renderLabel: ( { label: any } ) => any;
    root?: string;
}

const DEFAULT_FRETS = 24;
const DEFAULT_STRINGS = [
    { letter: 'E', octave: '2' },
    { letter: 'A', octave: '2' },
    { letter: 'D', octave: '3' },
    { letter: 'G', octave: '3' },
    { letter: 'B', octave: '3' },
    { letter: 'E', octave: '4' },
];

const FretBoard: React.FC<FretBoardProps> = ( { 
    frets = DEFAULT_FRETS, 
    labels, 
    renderLabel, 
    root, 
    strings = DEFAULT_STRINGS,
} ) => (
    <Container>
        { map(
            strings,
            ( { letter, octave }, stringIndex ) => (
                <String 
                    root={ root }
                    key={ stringIndex } 
                    frets={ frets } 
                    letter={ letter } 
                    octave={ octave } 
                    labels={ labels }
                    renderLabel={ renderLabel }
                />
            )
        ) }
    </Container>
);

export default FretBoard;
