import * as React from 'react';
import styled from 'styled-components';
import * as Tonal from '@tonaljs/tonal';
import { scale } from '@tonaljs/scale';

import FretBoard from '../../components/Fretboard';
import RootSelect from './RootSelect';
import ScaleSelect from './ScaleSelect';
import Controls from './Controls';

const Container = styled.div`
    max-width: 960px;
    margin: 0 auto;
    position: relative;
`;

const Heading = styled.h2`
    font-size: 2em;
    color: white;
`;

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
    const [ root, setRoot ] = React.useState( 'E' );
    const [ scaleType, setScaleType ] = React.useState( 'chromatic' );
    const labels = getItemsInScale( root, scaleType );

    return (
        <Container>
            <Heading>Scale Demo</Heading>
            <Controls>
                <RootSelect 
                    root={ root } 
                    setRoot={ setRoot } 
                />
                <ScaleSelect 
                    scaleType={ scaleType } 
                    setScaleType={ setScaleType } 
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
