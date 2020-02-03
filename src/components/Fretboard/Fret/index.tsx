import styled from 'styled-components';

interface FretProps {
    showNut?: boolean;
    color?: string;
}

const DEFAULT_BG_COLOR = '#888';

const Fret = styled.div<FretProps>`
    box-sizing: border-box;
    height: 32px;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${ DEFAULT_BG_COLOR };
    background: ${ props => props.color ? '#333' : DEFAULT_BG_COLOR };
    color: '#555';
    position: relative;
    color: ${ props => props.color ? props.color : '#555' };
    
    ${ props => props.showNut && (
        `&:first-of-type {
            margin-right: 8px;
        }`
    ) }
`;

export default Fret;
