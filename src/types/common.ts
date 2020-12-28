import React from 'react';
import { FormProps } from 'semantic-ui-react';

export type InputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type FormSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  data: FormProps,
) => void;
