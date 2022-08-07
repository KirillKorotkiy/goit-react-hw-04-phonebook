import React from 'react';
import { useForm } from 'react-hook-form';
import { ContainerForm, InputForm, ButtonForm } from './ContactsForm.styled';

const ContactsForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <ContainerForm>
      <form
        onSubmit={handleSubmit(data => {
          onSubmit(data);
        })}
      >
        <label htmlFor="name">
          <h3>Name</h3>
          <InputForm
            type="text"
            name="name"
            {...register('name', {
              register: true,
              minLength: 3,
              required: 'This is required',
            })}
            placeholder="Name"
          />
        </label>
        <label>
          <h3>Number</h3>
          <InputForm
            htmlFor="number"
            type="tel"
            name="number"
            {...register('number', {
              register: true,
              minLength: 6,
              required: 'This is required',
            })}
            placeholder="Number"
          />
        </label>
        <ButtonForm type="submit">Add contacts</ButtonForm>
      </form>
      </ContainerForm>
  );
};

export default ContactsForm;
