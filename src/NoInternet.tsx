import React, { useEffect, useState } from 'react';
import { Nointernet } from './Components/EmptyState/EmptyPages';
import { DI } from './Core';

function NoInternet(_props: any) {
    const [internetConnection, setInternetConnection] = useState<boolean>(true);
    useEffect(() => {
        setInternetConnection(navigator.onLine);
    }, []);
    useEffect(() => {
        window.addEventListener('online', () => {
            setInternetConnection(true);
        });

        window.addEventListener('offline', () => {
            setInternetConnection(false);
        });
    });
    if (internetConnection) {
        return _props.children;
    } else {
        return <Nointernet />;
    }
}

export default DI(NoInternet);
