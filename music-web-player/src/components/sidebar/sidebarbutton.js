import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import './sidebarbutton.css';
import { IconContext } from 'react-icons';

export default function SidebarButton(props) {

    const uselocation=useLocation();
    const isactive=uselocation.pathname===props.to;
    const btnClass=isactive ? "btn-body active":"btn-body";
    return (
    <Link to={props.to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "24px", className: 'btn-icon' }}>
          {props.icon}
          <p className='btn-title'>{props.title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}
