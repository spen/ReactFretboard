import * as React from 'react';
import styled from 'styled-components';

import OptionButton from './OptionButton';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

interface Option {
    label: string;
    value: string;
}

interface OptionSelectProps {
    onSelectOption: ( value: string ) => void;
    options: Option[];
    selectedOption: any;
}

const OptionSelect: React.FC<OptionSelectProps> = ( { options, selectedOption, onSelectOption } ) => (
    <Container>
        { 
            options.map(
                ( { label, value } ) => (
                    <OptionButton 
                        isSelected={ value === selectedOption } 
                        onClick={ () => onSelectOption( value ) }
                        key={ `${ label }-${ value }` }
                    >
                        { label }
                    </OptionButton>
                )
            )
        }
    </Container>
);

export default OptionSelect;
