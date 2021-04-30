import { Link } from 'react-router-dom';
import * as React from 'react';
import Routes, { RoutesNames } from '../../pages/routes';


import s from './NavBar.module.scss';

interface IProps {
  name: string;
}

const NavBar: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.grid}>
        <nav className={s.appbar}>
          <Link className={s.appbarLink} to={Routes.ROOT}>
            {RoutesNames.ROOT}
          </Link>
          <Link className={s.appbarLink} to={Routes.SEARCH}>
            {RoutesNames.SEARCH}
          </Link>
          <Link className={s.appbarLink} to={Routes.LOGIN}>
            {RoutesNames.LOGIN}
          </Link>
          <Link className={s.appbarLink} to={Routes.REGISTER}>
            {RoutesNames.REGISTER}
          </Link>
          <Link className={s.appbarLink} to={Routes.STAT}>
            {RoutesNames.STAT}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
