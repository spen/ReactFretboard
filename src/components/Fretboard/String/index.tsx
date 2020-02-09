import * as React from 'react';
import styled from 'styled-components';
import { find, times, map } from 'lodash';
import { note, transpose, distance, interval } from '@tonaljs/tonal';
import { fromSemitones } from '@tonaljs/interval';

import Fret from '../Fret';
import simplifyNoteName from '../../../lib/simplifyNoteName';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;

interface StringProps {
    frets: number;
    letter: string; 
    octave: number;
    labels: any[];
    root: string;
    // TODO: This isn't very well defined
    renderLabel?: ( { label: any } ) => any;
}

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

const getRelativeChromaticColor = ( semitones: number ) => chromaticColors[ semitones ];

const getLabelForNote = ( note, labels ) =>
    find(
        labels,
        label => label.semitones === note.semitones
    );

const String: React.FC<StringProps> = ( { letter, octave, renderLabel, frets, root, labels } ) => (
    <FlexRow>
        { map(
            times( 
                frets, 
                ( fretIndex: number ) => note( transpose( `${ letter }${ octave }`, fromSemitones( fretIndex ) ) )
            ),
            ( transposedNote, fretIndex: number ) => {
                const semitones = interval( distance( root, transposedNote.name ) ).semitones
                const label = getLabelForNote( { semitones }, labels );
                const color = label && getRelativeChromaticColor( label.semitones );

                return (
                    <Fret
                        key={ fretIndex }
                        showNut
                        color={ color }
                    >  
                        { label && renderLabel ? 
                            renderLabel( { label } ) 
                            : simplifyNoteName( transposedNote.pc, '#' )
                        }
                    </Fret>
                );
            }
        ) }
    </FlexRow>
);
  
export default String;
