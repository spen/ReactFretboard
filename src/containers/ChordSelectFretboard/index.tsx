import * as React from 'react';
import styled from 'styled-components';
import * as Tonal from '@tonaljs/tonal';
import { chord } from '@tonaljs/chord';

import chromaticNotes from '../../constants/chromaticNotes';
import FretBoard from '../../components/Fretboard';
import OptionSelection from '../../components/OptionSelection';
import IntervalStrip from '../../components/IntervalStrip';
import simplifyNoteName from '../../lib/simplifyNoteName';

const Container = styled.div`
    max-width: 960px;   
    margin: 0 auto;
    position: relative;
`;

const Heading = styled.h2`
    font-size: 2em;
    color: white;
    text-transform: capitalize;
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
const chordOptions = commonChordTypes.map( x => ( { value: x, label: x } ) );

const getChordLabels = ( root, chordType ) => {
    const { intervals, notes } = chord( `${ root }${ chordType }` );

    return intervals.map(
        ( interval, index ) => (
            {
                semitones: Tonal.interval( interval ).semitones,
                interval,
                note: simplifyNoteName( notes[ index ], '#' ),
            }
        )
    );
}

const ScaleSelectFretboard: React.FC<{}> = () => {
    const [ root, setRoot ] = React.useState( rootOptions[ 0 ].value );
    const [ chordType, setChordType ] = React.useState( chordOptions[ 0 ].value );
    const labels = getChordLabels( root, chordType );
    const chordData = chord( `${ root }${ chordType }` );
    const { intervals, name  } = chordData;

    return (
        <Container>
            <Controls>
                <OptionSelection
                    onSelectOption={ setRoot }
                    selectedOption={ root }
                    options={ rootOptions }
                />
                <OptionSelection
                    onSelectOption={ setChordType }
                    selectedOption={ chordType }
                    options={ chordOptions }
                />
            </Controls>
            <Heading>{ name }</Heading>
            <IntervalStrip
                root={ root }
                activeIntervals={ intervals }
            />
            <FretBoard
                labels={ labels }
                renderLabel={ ( { label } ) => label.note  }
                root={ root }
            />
        </Container>
    );
};

export default ScaleSelectFretboard;
