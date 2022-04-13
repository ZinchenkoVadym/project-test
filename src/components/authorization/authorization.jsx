import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {CircularProgress, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './../../App.scss'
import './authorization.scss'
import MyButton from '../UI/myButton';
import apiRequests from '../../api/apiRequests';
import SuccessImage from '../svg-componets/successImage';


const Authorization = (props) => {

    let [positions, setPositions] = useState([]);
    let [registerSuccess, setRegisterSuccess] = useState(false);
    let [loaderRegister, setLoaderRegister] = useState(false);
    let [error, setError] = useState('');

    const {control, register, formState: {errors, isValid}, handleSubmit} = useForm({
        mode: "all",
        defaultValues: {
            position_id: 1,
        }
    });

    useEffect(() => {
        apiRequests.getPositions()
            .then(data => setPositions(data.positions));
    }, []);


    const fromData = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('position_id', data.position_id);
        formData.append('email', data.email);
        formData.append('photo', data.photo[0]);
        return formData;
    }


    const setUser = async (data) => {

        let formData = fromData(data);
        setLoaderRegister(true);
        props.setUserOpen(false);

        try {
            const responseToken = await apiRequests.getToken();
            if (!responseToken.success) return
            let token = responseToken.token;
            const user = await apiRequests.setUser(formData, token);
            if (!user.success) {
                setError(user.message);
                setLoaderRegister(false);
                props.setLoader(false);
                return
            }
            setLoaderRegister(false);
            props.setLoader(true);
            const users = await apiRequests.getUsers(1);
            if (!users.success) {
                setError(users.message);
                setLoaderRegister(false);
                props.setLoader(false);
                return
            }
            props.setUsers(users.users);
            props.setPageNum((1));
            props.setLoader(false);
            setRegisterSuccess(true);
        } catch (e) {
            setError('Something went wrong');
            setLoaderRegister(false);
            props.setLoader(false);
        }
    }

    return (
        <section id='register' className='authorization__section'>
            <div className='authorization__container container'>
                {registerSuccess
                    ? <div className='success__register'>
                        <h1 className='title'>User successfully registered</h1>
                        <SuccessImage/>
                    </div>
                    : <>
                        <h1 className='authorization__title title'>Working with POST request</h1>
                        <form onSubmit={handleSubmit(setUser)} className='authorization__form'>
                            <Box sx={{height: '104px'}}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{
                                        required: 'The string must not be empty',
                                        minLength: {
                                            value: 2,
                                            message: 'MinLength 2 elements'
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'MaxLength 60 elements'
                                        }
                                    }}
                                    render={({field: {value, onChange}}) => (
                                        <TextField
                                            error={errors?.name}
                                            fullWidth={true}
                                            value={value}
                                            onChange={onChange}
                                            placeholder='Your name'
                                            label="Name"
                                            helperText={errors?.name && errors?.name?.message}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{height: '104px'}}>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{
                                        required: 'The string must not be empty',
                                        minLength: {
                                            value: 2,
                                            message: 'MinLength 2 elements'
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'MaxLength 100 elements'
                                        },
                                        pattern: {
                                            value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                                            message: 'Not valid email'
                                        }
                                    }}
                                    render={({field: {value, onChange}}) => (
                                        <TextField
                                            error={errors?.email}
                                            fullWidth={true}
                                            value={value}
                                            onChange={onChange}
                                            placeholder='Your email'
                                            label='Email'
                                            helperText={errors?.email && errors?.email?.message}
                                        />
                                    )}

                                />
                            </Box>
                            <Box sx={{height: '104px', position: 'relative'}}>
                                <Controller
                                    name='phone'
                                    control={control}
                                    rules={{
                                        required: 'The string must not be empty',
                                        pattern: {
                                            value: /^[\+]{0,1}380([0-9]{9})$/,
                                            message: 'Not valid phone',
                                        }
                                    }}
                                    render={({field: {value, onChange}}) => (
                                        <TextField
                                            error={errors?.phone}
                                            fullWidth={true}
                                            value={value}
                                            onChange={onChange}
                                            placeholder='Your phone'
                                            label='Phone'
                                            helperText={errors?.phone && errors?.phone?.message}
                                        />
                                    )}
                                />
                                <p className='phone-number__example'>+38 (XXX) XXX - XX - XX</p>
                            </Box>
                            <Box sx={{marginBottom: '50px'}}>
                                <Controller
                                    name='position_id'
                                    control={control}
                                    render={({field: {value, onChange}}) => (
                                        <RadioGroup
                                            value={value}
                                            onChange={onChange}
                                        >
                                            {positions.map(position => (
                                                <FormControlLabel
                                                    key={position.id}
                                                    value={position.id}
                                                    label={position.name}
                                                    control={<Radio/>}
                                                />))}
                                        </RadioGroup>
                                    )}
                                />
                            </Box>
                            <Box sx={{marginBottom: '50px'}}>
                                <div className='upload__block'>
                                    <label className='upload__btn'>
                                        Upload
                                        <input
                                            {...register('photo', {
                                                required: 'Please add photo'
                                            })}
                                            className='upload__input'
                                            type='file'
                                            name='photo'
                                            accept=".jpg, .jpeg"
                                        />
                                    </label>
                                    <div className='upload-file__name'>
                                        <div>Upload file</div>
                                    </div>
                                </div>
                            </Box>
                            <div className='error'>{error}</div>
                            <Box sx={{marginBottom: '100px'}}>

                                <div className='show-btn__container'>
                                    <MyButton disabled={!isValid} type='submit'>Submit</MyButton>
                                    <span className='loader'>
                                {loaderRegister ? <CircularProgress sx={{width: '10px', height: '10px'}}/> : ''}
                            </span>
                                </div>
                            </Box>
                        </form>
                    </>
                }
            </div>
        </section>
    );
};

export default Authorization;