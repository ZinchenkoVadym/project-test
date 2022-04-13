import React from 'react';
import './header.scss';
import './../../App.scss';
import MyButton from '../UI/myButton';
import TitleImage from '../svg-componets/titleImage';

const Header = () => {
    return (
        <section className='header'>
            <div className='header__container container'>
                <div className='header__logo'>
                    <TitleImage/>
                </div>
                <div className='header__buttons'>
                    <MyButton><a href='#users'>Users</a></MyButton>
                    <MyButton><a href='#register'>Sing in</a></MyButton>
                </div>
            </div>
        </section>
    );
};

export default Header;