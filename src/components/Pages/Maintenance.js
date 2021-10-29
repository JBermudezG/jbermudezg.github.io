import React from 'react';
import '../../styles/Maintenance.scss';

export default function Logo(){
    return(
        <>
            <div className="maintenance">
                <p className="alertM">⚠️</p>
                <p className="alertM">Esta web se encuentra en mantenimiento</p>
            </div>
        </>
    )
}