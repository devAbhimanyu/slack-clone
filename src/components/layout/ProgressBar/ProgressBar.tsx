import React from 'react';
import { Progress } from 'semantic-ui-react';

interface ProgressBarProps {
  uploadState: boolean;
  percentUploaded: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  uploadState,
  percentUploaded,
}) =>
  uploadState ? (
    <Progress
      className='progress__bar'
      percent={percentUploaded}
      progress
      indicating
      size='medium'
      inverted
    />
  ) : null;

export default ProgressBar;
