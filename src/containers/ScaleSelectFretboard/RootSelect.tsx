import * as React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

import OptionButton from '../../components/OptionButton';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

interface RootSelectProps {
    setRoot: ( value: string ) => void;
    root: string; // TODO: Stricter typing with string literal options
}

const chromaticNotes = [ 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#' ]

const RootSelect: React.FC<RootSelectProps> = ( { root, setRoot } ) => (
    <Container>
        { chromaticNotes.map(
            ( note: string ) => (
                <OptionButton 
                    isSelected={ note === root } 
                    onClick={ () => setRoot( note ) }
                    key={ note }
                >
                    { note }
                </OptionButton>
            )
        ) }
    </Container>
);

export default RootSelect;
