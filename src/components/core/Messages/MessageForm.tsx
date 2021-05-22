/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FileModal, ProgressBar } from 'components';
import { Segment, Button, Input } from 'semantic-ui-react';
import { sendMessage, sendFileInstance } from 'utility';

import {
  InputChangeEvent,
  Message,
  RootReducer,
  ChannelState,
  AuthState,
  UploadTask,
} from 'types';

const MessageForm: React.FC = () => {
  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );

  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);
  const [message, setMessage] = useState('');
  const [fileUploadPerc, setFileUploadPerc] = useState(0);
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);

  const changeHandler: InputChangeEvent = (e) => {
    const { value } = e.target;
    setMessage(value);
    if (error) setError(true);
  };

  const createMessage: (filePath?: string) => Promise<void> = async (
    filePath = '',
  ) => {
    if (activeChannel?.id && userData && (message || filePath)) {
      setLoading(true);
      const messageInstance: Message = {
        user: {
          avatar: userData.photoURL as string,
          uid: userData.uid,
          name: userData.displayName as string,
        },
      };
      if (filePath !== '') {
        messageInstance['image'] = filePath;
      } else {
        messageInstance['content'] = message;
      }
      const success = await sendMessage(messageInstance, activeChannel.id);
      if (success) {
        setMessage('');
      } else {
        setError(true);
      }
      setLoading(false);
    }
  };

  const sendFileInfo = async (downloadUrl: string) => {
    setMessage(downloadUrl);
    setLoading(true);
    const status = await sendFileInstance(
      activeChannel?.id as string,
      createMessage,
      downloadUrl,
    );
    setMessage('');
    setLoading(false);
    setUploadTask(null);
    if (!status) {
      setError(true);
    }
  };

  useEffect(() => {
    if (uploadTask && fileUploadPerc === 100) {
      setFileUploadStatus(false);
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadUrl) => {
          sendFileInfo(downloadUrl);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setUploadTask(null);
        });
      setFileUploadPerc(0);
    }
  }, [uploadTask, fileUploadPerc]);

  useEffect(() => {
    if (uploadTask) {
      setFileUploadStatus(true);
      uploadTask.on(
        'state_changed',
        (snap) => {
          const percentUploaded = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100,
          );
          setFileUploadPerc(percentUploaded);
        },
        (err) => {
          console.error(err);
          setError(true);
          setUploadTask(null);
        },
      );
    }
  }, [uploadTask]);

  return (
    <Segment className='message__form'>
      <Input
        fluid
        name='message'
        onChange={changeHandler}
        value={message}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'} />}
        labelPosition='left'
        className={error ? 'error' : ''}
        placeholder='Write your message'
      />
      <Button.Group icon widths='2'>
        <Button
          onClick={() => createMessage()}
          disabled={loading}
          color='orange'
          content='Add Reply'
          labelPosition='left'
          icon='edit'
        />
        <Button
          color='teal'
          disabled={fileUploadStatus}
          content='Upload Media'
          labelPosition='right'
          icon='cloud upload'
          onClick={() => {
            setModal(true);
          }}
        />
      </Button.Group>
      <FileModal
        show={modal}
        onClose={() => {
          setModal(false);
        }}
        uploadTask={setUploadTask}
      />
      <ProgressBar
        uploadState={fileUploadStatus}
        percentUploaded={fileUploadPerc}
      />
    </Segment>
  );
};
export default MessageForm;
