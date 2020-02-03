import * as React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash';

import OptionButton from '../../components/OptionButton';
import scaleOptions from './scaleOptions';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const scaleTypeSelectOptions = scaleOptions.map(
    item => ( { label: startCase( item ), value: item } )
);

interface ScaleSelectProps {
    setScaleType: ( value: string ) => void;
    scaleType: string;
    isSelected?: boolean;
}

const ScaleSelect: React.FC<ScaleSelectProps> = ( { scaleType, setScaleType } ) => (
    <Container>
        { 
            scaleTypeSelectOptions.map(
                ( { label, value } ) => (
                    <OptionButton 
                        isSelected={ value === scaleType } 
                        onClick={ () => setScaleType( value ) }
                        key={ label }
                    >
                        { label }
                    </OptionButton>
                )
            ) 
        }
    </Container>
);

export default ScaleSelect;
