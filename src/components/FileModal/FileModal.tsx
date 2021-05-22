import React, { useState } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import { validateFileType, uploadFile } from 'utility';
import { ChangeEvent, UploadTask } from 'types';
interface FileModalProps {
  show: boolean;
  onClose: () => void;
  uploadTask: React.Dispatch<React.SetStateAction<UploadTask | null>>;
}

const FileModal: React.FC<FileModalProps> = ({ show, onClose, uploadTask }) => {
  const [file, setFile] = useState<File | null>(null);

  const addFile: ChangeEvent = (event) => {
    const targetFile = event.target.files?.[0];
    if (targetFile) {
      setFile(targetFile);
    }
    console.log(targetFile);
  };

  const sendFile = () => {
    if (file && validateFileType(file.name)) {
      const sRef = uploadFile(file);
      uploadTask(sRef);
      // uploadFile(file, metadata);
      setFile(null);
      onClose();
    }
  };
  return (
    <Modal basic open={show} onClose={onClose}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label='File types: jpg, png'
          name='file'
          type='file'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={sendFile} color='green' inverted>
          <Icon name='checkmark' /> Send
        </Button>
        <Button color='red' inverted onClick={onClose}>
          <Icon name='remove' /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
