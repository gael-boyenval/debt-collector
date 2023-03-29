import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Text } from 'ink';
import { getMostModifiedFiles } from '../../lib/git/gitUtils';

function OftenChanged() {
  const [mostModifiedFiles, setMostModifiedFiles] = useState(null)

  useEffect(() => {
    const setMost = async () => {
      const files = await getMostModifiedFiles()
      setMostModifiedFiles(files)
    }

    setMost()
  }, [])
  
  return (
    <Text>Hello</Text>
  )
}

export default OftenChanged;
