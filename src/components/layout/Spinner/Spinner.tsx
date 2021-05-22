import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

interface SprinnerProps {
  displayText: string;
}

const Spinner: React.FC<SprinnerProps> = ({ displayText }) => {
  return (
    <Dimmer active>
      <Loader size='huge' content={displayText} />
    </Dimmer>
  );
};
export default Spinner;
