import React from 'react';
import './home.scss';
import './../../App.scss';
import MyButton from '../UI/myButton';

const Home = () => {
    return (
        <section className='home__section'>
            <div className='container'>
                <div className='body__home'>
                    <h1 className='home__title title'>Test assignment for front-end developer</h1>
                    <p className='home__text'>What defines a good front-end developer is one that has skilled knowledge
                        of HTML, CSS, JS with a
                        vast understanding of User design thinking as they'll be building web interfaces with
                        accessibility
                        in mind. They should also be excited to learn, as the world of Front-End Development keeps
                        evolving.
                    </p>
                    <MyButton><a href='#register'>Sing up</a></MyButton>
                </div>
            </div>
        </section>
    );
};

export default Home;