import React from 'react';
import firebase from 'firebase';
import { FormProps } from 'semantic-ui-react';

export type InputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type FormSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  data: FormProps,
) => void;

export type ClickEvent =
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;

export type ChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type UploadTask = firebase.storage.UploadTask;

export type StringToVoidFunc = (str: string) => void;
