import * as React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash';
import * as Tonal from '@tonaljs/tonal';
import { scale } from '@tonaljs/scale';

import scales from  '../../constants/scales';
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

const rootOptions = chromaticNotes.map( x => ( { value: x, label: x } ) );
const scaleOptions = scales.map( x => ( { value: x, label: startCase( x ) } ) );

// TODO: This feels unclear, needs improvement.
const getItemsInScale = ( root, scaleType ) => {
    const { intervals, notes } = scale( [ root, scaleType ] );

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
    const [ scaleType, setScaleType ] = React.useState( scaleOptions[ 0 ].value );
    const labels = getItemsInScale( root, scaleType );

    return (
        <Container>
            <Heading>Scale Demo</Heading>
            <Controls>
                <OptionSelection 
                    onSelectOption={ ( value ) => setRoot( value ) } 
                    selectedOption={ root }
                    options={ rootOptions }
                />
                <OptionSelection 
                    onSelectOption={ ( value ) => setScaleType( value ) } 
                    selectedOption={ scaleType }
                    options={ scaleOptions }
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
