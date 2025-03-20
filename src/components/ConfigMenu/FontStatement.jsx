import React from 'react';
import { InlineAlert } from 'evergreen-ui';
import PropTypes from 'prop-types';
import { FONTS_INFO } from '../../constants/appConstants';

const FontStatement = ({ fontName }) => (
  <InlineAlert intent="none" marginBottom={-10} marginTop={10}>
    {FONTS_INFO[fontName] && <>Font: {FONTS_INFO[fontName].name}</>}
  </InlineAlert>
);

FontStatement.propTypes = {
  fontName: PropTypes.string.isRequired,
};

export default FontStatement;
