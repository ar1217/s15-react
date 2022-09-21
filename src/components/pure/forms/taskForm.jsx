// import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom'
import { LEVELS } from '../../../models/levels.enum';
import { Tarea } from '../../../models/tarea.class';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TareaSchema = Yup.object().shape(
    {
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required')
    }
);

const Taskform = ({ add, length }) => {


    const camposIniciales = {
        name: '',
        description: '',
        state: false,
        level: LEVELS.NORMAL
    }


    return (
        <div>

            <Formik
                initialValues={camposIniciales}
                validationSchema={TareaSchema}
                onSubmit={
                    async (values) => {
                        const newTask = new Tarea(
                            values.name,
                            values.description,
                            values.state,
                            values.level
                        );
                        add(newTask);
                    }
                }>


                {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                }) => (

                    <Form>
                        <div className='row'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h6>Taks Formik</h6>
                                </div>
                                <div className='card-body'>
                                    {
                                        errors.name && touched.name && (
                                            <ErrorMessage name='name' className='text-danger' component={'div'}></ErrorMessage>
                                        )
                                    }
                                    <label>Task Name</label>
                                    <Field id="name" name="name" type="text" placeholder="Task name" className="form-control form-control-sm" />

                                    {
                                        errors.description && touched.name && (
                                            <ErrorMessage name='description' className='text-danger' component={'div'}></ErrorMessage>
                                        )
                                    }
                                    <label>Task Description</label>
                                    <Field id="description" name="description" type="text" placeholder="Task description" className="form-control form-control-sm" />

                                    <label>Task State</label>
                                    <Field as="select" name='state' id='state' className="form-control form-control-sm">
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Field>

                                    <label>Task Level</label>
                                    <Field as="select" name="level" id="level" className="form-control form-control-sm">
                                        <option value={LEVELS.NORMAL}>NORMAL</option>
                                        <option value={LEVELS.URGENT}>URGENT</option>
                                        <option value={LEVELS.BLOCKING}>BLOCKING</option>
                                    </Field>
                                    <button type='submit' className='btn btn-success mt-2'><i className='bi bi-plus-circle-dotted'></i>Create task</button>
                                    {isSubmitting ? (<p>Login your credentials...</p>) : null}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
}

Taskform.protoTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}

export default Taskform;
