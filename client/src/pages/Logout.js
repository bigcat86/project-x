import React from 'react';
import Auth from '../utils/auth';

export default function Logout() {
    Auth.logout();
    return(
        <div>
            <h1>You are logged out.</h1>
        </div>
    )
}