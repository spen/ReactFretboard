import * as React from 'react';
import styled from 'styled-components';
import { includes } from 'lodash';
import * as Tonal from '@tonaljs/tonal';
import { simplify } from '@tonaljs/interval';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background: #aaa;
`;

const Note = styled.div`
    height: 32px;
    padding: 0 8px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    background: #333;
    color: ${ props => props.color };
`;

interface FlexColumnProps {
    isActive?: boolean;
}

const FlexColumn = styled.div<FlexColumnProps>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    opacity: ${ props => props.isActive ? 1 : 0.5 };
`;

// For now, I don't mind the repeatition. 
// I doubt this will be the final way of handling the interval colors.
const chromaticColors = [
    '#FF6B6B',
    '#FF8E72',
    '#FFAF87',
    '#FFAB5E',
    '#FFE66D',
    '#DCF799',
    '#ABE188',
    '#67E5D2',
    '#67C5E5',
    '#678FE5',
    '#8267E5',
    '#EE92C2',
];

const intervals = [ 
    '1P',
    '2m',
    '2M',
    '3m',
    '3M',
    '4P',
    '5d',
    '5P',
    '6m',
    '6M',
    '7m',
    '7M',
]

const getRelativeChromaticColor = ( semitones: number ) => chromaticColors[ semitones ];

interface IntervalStripProps {
    root: string;
    activeIntervals?: string[];
}

const ChordInformation: React.FC<IntervalStripProps> = ( { root, activeIntervals } ) => {
    const activeSemitones = activeIntervals.map( interval => Tonal.interval( interval ).semitones )

    return (
        <Container>
            {
                intervals.map( 
                    interval => { 
                        const semitones = Tonal.interval( interval ).semitones;
                        const color = getRelativeChromaticColor( semitones % 12 );

                        const note = Tonal.transpose( root, interval ); 

                        const isActive = includes( activeSemitones, semitones );

                        const intervalLabel = interval.replace( '1P', 'Root' )

                        return (
                            <FlexColumn isActive={ isActive }>
                                <Note color={ color }>{ note }</Note>
                                <Note color={ color }>{ intervalLabel }</Note>
                            </FlexColumn>
                        );
                    }
                )
            }
        </Container>
    );
}
export default ChordInformation;
