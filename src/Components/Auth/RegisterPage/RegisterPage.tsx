import React from 'react';
import { PropsI } from 'src/Core/@types';
import { DI } from '../../../Core/DependencyInjection';

const RegisterPage = (_props: PropsI) => {
    console.log(_props);
    return <div>RegisterPage</div>;
};

export default DI(RegisterPage);
