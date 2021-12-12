import React, { useState, useEffect } from 'react';
import { helpHttp } from '../../helpers/helpHttp';
import { NavLink, useParams } from 'react-router-dom';
import '../../styles/Pages/Projects.scss';

function Project({name, imageUrl}){
    let image = {
        backgroundImage: `url(${imageUrl})`,
    }
    return(
        <>
            <div className="project" style={image}>
                <div><span>{name}</span></div>
            </div>
        </>
    )
}

export default function Projects({theme}){
    let [data, setData] = useState([]);
    let { type } = useParams();
   
    let api = helpHttp();
    let url = "data/projects.json";

    useEffect(() =>{
        api.get(url).then((res) => {
            let newData = [];
            res.forEach(element => {
                let projecttype = element["access-point"].split("/")[0];
                let newElement = [element];
                if((type === projecttype) || (type === "web-dev")){
                    newData = [...newData, ...newElement];
                }
            });
            setData(newData);
        });
    // eslint-disable-next-line
    }, [type]);
    return(
        <>
            <div className={theme ? "projects dark":"projects light"}>
                <div className="selector">
                    <NavLink className="selectorLink" to="/projects/frontend">FrontEnd</NavLink>
                    <NavLink className="selectorLink" to="/projects/web-design">Diseño web</NavLink>
                    <NavLink className="selectorLink" to="/projects/frontend-php">PHP + MySQL</NavLink>
                </div>
                <div className={theme ? "projects-box dark":"projects-box light"}>
                    {data.map(element =>
                    <NavLink to={`/projects/${element["access-point"]}`} key={element["access-point"]}>
                        <Project name={element["name"]} imageUrl={element["images"][0]["imgUrl"]}/>
                    </NavLink>
                    )}
                </div>
            </div>
        </>
    )
}