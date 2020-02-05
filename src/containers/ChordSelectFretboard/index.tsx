import * as React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash';
import * as Tonal from '@tonaljs/tonal';
import { chord } from '@tonaljs/chord';

import chromaticNotes from '../../constants/chromaticNotes';
import FretBoard from '../../components/Fretboard';
import OptionSelection from '../../components/OptionSelection';

const Container = styled.div`
    max-width: 960px;   
    margin: 0 auto;
    position: relative;
`;

const Heading = styled.h2`
    font-size: 2em;
    color: white;
`;

const Controls = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const commonChordTypes = [
    'major',
    'minor',
    'diminished',
    'major seventh',
    'minor seventh',
    'dominant seventh',
    'suspended 2nd',
    'suspended 4th',
    'augmented',
]

const rootOptions = chromaticNotes.map( x => ( { value: x, label: x } ) );
const chordOptions = commonChordTypes.map( x => ( { value: x, label: startCase( x ) } ) );

// TODO: This feels unclear, needs improvement.
const getItemsInScale = ( root, chordType ) => {
    const { intervals, notes } = chord( `${ root }${ chordType }` );

    return intervals.map(
        ( interval, index ) => (
            {
                semitones: Tonal.interval( interval ).semitones,
                interval,
                note: notes[ index ],
            }
        )
    );
}

const ScaleSelectFretboard: React.FC<{}> = () => {
    const [ root, setRoot ] = React.useState( rootOptions[ 0 ].value );
    const [ chordType, setChordType ] = React.useState( chordOptions[ 0 ].value );
    const labels = getItemsInScale( root, chordType );

    return (
        <Container>
            <Heading>Chord Demo</Heading>
            <Controls>
                <OptionSelection
                    onSelectOption={ setRoot }
                    selectedOption={ root }
                    options={ chromaticNotes.map( x => ( { value: x, label: x } ) ) }
                />
                <OptionSelection
                    onSelectOption={ setChordType }
                    selectedOption={ chordType }
                    options={ chordOptions }
                />
            </Controls>
            <FretBoard
                labels={ labels }
                renderLabel={ ( { label } ) => label.note  }
                root={ root }
            />
        </Container>
    );
};

export default ScaleSelectFretboard;
